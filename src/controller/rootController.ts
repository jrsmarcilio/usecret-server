import { Request, Response } from "express";
import { validationResult } from "express-validator";
import CODE from "http-status-enum";
import { RootService } from "../services/rootService";

export class RootController extends RootService {
  public async indexRoot(request: Request, response: Response): Promise<Response> {
    const { email } = request.user;
    const root = await super.findByEmail(email);
    if (!root) return response.status(CODE.NOT_FOUND).json({ message: "User Root not found" });
    return response.status(CODE.OK).json(super.omitPassword(root));
  }

  public async createRoot(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) return response.status(CODE.BAD_REQUEST).json({ errors: errors.array() });
    const rootExists = await super.findByEmail(request.body.email);
    if (rootExists) return response.status(CODE.BAD_REQUEST).json({ message: "User Root already exists" });
    const root = await super.create(request.body);
    if (!root) return response.status(CODE.BAD_REQUEST).json({ message: "User Root not created" });
    const rootWithoutPassword = await super.omitPassword(root);
    return response.status(CODE.CREATED).json(rootWithoutPassword);
  }

  public async updateRoot(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) return response.status(CODE.BAD_REQUEST).json({ errors: errors.array() });
    const { id } = request.user;
    const currentRoot = await super.index(Number(id));
    if (!currentRoot) return response.status(CODE.NOT_FOUND).json({ message: "User Root not found" });
    const root = await super.update(currentRoot, request.body);
    if (!root) return response.status(CODE.BAD_REQUEST).json({ message: "User Root not updated" });
    return response.status(CODE.OK).json(super.omitPassword(root));
  }

  public async deleteRoot(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) return response.status(CODE.BAD_REQUEST).json({ errors: errors.array() });
    const { id } = request.user;
    const root = await super.index(Number(id));
    if (!root) return response.status(CODE.NOT_FOUND).json({ message: "User Root not found" });
    await super.delete(root.id);
    return response.status(CODE.OK).json({ message: "User Root deleted" });
  }
}
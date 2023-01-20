import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RootService } from "src/services/rootService";
import CODE from "http-status-enum";

export class RootController extends RootService {
  public async indexRoot(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) return response.status(CODE.BAD_REQUEST).json({ errors: errors.array() });
    const { id } = request.params;
    const root = await this.index(Number(id));
    if (!root) return response.status(CODE.NOT_FOUND).json({ message: "User Root not found" });
    return response.status(CODE.OK).json(root);
  }

  public async createRoot(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) return response.status(CODE.BAD_REQUEST).json({ errors: errors.array() });
    const root = await this.create(request.body);
    if (!root) return response.status(CODE.BAD_REQUEST).json({ message: "User Root not created" });
    return response.status(CODE.CREATED).json(root);
  }

  public async updateRoot(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) return response.status(CODE.BAD_REQUEST).json({ errors: errors.array() });
    const { id } = request.params;
    const currentRoot = await super.index(Number(id));
    if (!currentRoot) return response.status(CODE.NOT_FOUND).json({ message: "User Root not found" });
    const root = await super.update(currentRoot, request.body);
    if (!root) return response.status(CODE.BAD_REQUEST).json({ message: "User Root not updated" });
    return response.status(CODE.OK).json(root);
  }

  public async deleteRoot(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) return response.status(CODE.BAD_REQUEST).json({ errors: errors.array() });
    const { id } = request.params;
    const root = await super.index(Number(id));
    if (!root) return response.status(CODE.NOT_FOUND).json({ message: "User Root not found" });
    await super.delete(root.id);
    return response.status(CODE.OK).json({ message: "User Root deleted" });
  }
}
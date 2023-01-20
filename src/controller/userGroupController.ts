import { Request, Response } from 'express';
import { UserGroupService } from '../services/userGroupService';
import CODE from 'http-status-enum';
import { validationResult } from 'express-validator';

export default class UserGroupController extends UserGroupService {
  async indexUserGroup(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) return response.status(CODE.BAD_REQUEST).json({ errors: errors.array() });
    const { id } = request.params;
    const currentUserGroup = await super.index(Number(id), request.user.id);
    if (!currentUserGroup) return response.status(CODE.NOT_FOUND).json({ message: 'UserGroup not found' });
    return response.status(CODE.OK).json({ data: currentUserGroup });
  }

  async createUserGroup(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) return response.status(CODE.BAD_REQUEST).json({ errors: errors.array() });
    const nameExists = await super.findByName(request.body.name, request.user.id);
    if (nameExists) return response.status(CODE.UNAUTHORIZED).json({ error: 'UserGroup name already exists' });
    const userGroup = await super.create({ ...request.body, rootId: request.user.id });
    if (!userGroup) return response.status(CODE.FORBIDDEN).json({ error: 'UserGroup not created' });
    return response.status(CODE.CREATED).json({ data: userGroup });
  }

  async updateUserGroup(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) return response.status(CODE.BAD_REQUEST).json({ errors: errors.array() });
    const { id } = request.params;
    const currentUserGroup = await super.index(Number(id), request.user.id);
    if (!currentUserGroup) return response.status(CODE.NOT_FOUND).json({ message: 'UserGroup not found' });
    const userGroup = await super.update(currentUserGroup, request.body);
    if (!userGroup) return response.status(CODE.CONFLICT).json({ error: 'UserGroup not updated' });
    return response.status(CODE.OK).json({ data: userGroup });
  }

  async deleteUserGroup(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) return response.status(CODE.BAD_REQUEST).json({ errors: errors.array() });
    const { id } = request.params;
    const currentUserGroup = await super.index(Number(id));
    if (!currentUserGroup) return response.status(CODE.NOT_FOUND).json({ message: 'UserGroup not found' });
    await super.delete(currentUserGroup.id);
    return response.status(CODE.OK).json({ message: 'UserGroup deleted' });
  }

  async listUserGroups(request: Request, response: Response): Promise<Response> {
    if (!request.user.email) return response.status(CODE.UNAUTHORIZED).json({ error: 'Unauthorized' });
    const userGroups = await super.list(request.user.id);
    return response.status(CODE.OK).json(userGroups);
  }
}
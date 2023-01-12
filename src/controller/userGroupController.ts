import { Request, Response } from 'express';
import { UserGroupService } from '../services/userGroupService';
import CODE from 'http-status-enum';

export default class UserGroupController extends UserGroupService {
  async createUserGroup(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    if (!name || !description) return response.status(CODE.BAD_REQUEST).json({ message: 'Missing required fields' });
    const nameExists = await super.findByName(name);
    if (nameExists) return response.status(CODE.UNAUTHORIZED).json({ error: 'UserGroup name already exists' });
    const userGroup = await super.create(request.body);
    if (!userGroup) return response.status(CODE.FORBIDDEN).json({ error: 'UserGroup not created' });
    return response.status(CODE.CREATED).json({ data: userGroup });
  }

  async updateUserGroup(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    if (!id) return response.status(CODE.BAD_REQUEST).json({ message: 'Missing required fields' });
    const currentUserGroup = await super.index(Number(id));
    if (!currentUserGroup) return response.status(CODE.NOT_FOUND).json({ message: 'UserGroup not found' });
    const userGroup = await super.update(currentUserGroup, request.body);
    if (!userGroup) return response.status(CODE.CONFLICT).json({ error: 'UserGroup not updated' });
    return response.status(CODE.OK).json({ data: userGroup });
  }

  async deleteUserGroup(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    if (!id) return response.status(CODE.BAD_REQUEST).json({ message: 'Missing required fields' });
    const currentUserGroup = await super.index(Number(id));
    if (!currentUserGroup) return response.status(CODE.NOT_FOUND).json({ message: 'UserGroup not found' });
    await super.delete(currentUserGroup.id);
    return response.status(CODE.OK).json({ message: 'UserGroup deleted' });
  }

  async getUserGroupById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    if (!id) return response.status(CODE.BAD_REQUEST).json({ message: 'Missing required fields' });
    const currentUserGroup = await super.index(Number(id));
    if (!currentUserGroup) return response.status(CODE.BAD_REQUEST).json({ message: 'UserGroup not found' });
    return response.status(CODE.OK).json({ data: currentUserGroup });
  }

  async listUserGroups(request: Request, response: Response): Promise<Response> {
    const userGroups = await super.list();
    return response.status(CODE.OK).json(userGroups);
  }
}
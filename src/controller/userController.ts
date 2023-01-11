import { Request, Response } from 'express';
import { UserRepository } from '../repository/UserRepository';
import { AuthRepository } from '../repository/AuthRepository';
import CODE from 'http-status-enum';

export default class UserController extends UserRepository {
  async getUserById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    if (!id) return response.status(CODE.BAD_REQUEST).json({ message: 'Missing required fields' });
    const user = await super.index(Number(id));
    if (!user) return response.status(CODE.NOT_FOUND).json({ message: 'User not found' });
    return response.status(CODE.OK).json(user);
  }

  async createUser(request: Request, response: Response): Promise<Response> {
    const { email, password, username, avatar, fullname, profileId, userGroupId } = request.body;
    if (!email || !password || !username || !avatar || !fullname || !profileId || !userGroupId) {
      return response.status(CODE.BAD_REQUEST).json({ message: 'Missing required fields' });
    }
    const usernameExists = await super.findByUsername(username);
    if (usernameExists) return response.status(CODE.UNAUTHORIZED).json({ message: 'Username already exists' });
    const user = await super.create(request.body);
    const token = await new AuthRepository().signAccessToken(user);
    if (!user) return response.status(CODE.FORBIDDEN).json({ message: 'User not created' });
    return response.status(CODE.CREATED).json({ token, message: 'User created' });
  }

  async updateUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    if (!id) return response.status(CODE.BAD_REQUEST).json({ message: 'Missing required fields' });
    const currentUser = await super.index(Number(id));
    if (!currentUser) return response.status(CODE.NOT_FOUND).json({ message: 'User not found' });
    const userUpdated = await super.update(currentUser, request.body);
    if (!userUpdated) return response.status(CODE.CONFLICT).json({ message: 'User not updated' });
    return response.status(CODE.OK).json({ data: userUpdated, message: 'User updated' });
  }

  async deleteUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    if (!id) return response.status(CODE.BAD_REQUEST).json({ message: 'Missing required fields' });
    const user = await super.index(Number(id));
    if (!user) return response.status(CODE.NOT_FOUND).json({ message: 'User not found' });
    await super.delete(Number(id));
    return response.status(CODE.OK).json({ message: 'User deleted' });
  }

  async listUsers(request: Request, response: Response): Promise<Response> {
    const Users = await super.list();
    return response.status(CODE.OK).json({ data: Users });
  }

  async getUserByUsername(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    if (!username) return response.status(CODE.BAD_REQUEST).json({ message: 'Missing required fields' });
    const user = await super.findByUsername(username);
    if (!user) return response.status(CODE.NOT_FOUND).json({ message: `${username} not found` });
    return response.status(CODE.OK).json({ data: user });
  }

  async login(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;
    if (!username || !password) return response.status(CODE.BAD_REQUEST).json({ message: 'Missing required fields' });
    const data = await new AuthRepository().login(request.body);
    if (data.error) return response.status(CODE.UNAUTHORIZED).json({ message: data.message });
    return response.status(CODE.OK).json(data);
  }
}
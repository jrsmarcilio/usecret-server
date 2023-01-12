import { Request, Response } from 'express';
import { ProfileService } from '../services/profileService';
import CODE from 'http-status-enum';

export default class ProfileController extends ProfileService {
  async createProfile(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    if (!name || !description) return response.status(CODE.BAD_REQUEST).json({ message: 'Missing required fields' });
    const nameExists = await super.findByName(name);
    if (nameExists) return response.status(CODE.UNAUTHORIZED).json({ error: 'Profile name already exists' });
    const profile = await super.create(request.body);
    if (!profile) return response.status(CODE.FORBIDDEN).json({ error: 'Profile not created' });
    return response.status(CODE.CREATED).json({ data: profile });
  }

  async updateProfile(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    if (!id) return response.status(CODE.BAD_REQUEST).json({ message: 'Missing required fields' });
    const currentProfile = await super.index(Number(id));
    if (!currentProfile) return response.status(CODE.NOT_FOUND).json({ message: 'Profile not found' });
    const profile = await super.update(currentProfile, request.body);
    if (!profile) return response.status(CODE.CONFLICT).json({ error: 'Profile not updated' });
    return response.status(CODE.OK).json({ data: profile });
  }

  async deleteProfile(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    if (!id) return response.status(CODE.BAD_REQUEST).json({ message: 'Missing required fields' });
    const currentProfile = await super.index(Number(id));
    if (!currentProfile) return response.status(CODE.NOT_FOUND).json({ message: 'Profile not found' });
    await super.delete(currentProfile.id);
    return response.status(CODE.OK).json({ message: 'Profile deleted' });
  }

  async getProfileById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    if (!id) return response.status(CODE.BAD_REQUEST).json({ message: 'Missing required fields' });
    const currentProfile = await super.index(Number(id));
    if (!currentProfile) return response.status(CODE.NOT_FOUND).json({ message: 'Profile not found' });
    return response.status(CODE.OK).json({ data: currentProfile });
  }

  async listProfiles(request: Request, response: Response): Promise<Response> {
    const profiles = await super.list();
    return response.status(CODE.OK).json(profiles);
  }
}
import { Profile } from '@prisma/client';
import prisma from '../prisma/prismaClient'
import { CrudInterface } from '../interface/CrudInterface';

export class ProfileRepository implements CrudInterface<Profile> {
  async index(id: number): Promise<Profile | null> {
    return await prisma.profile.findUnique({ where: { id } });
  }

  async create(data: Profile): Promise<Profile> {
    return await prisma.profile.create({ data });
  }

  async update(currentProfile: Profile, data: Profile): Promise<Profile> {
    return await prisma.profile.update({
      where: {
        id: currentProfile.id
      },
      data: {
        name: data.name || currentProfile.name,
        description: data.description || currentProfile.description,
      }
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.profile.delete({ where: { id } });
  }

  async findByName(name: string): Promise<Profile | null> {
    return await prisma.profile.findFirst({ where: { name } });
  }

  async list(): Promise<Profile[]> {
    return await prisma.profile.findMany();
  }
}
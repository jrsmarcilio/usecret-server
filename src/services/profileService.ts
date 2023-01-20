import { Profile } from '@prisma/client';
import prisma from '../prisma/prismaClient'
import { CrudInterface } from '../interface/CrudInterface';

export class ProfileService implements CrudInterface<Profile> {
  async index(id: number, rootId?: number): Promise<Profile | null> {
    return await prisma.profile.findFirst({ where: { id, rootId } });
  }

  async create(data: Profile): Promise<Profile> {
    return await prisma.profile.create({ data });
  }

  async update(currentProfile: Profile, data: Profile): Promise<Profile> {
    return await prisma.profile.update({ where: { id: currentProfile.id }, data: data });
  }

  async delete(id: number): Promise<void> {
    await prisma.profile.delete({ where: { id } });
  }

  async findByName(name: string, id: number): Promise<Profile | null> {
    return await prisma.profile.findFirst({ where: { name, rootId: id } });
  }

  async list(rootId: number): Promise<Profile[]> {
    return await prisma.profile.findMany({ where: { rootId } });
  }
}
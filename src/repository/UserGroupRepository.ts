import { User, UserGroup } from '@prisma/client';
import prisma from '../prisma/prismaClient'
import { CrudInterface } from '../interface/CrudInterface';

export class UserGroupRepository implements CrudInterface<UserGroup> {
  async index(id: number): Promise<UserGroup | null> {
    return await prisma.userGroup.findUnique({ where: { id } });
  }

  async create(data: UserGroup): Promise<UserGroup> {
    return await prisma.userGroup.create({ data });
  }

  async update(currentUserGroup: UserGroup, data: UserGroup): Promise<UserGroup> {
    return await prisma.userGroup.update({
      where: {
        id: currentUserGroup.id
      },
      data: {
        name: data.name || currentUserGroup.name,
        description: data.description || currentUserGroup.description,
      }
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.userGroup.delete({ where: { id } });
  }

  async findByName(name: string): Promise<UserGroup | null> {
    return await prisma.userGroup.findFirst({ where: { name } });
  }

  async list(): Promise<UserGroup[]> {
    return await prisma.userGroup.findMany();
  }
}


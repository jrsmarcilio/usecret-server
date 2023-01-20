import { UserGroup } from '@prisma/client';
import { CrudInterface } from '../interface/CrudInterface';
import prisma from '../prisma/prismaClient';

export class UserGroupService implements CrudInterface<UserGroup> {
  async index(id: number, rootId?: number): Promise<UserGroup | null> {
    return await prisma.userGroup.findFirst({ where: { id, rootId } });
  }

  async create(data: UserGroup): Promise<UserGroup> {
    return await prisma.userGroup.create({ data });
  }

  async update(currentUserGroup: UserGroup, data: UserGroup): Promise<UserGroup> {
    return await prisma.userGroup.update({ where: { id: currentUserGroup.id }, data });
  }

  async delete(id: number): Promise<void> {
    await prisma.userGroup.delete({ where: { id } });
  }

  async findByName(name: string, rootId: number): Promise<UserGroup | null> {
    return await prisma.userGroup.findFirst({ where: { name, rootId } });
  }

  async list(rootId: number): Promise<UserGroup[]> {
    return await prisma.userGroup.findMany({ where: { rootId } });
  }
}


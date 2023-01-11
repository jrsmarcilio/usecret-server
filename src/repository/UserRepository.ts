import { Profile, User, UserGroup } from '@prisma/client';
import bcrypt from 'bcrypt';

import { CrudInterface } from '../interface/CrudInterface';
import prisma from '../prisma/prismaClient';

export class UserRepository implements CrudInterface<User> {
  public async index(id: number): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  public async create(data: User): Promise<User> {
    data.password = bcrypt.hashSync(data.password, 8);
    await prisma.user.create({ data });
    return data;
  }

  public async update(currentUser: User, data: User): Promise<User> {
    return await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        email: data.email || currentUser.email,
        username: data.username || currentUser.username,
        avatar: data.avatar || currentUser.avatar,
        fullname: data.fullname || currentUser.fullname,
        profileId: data.profileId || currentUser.profileId,
        userGroupId: data.userGroupId || currentUser.userGroupId
      }
    });
  }

  public async delete(id: number): Promise<void> {
    await prisma.user.delete({ where: { id: Number(id) } });
  }

  public async list(): Promise<User[]> {
    return await prisma.user.findMany();;
  }

  public async findByUsername(username: string): Promise<(User & { userGroup: UserGroup; profiles: Profile | null; }) | null> {
    return await prisma.user.findUnique({
      where: { username }, include: {
        profiles: true,
        userGroup: true
      }
    });
  }
}


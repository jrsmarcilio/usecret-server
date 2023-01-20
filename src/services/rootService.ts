import { Root, User } from '@prisma/client';
import bcrypt from 'bcrypt';

import { CrudInterface } from '../interface/CrudInterface';
import prisma from '../prisma/prismaClient';
import { excludeField } from '../utils/excludingPasswordField';

export class RootService implements CrudInterface<Root> {
  public async index(id: number): Promise<Root | null> {
    return await prisma.root.findUnique({ where: { id } });
  }

  public async create(data: Root): Promise<Root> {
    data.password = bcrypt.hashSync(data.password, 8);
    await prisma.root.create({ data });
    return data;
  }

  public async update(currentRoot: Root, data: Root): Promise<Root> {
    return await prisma.root.update({
      where: {
        id: currentRoot.id
      },
      data: {
        email: data.email || currentRoot.email,
        username: data.username || currentRoot.username,
        avatar: data.avatar || currentRoot.avatar,
        fullname: data.fullname || currentRoot.fullname,
        password: currentRoot.password
      }
    });
  }

  public async delete(id: number): Promise<void> {
    await prisma.root.delete({ where: { id } });
  }

  public async listUsersByRootId(rootId: number): Promise<any> {
    const users = await prisma.user.findMany({ where: { rootId } });
    const usersWithoutPassword = users.map(async (user) => excludeField<User, keyof User>(user, ['password']));
    return users;
  }

  public async findByEmail(email: string): Promise<Root | null> {
    return await prisma.root.findUnique({ where: { email } });
  }

  public omitPassword(root: Root): any {
    return excludeField<Root, keyof Root>(root, ['password']);
  }
}


import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import CODE from 'http-status-enum'
import { UserService } from './userService';
import { TLogin } from '../interface/LoginInterface';
import { User } from '@prisma/client';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'secret';

export class AuthService {
  signAccessToken(user: User) {
    return new Promise((resolve, reject) => {
      const { id, username, profileId, userGroupId } = user;
      const payload = { id, username, profileId, userGroupId };
      jwt.sign({ payload }, accessTokenSecret, {}, (err, token) => {
        if (err) reject(CODE.INTERNAL_SERVER_ERROR);
        resolve(token)
      });
    });
  }

  verifyAccessToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, accessTokenSecret, (err, payload) => {
        if (err) return reject(err.name === 'JsonWebTokenError' ? CODE.UNAUTHORIZED : err.message);
        resolve(payload)
      })
    })
  }

  public async login(login: TLogin) {
    const { username, password } = login;
    const user = await new UserService().findByUsername(username);
    if (!user) return { error: true, message: 'Email address or password not valid' };
    const checkPassword = bcrypt.compareSync(password, user.password)
    if (!checkPassword) return { error: true, message: 'Email address or password not valid' };
    const token = await this.signAccessToken(user)
    const data = {
      name: user.fullname,
      avatar: user.avatar,
      profile: user.profiles?.name,
      userGroup: user.userGroups?.name
    }
    return { data, token }
  }
}

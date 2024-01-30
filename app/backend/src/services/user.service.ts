import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUser } from '../Interfaces/user/IUser';
import { IUserModel } from '../Interfaces/user/IUserModel';
import UserModel from '../models/user.model';
import JWT from '../utils/tokenValidation';
import { IRole, IToken } from '../Interfaces/user';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwt = JWT,
  ) {}

  public async login({ email, password }: IUser): Promise<ServiceResponse<IToken>> {
    const user = await this.userModel.login(email);
    const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    if (
      !user || !bcrypt.compareSync(password, user.password)
      || password.length < 6 || !email.match(EMAIL_REGEX)
    ) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' },
      };
    }

    const payload = user.role;

    const token = this.jwt.sign({ payload });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async checkRole(authorization: string): Promise<ServiceResponse<IRole>> {
    const token = authorization.split(' ');
    const { payload } = this.jwt.verify(token[1]) as JwtPayload;

    if (!payload) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' },
      };
    }
    return { status: 'SUCCESSFUL', data: { role: payload } };
  }
}

import { IUser } from '../Interfaces/user/IUser';
import SequelizeUser from '../database/models/user.model';
import { IUserModel } from '../Interfaces/user/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async login(email : string): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });
    return dbData || null;
  }
}

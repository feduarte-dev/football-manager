import { IUser } from './IUser';

export interface IUserModel {
  login(email: string): Promise<IUser | null>
}

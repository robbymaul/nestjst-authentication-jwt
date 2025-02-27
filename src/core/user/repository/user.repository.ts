import { UserEntity } from '../../entities/user.entities';

export interface IUserRepository {
  register(user: UserEntity): Promise<UserEntity>;
  login(user: UserEntity): Promise<UserEntity>;
  getCountUsers(): Promise<number>;
}
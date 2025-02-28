import { UserEntity } from '../../entities/user.entities';
import { LoginUserRequest } from '../../../presentation/web/web.user';

export interface IUserRepository {
  register(user: UserEntity): Promise<UserEntity>;
  login(user: LoginUserRequest): Promise<UserEntity>;
  getCountUsers(): number;
}
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../core/user/repository/user.repository';
import { UserModel } from '../model/user.model'
import { UserEntity } from '../../core/entities/user.entities';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {
  }
  private users: UserModel[] = [];

  async register(user: UserEntity): Promise<UserEntity> {
    this.logger.info(`registering user ${JSON.stringify(user)}`);

    const newUser = {
      ...user,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.users.push(newUser);

    return this.mapToEntity(newUser);
  }

  async getCountUsers(): Promise<Number> {
    return this.users.length;
  }

  private mapToEntity(user: UserModel): UserEntity {
    return new UserEntity({
      id: user.id,
      username: user.username,
      password: user.password,
      name: user.name,
    })
  }
}
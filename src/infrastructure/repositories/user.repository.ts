import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../../core/user/repository/user.repository';
import { UserModel } from '../model/user.model'
import { UserEntity } from '../../core/entities/user.entities';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { undefined } from 'zod';
import { LoginUserRequest } from '../../presentation/web/web.user';
import { json } from 'express';

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

  getCountUsers(): number {
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

  async login(user: LoginUserRequest): Promise<UserEntity> {
    this.logger.info(`get user by username ${user.username}`);
    this.logger.info(`list users from data ${JSON.stringify(this.users)}`);
    const result = this.users.find(value => value.username === user.username);

    if (!result) {
      throw new NotFoundException();
    }

    return this.mapToEntity(result)
  }
}
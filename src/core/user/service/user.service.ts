import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserRequest, RegisterUserResponse } from '../../../presentation/web/web.user';
import { WebResponse } from '../../../presentation/web/web.response';
import { UserEntity } from '../../entities/user.entities';
import { IUserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject("IUserRepository") private readonly userRepository: IUserRepository,
  ) {}

  async registerUser(registerRequest: RegisterUserRequest): Promise<RegisterUserResponse> {

    const getId = this.userRepository.getCountUsers()

    const hashPassword = await bcrypt.hash(registerRequest.password, 10);

    const userEntity = new UserEntity({
      id: getId + 1,
      username: registerRequest.username,
      password: hashPassword,
      name: registerRequest.username,
    })

    const result = await this.userRepository.register(userEntity);

    return {
      id: result.id,
      username: result.username,
      name: result.name,
      password: result.password,
    }
  }
}

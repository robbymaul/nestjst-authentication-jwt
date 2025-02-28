import { Inject, Injectable } from '@nestjs/common';
import { LoginUserRequest, RegisterUserRequest, UserResponse } from '../../../presentation/web/web.user';
import { WebResponse } from '../../../presentation/web/web.response';
import { UserEntity } from '../../entities/user.entities';
import { IUserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject("IUserRepository") private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerRequest: RegisterUserRequest): Promise<UserResponse> {

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

  async loginUser(loginRequest: LoginUserRequest): Promise<UserResponse> {
    const userEntity = await this.userRepository.login(loginRequest);

    const accessToken = await this.jwtService.signAsync(
      {
        id: userEntity.id,
        username: userEntity.username,
        name: userEntity.username,
      }
    );

    return {
      id: userEntity.id,
      username: userEntity.username,
      name: userEntity.name,
      token: accessToken
    }
  }
}

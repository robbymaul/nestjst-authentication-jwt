import { Body, Controller, HttpCode, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { UserService } from '../../../core/user/service/user.service';
import { LoginUserRequest, RegisterUserRequest, UserResponse } from '../../web/web.user';
import { WebResponse } from '../../web/web.response';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';
import { log, Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('api/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logging: Logger
    ) {}

  @Post("/register")
  async register(@Body() registerRequest: RegisterUserRequest): Promise<WebResponse<UserResponse>> {
    try {
      const user = await this.userService.registerUser(registerRequest);

      return {
        code: HttpStatus.CREATED,
        data: user
      }
    } catch (e) {
      throw HttpException
    }
  }

  @Post("/login")
  async login(@Body() loginRequest: LoginUserRequest): Promise<WebResponse<UserResponse>> {
    this.logging.info(`login request ${loginRequest.username}`);

    try {
      const loginUser = await this.userService.loginUser(loginRequest);

      return {
        code: HttpStatus.OK,
        data: loginUser
      }
    } catch (e) {
      this.logging.error(`login request ${e}`);
      throw HttpException
    }
  }
}

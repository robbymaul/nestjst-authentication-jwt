import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from '../../../core/user/service/user.service';
import { RegisterUserRequest, RegisterUserResponse } from '../../web/web.user';
import { WebResponse } from '../../web/web.response';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() registerRequest: RegisterUserRequest): Promise<WebResponse<RegisterUserResponse>> {
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
}

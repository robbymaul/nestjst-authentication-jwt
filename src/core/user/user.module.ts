import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserController } from '../../presentation/controllers/user/user.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    UserService,
    {
      provide: "IUserRepository",
      useClass: UserRepository,
    },
  ],
  exports: [
    UserService,
    "IUserRepository",
  ],
  controllers: [UserController],
  imports: [JwtModule.register(
    {
      secret: 'secret',
      signOptions: {
        expiresIn: '1d',
        algorithm: 'HS256'
      },
    }
  )]
})
export class UserModule {}

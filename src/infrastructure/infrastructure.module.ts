import { Module } from '@nestjs/common';
import { UserController } from '../presentation/controllers/user/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from '../core/user/service/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    InfrastructureModule,
  ],
  controllers: [UserController],
  providers: [{
    provide: "IUserRepository",
    useClass: UserRepository,
  }, UserService, JwtService,],
})
export class InfrastructureModule {}

import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { CoreModule } from '../core/core.module';
import { UserService } from '../core/user/service/user.service';
import { UserRepository } from '../infrastructure/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  imports: [CoreModule],
  providers: [UserService, {
    provide: "IUserRepository",
    useClass: UserRepository,
  }, JwtService]
})
export class PresentationModule {}

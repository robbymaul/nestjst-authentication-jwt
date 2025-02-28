import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserController } from '../presentation/controllers/user/user.controller';

@Module({
  imports: [UserModule],
})
export class CoreModule {}

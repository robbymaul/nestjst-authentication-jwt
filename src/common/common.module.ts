import { Global, Module } from '@nestjs/common';
import { ValidationService } from './validation/validation.service';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      transports: [
        new winston.transports.Console()
      ]
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  providers: [
    ValidationService
  ]
})
export class CommonModule {}

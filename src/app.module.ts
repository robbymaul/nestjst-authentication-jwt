import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { PresentationModule } from './presentation/presentation.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CoreModule, InfrastructureModule, PresentationModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

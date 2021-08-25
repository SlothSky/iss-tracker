import { Module } from '@nestjs/common';
import { IssModule } from './iss/iss.module';

@Module({
  imports: [IssModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

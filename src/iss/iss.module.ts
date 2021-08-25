import { Module } from '@nestjs/common';
import { ISSController } from './iss.controller';
import { ISSService } from './iss.service';

@Module({
  imports: [],
  controllers: [ISSController],
  providers: [ISSService],
})
export class IssModule {}

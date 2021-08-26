import { Module } from '@nestjs/common';
import { CoordinatesService } from './coordinates.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CoordinatesService],
})
export class CoordinatesModule {}

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CoordinatesService } from './coordinates.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [CoordinatesService],
  exports: [CoordinatesService],
})
export class CoordinatesModule {}

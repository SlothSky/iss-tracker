import { Module } from '@nestjs/common';
import { SatelliteModule } from './satellite/satellite.module';
import { CoordinatesModule } from './coordinates/coordinates.module';
@Module({
  imports: [SatelliteModule, CoordinatesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

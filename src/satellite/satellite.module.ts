import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AgentControlMiddleware } from 'src/middleware/agent-control.middleware';

import { CoordinatesModule } from 'src/coordinates/coordinates.module';
import { SatelliteController } from './satellite.controller';
import { SatelliteService } from './satellite.service';

@Module({
  imports: [CoordinatesModule],
  controllers: [SatelliteController],
  providers: [SatelliteService],
})
export class SatelliteModule {}

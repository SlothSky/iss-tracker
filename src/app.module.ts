import { Module } from '@nestjs/common';
import { IssModule } from './iss/iss.module';
import { CoordinatesModule } from './coordinates/coordinates.module';
@Module({
  imports: [IssModule, CoordinatesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

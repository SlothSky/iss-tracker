import { Module } from '@nestjs/common';
import { ISSWebController } from './iss-web.controller';
import { AppService } from './app.service';
import { IssTerminalController } from './iss-terminal/iss-terminal.controller';

@Module({
  imports: [],
  controllers: [ISSWebController, IssTerminalController],
  providers: [AppService],
})
export class AppModule {}

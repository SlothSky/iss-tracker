import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('iss-web')
export class ISSWebController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('https://iss.bianco-solutions.de', 301)
  getHello(): string {
    return this.appService.getRedirectInfo();
  }
}

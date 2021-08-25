import { Controller, Get, Redirect } from '@nestjs/common';
import { ISSService } from './iss.service';

@Controller({ host: 'iss.localhost' })
export class ISSController {
  constructor(private readonly issService: ISSService) {}

  @Get()
  @Redirect('https://iss.bianco-solutions.de', 301)
  specificRedirect(): string {
    return this.issService.getRedirectInfo();
  }
}

import { Controller, Get } from '@nestjs/common';
import { ISSService } from './iss.service';

@Controller()
export class ISSController {
  constructor(private readonly issService: ISSService) {}

  @Get('test')
  specificRedirect(): string {
    return this.issService.getIssMap('');
  }
}

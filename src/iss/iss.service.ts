import { Injectable } from '@nestjs/common';

@Injectable()
export class ISSService {
  getRedirectInfo(): string {
    return 'As you are using a browser you got redirected to the browser version of this site!';
  }
}

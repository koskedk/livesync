import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'LiveSYNC running [v03FEB211139]...';
  }
}

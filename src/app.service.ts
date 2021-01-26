import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'LiveSYNC running [v13JUN202315]...';
  }
}

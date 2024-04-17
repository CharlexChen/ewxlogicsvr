import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { IRequest } from './core/interface/http';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: IRequest) {
    req.infoX('path', req.path);
    req.infoX('ip:', req.ip);
    return {
      code: 0,
      msg: 'success',
      data: {},
    };
  }
  @Get('/test')
  getTest(@Req() req: IRequest) {
    req.infoX('path', req.path);
    req.infoX('ip:', req.ip);
    return {
      code: 0,
      msg: 'success',
      data: this.appService.getHello(),
    };
  }
}

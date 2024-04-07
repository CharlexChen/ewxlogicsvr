import { WorkWechatService } from './work-wechat.service';
import { Controller, Get, Inject, Req } from '@nestjs/common';

@Controller('work-wechat')
export class WorkWechatController {
  @Inject(WorkWechatService) workWechatService: WorkWechatService;
  @Get('/test')
  async fnTest() {
    const result = await this.workWechatService.getAccessToken();
    return {
      code: 0,
      data: result,
    };
  }
  @Get('/getCollectionInfo')
  async getCollectionInfo(@Req() req) {
    const result = await this.workWechatService.getCollectionInfo(
      req.query.accessToken as string,
    );
    return {
      code: 0,
      data: result,
    };
  }
}

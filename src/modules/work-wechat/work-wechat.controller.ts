import { WorkWechatService } from './work-wechat.service';
import { Controller, Get, Inject, Req } from '@nestjs/common';

@Controller('work-wechat')
export class WorkWechatController {
  @Inject(WorkWechatService) workWechatService: WorkWechatService;
  @Get('/test')
  async fnTest() {
    const result = await this.workWechatService.getAccessToken();
    return {
      ret: 0,
      result,
    };
  }
  @Get('/getCollectionInfo')
  async getCollectionInfo(@Req() req) {
    const result = await this.workWechatService.getCollectionInfo(
      req.query.accessToken as string,
    );
    return {
      ret: 0,
      result,
    };
  }
}

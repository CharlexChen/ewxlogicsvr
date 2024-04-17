import { GetAccessTokenDto, GetCollectionInfoDto } from 'api-typings/work-wechat.api';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { WorkWechatService } from './work-wechat.service';
import { Controller, Get, Inject, Query, Req } from '@nestjs/common';

@Controller('work-wechat')
export class WorkWechatController {
  @Inject(WorkWechatService) workWechatService: WorkWechatService;
  @Get('/getAccessToken')
  async queryAccessToken(@Query(new ValidationPipe()) query: GetAccessTokenDto) {
    const corid = query.corid;
    const secret = query.secret;
    const result = await this.workWechatService.getAccessToken(corid, secret);
    return {
      code: 0,
      data: result,
    };
  }
  @Get('/getCollectionInfo')
  async getCollectionInfo(@Query(new ValidationPipe()) query: GetCollectionInfoDto) {
    const result = await this.workWechatService.getCollectionInfo(
      query.accessToken,
      query.formId,
    );
    return {
      code: 0,
      data: result,
    };
  }
}

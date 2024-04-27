import { Module } from '@nestjs/common';
import { WorkWechatController } from './work-wechat.controller';
import { WorkWechatService } from './work-wechat.service';
import { CommonModule } from '../common/common.module';
import { TelecomController } from './telecom.controller';

@Module({
  imports: [CommonModule],
  controllers: [WorkWechatController, TelecomController],
  providers: [WorkWechatService],
})
export class WorkWechatModule {}

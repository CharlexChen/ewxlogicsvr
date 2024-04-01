import { Module } from '@nestjs/common';
import { WorkWechatController } from './work-wechat.controller';
import { WorkWechatService } from './work-wechat.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [WorkWechatController],
  providers: [WorkWechatService],
})
export class WorkWechatModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkWechatModule } from './modules/work-wechat/work-wechat.module';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [WorkWechatModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkWechatModule } from './modules/work-wechat/work-wechat.module';
import { CommonModule } from './modules/common/common.module';
import { PageModule } from './modules/page/page.module';
import { FlowModule } from './modules/flow/flow.module';

@Module({
  imports: [WorkWechatModule, CommonModule, PageModule, FlowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

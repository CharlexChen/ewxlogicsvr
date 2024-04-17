import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
import { initCoreApplication } from './core';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static(path.join(__dirname, '..', 'build')));
  // 应用基础能力初始化（日志）
  // TODO: 读取配置能力
  initCoreApplication(app);
  await app.listen(3010);
}
bootstrap();

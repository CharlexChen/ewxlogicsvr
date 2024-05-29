import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from './prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [CommonController],
  providers: [CommonService, PrismaService],
  exports: [CommonService, PrismaService],
})
export class CommonModule {}

import { Body, Controller, Get, Inject, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IPluginRequestBody } from '../../api-typings/common';
import { CommonService } from './common.service';
import { IRequest } from 'src/core/interface/http';

@Controller('common')
export class CommonController {
    @Inject(CommonService) commonService: CommonService;
    @Get('/getUserInfo')
    getUserInfo() {
        return {
            code: 0,
            msg: '',
            data: {
                username: 'cc',
                avatar: 'https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/images/icon/login/mp_service_new6d0e70.png',
                age: 18,
                country: 'china',
            },
        }
    }
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }
    @Post('/pluginRequest')
    async pluginRequest(@Req() req: IRequest, @Body() body: IPluginRequestBody) {
        // if (body.webhook.indexOf('qyapi.weixin.qq.com/cgi-bin/webhook') > -1) {
        if (body.webhook.indexOf('qyapi.weixin.qq.com') === -1) {
            return {
                code: -1,
                msg: '禁止访问'
            };
        }
        try {
            let resp = null;
            if (body.method === 'GET') {
                resp = await this.commonService.getByHttp(body.webhook, { params: body.data });
            } else if (body.method === 'POST') {
                resp = await this.commonService.postByHttp(body.webhook, body.data);
            }
            req.infoX('>>>pluginRequest resp', resp);
            return {
                code: 0,
                msg: '发送成功',
            }
        } catch (error) {
            return {
                code: -1,
                msg: '网络异常'
            }
        }
    }
}

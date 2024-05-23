import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('common')
export class CommonController {
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
}

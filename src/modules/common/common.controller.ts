import { Controller, Get } from '@nestjs/common';

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
}

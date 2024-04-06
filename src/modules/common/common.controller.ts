import { Controller, Get } from '@nestjs/common';

@Controller('common')
export class CommonController {
    @Get('/getUserInfo')
    getUserInfo() {
        return {
            ret: 0,
            msg: '',
            data: {
                nickname: 'cc',
                age: 18,
                country: 'china',
            },
        }
    }
}

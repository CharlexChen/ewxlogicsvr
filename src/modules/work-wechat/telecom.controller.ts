import { Controller, Get, Req, Res } from '@nestjs/common';
import { IRequest, IResponse } from '../../core/interface/http';
import { render } from '../page/render';
// import { aesEncodeUrlSafe } from '../../utils/aesTool';

@Controller('telecom')
export class TelecomController {
    // 页面入口
    @Get('/')
    async home(@Res({ passthrough: false }) res: IResponse) {
        try {
            const html = await render();
            res.send(html);
        } catch (error) {
            res.send({ ret: -1, msg: 'not found' });
        }
    }
    @Get('/callback')
    async loginCallback(@Req() req: IRequest, @Res({ passthrough: true }) _res: IResponse) {
        const query = req.query;
        const enc = query.enc as string;
        return {
            code: 0,
            msg: enc ? 'callback success' : 'callback fail',
            enc,
        }
        // 没有收到telecom侧回传的enc参数，无法获取用户信息
        // if (!enc) {
        //     res.status(HttpStatus.FORBIDDEN).send();
        //     return ;
        // }
        // const result = aesEncodeUrlSafe(enc as string);
        // req.infoX('>>>result', result);
        // res.redirect('https://www.baidu.com');
    }
}

import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { render } from './render';

@Controller('page')
export class PageController {
    @Get('/')
    async home(@Res({ passthrough: false }) res: Response) {
        try {
            const html = await render();
            res.send(html);
        } catch (error) {
            res.send({ ret: -1, msg: 'not found' });
        }
    }
}

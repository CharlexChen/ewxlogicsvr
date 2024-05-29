import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { FlowService } from './flow.service';
import { IPipeDelBody, IPipeQuery, IPipeSaveBody } from '../../api-typings/flow';

@Controller('flow')
export class FlowController {
    @Inject(FlowService) flowService: FlowService;
    @Get('/')
    async getPipe(@Query() query: IPipeQuery) {
        return {
            code: 0,
            msg: 'success',
            data: await this.flowService.getFlow(Number(query.flowId)) || [],
        };
    }
    @Post('/')
    async addFlow(@Body() body: { name: string; }) {
        const resp = await this.flowService.createFlow(body);
        return {
            code: resp?.id ? 0 : -1,
            msg: resp?.id ? 'success' : 'fail',
            data: resp,
        };
    }
    @Post('/save')
    async saveFlow(@Body() body: IPipeSaveBody) {
        const resp = await this.flowService.saveFlowList(body);
        return {
            code: resp ? 0 : -1,
            msg: 'success',
            data: resp,
        };
    }
    @Post('/delete')
    async removeFlow(@Body() body: IPipeDelBody) {
        const resp = await this.flowService.deleteFlow(body);
        return {
            code: resp?.id ? 0 : -1,
            msg: resp?.id ? 'success' : 'fail',
            data: resp,
        };
    }
}

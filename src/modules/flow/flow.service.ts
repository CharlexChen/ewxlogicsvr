import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { IPipeSaveBody } from '../../api-typings/flow';

@Injectable()
export class FlowService {
    @Inject(PrismaService) prismaService: PrismaService;
    async getFlow(flowId?: number) {
        if (flowId) {
            return await this.prismaService.flow.findMany({
                where: {
                    uid: 1,
                    id: flowId,
                }
            }); 
        }
        return await this.prismaService.flow.findMany({
            where: {
                uid: 1,
            }
        });
    }
    async createFlow(info: {
        name: string;
    }) {
        return await this.prismaService.flow.create({
            data: {
                name: info.name,
                uid: 1,
                flow: '',
            }
        });
    }
    async saveFlowList(data: IPipeSaveBody) {
        const result = await this.prismaService.flow.update({
            where: {
                id: Number(data.flowId),
            },
            data: {
                flow: data.flow,
            },
        });
        return !!result.id
    }
    async deleteFlow(info: {
        flowId: number;
    }) {
        return await this.prismaService.flow.delete({
            where: {
                id: info.flowId,
            },
        });
    }
}

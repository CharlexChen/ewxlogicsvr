import api, { HttpResponse } from './base';

export type FlowListRes = Array<any>;
export const getFlowList = () => api.get<null, HttpResponse<FlowListRes>>('/flow');
export const getFlow = (flowId: number) => api.get<null, HttpResponse<FlowListRes>>('/flow', { params: { flowId } });

export interface AddFlowReq {
    name: string;
}
export const createFlow = (data: AddFlowReq) => api.post<null, HttpResponse<unknown>>('/flow', data);
export const deleteFlow = (flowId: number) => api.post<null, HttpResponse<unknown>>('/flow/delete', { flowId });
export interface SaveFlowReq {
    flowId: string;
    flow: string;
}
export const saveFlow = (data: SaveFlowReq) => api.post<null, HttpResponse<unknown>>('/flow/save', data);

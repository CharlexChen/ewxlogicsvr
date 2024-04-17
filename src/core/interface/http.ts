import { Request, Response } from 'express'

export type IRequest<T = {}> = Request & {
    logid?: string;
    infoX: (...args: any) => void;
    warnX: (...args: any) => void;
    errX: (...args: any) => void;
    debugX: (...args: any) => void;
} & T;
export type IResponse<T = {}> = Response & {} & T;
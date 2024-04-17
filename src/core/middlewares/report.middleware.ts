import { Injectable, NestMiddleware } from '@nestjs/common';
import { IRequest, IResponse } from '../interface/http';
import { uploadLog } from '../logger/tracelog';
import { NextFunction } from 'express';

export async function reportMiddleware(req: IRequest, res: IResponse, next: NextFunction) {
  req.infoX(`request start [url] ${req.url} [method] ${req.method} [refer] ${req.headers['referer']} [ua] ${req.headers['user-agent']}`);
  const startTime = Date.now();
  const after = function() {
    const current = Date.now();
    const costTime = current - startTime;
    req.infoX(`request end [statusCode] ${res.statusCode} [costTime] ${costTime}ms`);
    // TODO:report
    uploadLog(req.logid);
  }
  res.once('finish', after);
  next();
}

// @Injectable()
// export class ReportMiddleware implements NestMiddleware {
//   use(req: IRequest, res: IResponse, next: () => void) {
//     req.infoX(`request start [method]${req.method} [url]${req.url} [refer]${req.headers['referer']} [ua]${req.headers['user-agent']}`);
//     const startTime = Date.now();
//     const after = function() {
//       const current = Date.now();
//       const costTime = current - startTime;
//       req.infoX(`request end [statusCode]${res.statusCode} [costTime]${costTime}ms`);
//       // TODO:report
//       uploadLog(req.logid);
//     }
//     res.once('finish', after);
//     next();
//   }
// }

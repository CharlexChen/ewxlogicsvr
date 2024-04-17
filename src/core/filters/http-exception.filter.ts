import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const msg = exception.message;
    const res = exception.getResponse();
    let data: { code?: number; msg?: string; } = {};
    if (typeof res === 'object') {
      data = res;
    }

    response
      .status(status)
      .json({
        code: data.code,
        msg: data?.msg || msg,
        status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
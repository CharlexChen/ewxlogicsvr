import { isObject } from "@nestjs/common/utils/shared.utils";
import { ArgumentsHost, Catch, HttpException, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { RetCodeEnum } from "src/core/common/return-code";
import { IRequest, IResponse } from "../interface/http";
import { uploadLog } from "../logger/tracelog";

const label = '[global-exception]';
/**
 * 覆盖默认的异常处理方法
 * 参考nestjs实现 packages/core/exceptions/base-exception-filter.ts
 */
@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<IRequest>();
        const response = ctx.getResponse<IResponse>();
        const { method } = request;
        const url = request.originalUrl;
        const status = exception?.getStatus?.();
        // 打原始请求链路日志
        request.infoX(label, 'catch exception info:', method, url, status);
        request.errX(label, 'exception:', exception.stack);
        // 上报自定义日志系统
        if (!(exception instanceof HttpException)) {
            return this.handleUnknownError(exception, host);
        }
        // TODO:
        const resp = exception.getResponse();
        const message = isObject(resp) ? resp : { statusCode: status };
        request.errX(label, 'catch exception response:', message);
        response.set('Content-Type', 'application/json').status(status || 200).send(resp);
    }
    public handleUnknownError(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest<IRequest>();
      const response = ctx.getResponse<IResponse>();
      const isHttpError = this.isHttpError(exception);
      const body = isHttpError
        ? {
          // statusCode: exception.statusCode,
          code: RetCodeEnum.SERVER_ERROR,
          msg: exception.message,
          requestId: request.logid,
          timestamp: new Date().toISOString(),
          path: request.url,
        } : {
          // statusCode: HttpStatus.OK,
          code: RetCodeEnum.SERVER_ERROR,
          msg: 'Interval Server Error',
          requestId: request.logid,
          timestamp: new Date().toISOString(),
          path: request.url,
        }
      request.errX(label, `handleUnknownError: [isHttpError] ${this.isHttpError(exception)}, [statusCode]${isHttpError ? exception.statusCode : HttpStatus.OK}, [msg]${body.msg}`);
      uploadLog(request.logid);
      response.set('Content-Type', 'application/json').status(isHttpError ? exception.statusCode : HttpStatus.OK).send(body);
    }
    public isHttpError(err: any): err is { statusCode: number; message: string; } {
        return !!(err?.statusCode && err?.msg);
    }
}
import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidParamException extends HttpException {
    constructor(msg?: string, code?: number) {
      super({
        msg,
        code,
      }, HttpStatus.OK);
    }
  }
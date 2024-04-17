import { IRequest, IResponse } from '../interface/http';
import { NextFunction } from 'express';
import { logMount } from '../logger/tracelog';


export function loggerMiddleware(req: IRequest, res: Response, next: NextFunction) {
  logMount(req);
  next();
};

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: IRequest, res: IResponse, next: () => void) {
//     console.log('>>>LoggerMiddleware start');
//     logMount(req);
//     next();
//   }
// }

import { DynamicModule, Global, Module } from '@nestjs/common';
import { LoggerOptions } from 'winston';
import { XLogger } from './x-logger';


export const WINSTON_LOGGER_TOKEN = 'WINSTON_LOGGER';

@Global()
@Module({})
export class XLoggerModule {
    public static forRoot(options?: LoggerOptions): DynamicModule {    
        return {
            module: XLoggerModule,
            providers: [
                {
                    provide: WINSTON_LOGGER_TOKEN,
                    useValue: new XLogger(options)
                }
            ],
            exports: [
                WINSTON_LOGGER_TOKEN
            ]
        };
      }
}

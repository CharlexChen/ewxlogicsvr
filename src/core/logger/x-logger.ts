import { LogLevel, LoggerService } from "@nestjs/common";
import * as dayjs from "dayjs";
import { createLogger, format, Logger, LoggerOptions, transports } from 'winston';
import * as chalk from 'chalk';
import 'winston-daily-rotate-file';

const defaultOption = {
    level: 'debug',
    format: format.simple(),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf((ctx) => {
                    const { level, message, time } = ctx;
                    const appStr = chalk.green('[NEST]')
                    return `${appStr} ${time} ${level} ${message}`
                }),
            )
        }),
        new transports.DailyRotateFile({
            level: 'info',
            dirname: 'log',
            filename: '%DATE%.log',
            datePattern: 'YYYYMMDDHH',
            maxSize: '1024k',
            format: format.printf((ctx) => {
                const { level, message, time } = ctx;
                return `[${level}] ${time} ${message}`
            }),
        })
    ],
    // handleExceptions: true,
    // exceptionHandlers: [
    //     new transports.File({
    //         format: format.errors({ stack: true }),
    //         dirname: 'log',
    //         filename: 'error.log',
    //     }),
    // ],
}

export class XLogger implements LoggerService {
    private logger: Logger;
    constructor(options?: LoggerOptions) {
        // super();
        this.logger = createLogger(options || defaultOption);
    }
    info(...message: any[]) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const textArr = message?.map(item => typeof item === 'string' ? `${item}` : JSON.stringify(item)) || [];
        this.logger.log('info', textArr.join(' '), { time });
    }
    log(...message: any[]) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const textArr = message?.map(item => typeof item === 'string' ? `${item}` : JSON.stringify(item)) || [];
        this.logger.log('info', textArr.join(' '), { time });
    }
    error(...message: any[]) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const textArr = message?.map(item => typeof item === 'string' ? `${item}` : JSON.stringify(item)) || [];
        this.logger.log('error', textArr.join(' '), { time });
    }
    warn(...message: any[]) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const textArr = message?.map(item => typeof item === 'string' ? `${item}` : JSON.stringify(item)) || [];
        this.logger.log('warn', textArr.join(' '), { time });
    }
    debug?(...message: any[]) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const textArr = message?.map(item => typeof item === 'string' ? `${item}` : JSON.stringify(item)) || [];
        this.logger.log('debug', textArr.join(' '), { time });
    }
}
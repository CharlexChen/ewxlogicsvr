import { v4 as uuidv4 } from 'uuid';
import { IRequest } from '../interface/http';
import { XLogger } from './x-logger';

const SIMPLE_TYPES = ['number', 'string', 'boolean', 'undefined'];
const LOG_LEVEL = {
  DEBUG: 1,
  INFO: 2,
  WARN: 4,
  ERROR: 8,
};
const MAX_LOG_LENGTH = 60 * 1000;
const STACK_FILTER_LOGS = ['node_modules', '<anonymous>', 'Promise'];
let logBuffer = {};
export const tracelog = (params: {
    level: number;
    ctx?: IRequest;
    args: Array<any>;
    pid?: number;
    logid?: string;
}) => {
  const logid = params?.ctx?.logid || params?.logid;
  const level = params?.level;
  const args = params?.args || [];
  let pid = params.pid || process.pid;
  const filterArg = args.map((item) => {
    if (SIMPLE_TYPES.includes(typeof item)) return item;
    if (typeof item === 'object') {
      try {
        return item?.message || JSON.stringify(item);
      } catch (error) {
        return `JSON.stringify error ${error?.message}`
      }
    }
    return `cannot parse type [${typeof item}]`
  });
  let msg = filterArg.join(' ');
  let stack = '';
  if (level === LOG_LEVEL.ERROR) {
    const err = args.find(item => typeof item === 'object');
    stack = err?.stack || '';
    stack = stack || args.filter(item => typeof item === 'string').join(' ');
    stack = stack.replace(/\r/g, '\n').split('\n').map(line => line.trim()).filter(line => {
      return !STACK_FILTER_LOGS.some(ele => line.indexOf(ele) > -1)
    }).join('\n');
  }
  if (msg?.length && level > LOG_LEVEL.DEBUG) {
    if (logBuffer[logid]) {
        if (Array.isArray(logBuffer[logid].msg)) logBuffer[logid].msg.push(`[${level}] ${msg}`);
        if (stack) {
            logBuffer[logid].stack.push(`[${level}] ${stack}`);
        }
        if (level > logBuffer[logid].level) {
            logBuffer[logid].level = level;
        }
    } else {
        logBuffer[logid] = {
            log_id: 1001,
            time: Math.ceil(Date.now() / 1000),
            level: level || 0,
            msg: [`[${level}] ${msg}`],
            stack: stack ? [stack] : [],
            logid,
            pid,
        }
    }
  }
}
const xLogger = new XLogger();
export const logMount = async (ctx: IRequest) => {
  ctx.logid = ctx.logid || uuidv4().substr(0, 8);
  ctx.infoX = (...args) => {
    // TODO:上报
    // console.log(ctx.logid, '>>>infoX args', args);
    xLogger.info(...args);
    tracelog({
        level: LOG_LEVEL.INFO,
        ctx,
        args,
    });
  }
  ctx.errX = (...args) => {
    // TODO:上报
    xLogger.error(...args);
    tracelog({
        level: LOG_LEVEL.ERROR,
        ctx,
        args,
    });
  }
  ctx.warnX = (...args) => {
    // TODO:上报
    xLogger.warn(...args);
    tracelog({
        level: LOG_LEVEL.WARN,
        ctx,
        args,
    });
  }
  ctx.debugX = (...args) => {
    // TODO:上报
    xLogger.debug(...args);
    tracelog({
        level: LOG_LEVEL.DEBUG,
        ctx,
        args,
    });
  }
};

export const uploadLog = async (logid: string) => {
  if (logBuffer[logid]) {
    logBuffer[logid].msg = Array.isArray(logBuffer[logid].msg) ? logBuffer[logid].msg.join('\n') : logBuffer[logid].msg;
    logBuffer[logid].stack = Array.isArray(logBuffer[logid].stack) ? logBuffer[logid].stack.join('\n') : logBuffer[logid].msg;
    const msgLength = Buffer.byteLength(logBuffer[logid].msg, 'utf8');
    if (msgLength > MAX_LOG_LENGTH) {
        let buf = Buffer.from(logBuffer[logid].msg, 'utf8');
        logBuffer[logid].msg = `[msg_size] ${msgLength} ${buf.toString('utf8', 0, MAX_LOG_LENGTH)}`;
        logBuffer[logid].stack = '';
    }
    // TODO: report！！！
    // console.log('>>>uploadLog', logBuffer[logid]);
    delete logBuffer[logid];
  }  
};
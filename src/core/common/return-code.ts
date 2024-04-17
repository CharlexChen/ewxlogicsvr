export enum RetCodeEnum {
    SUCCESS = 0,
    SERVER_ERROR = -1,
    PARAM_ERROR = 10001,
}
export const RetCode = {
    0: 'success',
    [-1]: 'server error',
    10001: 'param error',
}
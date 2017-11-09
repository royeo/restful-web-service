'use strict'

/**
 * http 请求重试
 * 
 * @param {any} fn 
 * @param {number} [times=3] 
 * @param {number} [delay=0] 
 */
module.exports = (fn, times = 3, delay = 0) => {
  return function request(...args) {
    return fn(...args).catch(err => {
      if (needRetry(err)) {
        if (times-- > 0) {
          return Promise.delay(delay).then(() => request(...args));
        } else {
          err.message += ' 已重试3次';
          return Promise.reject(err);
        }
      } else {    
        return Promise.reject(err);
      }
    });
  }
}

/**
 * 对系统异常进行判断，决定是否重试
 * 
 * @param {any} err 
 * @returns 
 */
function needRetry(err) {
  const errMsg = err.toString().toLowerCase();
  const isNeed = errMsg.includes('socket hang up')
    || errMsg.includes('timeout')
    || errMsg.includes('econnreset')
    || errMsg.includes('econnrefused')
    || errMsg.includes('etimedout');
  logger.info('needRetry Function: ', isNeed, errMsg);
  return isNeed;
}
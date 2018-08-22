export const log = console.log.bind(console)

/**
 * Mix properties into target object.
 */
export function extend (to, from) {
  for (const key in from) {
    if (from.hasOwnProperty(key)) {
      to[key] = from[key]
    }
  }

  return to
}

/**
 * 取得一个字符串的字节长度
 * 汉字等字符长度算2，英文、数字等算1
 * @param s {String}
 */
export function strLen2 (s) {
  return s.replace(/[^\x00-\xff]/g, "**").length;
}

/**
* debounce
* @param fn {Function}   实际要执行的函数
* @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
*
* @return {Function}     返回一个“去弹跳”了的函数
* @reference http://hackll.com/2015/11/19/debounce-and-throttle/
*/
export function debounce(fn, delay) {
  // 定时器，用来 setTimeout
  var timer
  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this
    var args = arguments
    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)
    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * 生成一个[start, end]的随机数，闭区间
 * @param {number} start 
 * @param {number} end 
 */
export function getRandom(start, end){
  return Math.ceil(Math.random() * (end - start))
}

/**
 * 生成一个随机颜色
 * @param {number} opacity 透明度 可选
 */
export function randomColor(opacity) {
  const o = opacity || 1
  const r = getRandom(0, 255)
  const g = getRandom(0, 255)
  const b = getRandom(0, 255)

  return `rgba(${r}, ${g}, ${b}, ${o})`
}
// 防抖函数
export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 正则表达式是干什么的？字符串匹配利器(难，规则太多)
// 日期格式化
export function formatDate(date, fmt) {
  // 1.获取年份
  // y
  // y+ -> 1个或多个y
  // y* -> 0个或多个y
  // y? -> 0个或1个y

  // 2019
  // yy -19
  // yyyy- 2019
  // y-9 
  // yyy - 019
  //RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串，
  // 以此类推，RegExp.$2，RegExp.$3，..RegExp.$99总共可以有99个匹配
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    // 这些key都是正则的规则
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),// h和H
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      //为1的话就是代表 分钟时间秒 h m s 都只有个 表示只需要显示一位数 只要他传的参数不为1 就代表 需要两位数的显示方式 走后面个那个方法的流程
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
function padLeftZero (str) {// 补零
  return ('00' + str).substr(str.length);
};21
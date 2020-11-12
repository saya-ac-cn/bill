// 日期格式化 yyyy-MM-dd
const formatDateTime = (timestamp, format) => {
  const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  let returnArr = [];
  let date = new Date(timestamp);
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  returnArr.push(year, month, day, hour, minute, second);
  returnArr = returnArr.map(formatNumber);
  for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const addDate = (date, days) => {
  var d = new Date(date);
  d.setDate(d.getDate() + days);
  var m = d.getMonth() + 1;
  return d.getFullYear() + '-' + m + '-' + d.getDate();
}

const addMonth = (date, months) => {
  var d = new Date(date);
  d.setMonth(d.getMonth() + months);
  var m = d.getMonth() + 1;
  return d.getFullYear() + '-' + m + '-' + d.getDate();
}

const addYear = (date, years) => {
  var d = new Date(date);
  d.setYear(d.getFullYear() + years);
  var m = d.getMonth() + 1;
  return d.getFullYear() + '-' + m + '-' + d.getDate();
}

// 如果月份数小于两位数，自动补0
const formatMonthStr = (month) => {
  const dates = month.split("-")
  if (dates[1] < 10 && dates[1] > 0){
    return dates[0]+"-0"+dates[1]
  } else {
    return dates[0]+"-"+dates[1]
  }
}

const formatFloatNum = (number) => {  //正则验证金额输入框格式
  number = number.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')
  number = number.replace(/[\u4e00-\u9fa5]+/g, ""); //清除汉字
  number = number.replace(/[^\d.]/g, ""); //清楚非数字和小数点
  number = number.replace(/^\./g, ""); //验证第一个字符是数字而不是  
  number = number.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); //只保留第一个小数点, 清除多余的 
  return number
}

module.exports = {
  formatDateTime: formatDateTime,
  addDate: addDate,
  addMonth:addMonth,
  addYear:addYear,
  formatMonthStr:formatMonthStr,
  formatFloatNum:formatFloatNum
}

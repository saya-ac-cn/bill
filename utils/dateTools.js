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

module.exports = {
  addDate: addDate,
  addMonth:addMonth,
  addYear:addYear
}

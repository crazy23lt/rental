const nextMonth = function (time) {
  // 下一个月
  let nextMonth = new Date(time).getMonth() + 1;
  // 一个月之后的时间戳
  let endTime = new Date(time).setMonth(nextMonth);
  return endTime;
};
module.exports = nextMonth;

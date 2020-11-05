const nextMonth = function (time) {
  // 下一个月
  let nextMonth = new Date(time.beginTime - 0).getMonth() + 1;
  // 一个月之后的时间戳
  let endTime = new Date(time.beginTime - 0).setMonth(nextMonth);
  return endTime;
};
module.exports = nextMonth;

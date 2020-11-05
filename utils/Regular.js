// 正则校验身份证有效
const checkIdCard = function (card) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(card);
};
// 正则校验电话号有效
const checkPhone = function (phone) {
  const reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
  return reg.test(phone);
};
module.exports = {};

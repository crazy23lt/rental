// 账单接口
const Bill = require("express").Router();
Bill.use((req, res, next) => {
  next();
});
// 如何生成账单
/**
 * 账单需要关联合同  生成房租
 * 账单需要关联房东  查询房东所有账单
 * 账单需要关联公寓  查询此公寓所有账单
 * 账单需要水电表   记录上月结束水电读数
 * 账单需要关联租客   收单人
 * 账单状态 （0，1，2）有效没过期，有效过期，无效
 * 账单交租方式
 * 账单时间  开始时间 结束时间
 * 签订合同，自动初始化一张账单，关联合同表，初始化账单需要继承 合同time 与 Baseinfo (水电表)
 * 通过合同来计算出总共房租
 * 过滤出时间在一个月之前的有效账单
 *  账单超期
 *          超期小于一个月
 *
 *          超期大于一个月
 */

Bill.post("/test", require("../api/test"));
module.exports = Bill;

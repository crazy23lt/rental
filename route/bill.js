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

// 获取账单列表
Bill.post("/querylist/:page/:size", require("../api/queryBillList"));
// 获取账单信息
Bill.post("/queryinfo", require("../api/queryBillInfo"));
// 更新账单信息
Bill.post("/updateinfo", require("../api/updateBillInfo"));
// 房东确认收租
Bill.post("/confirmrent", require("../api/confirmRent"));
// 支付方式
Bill.post("/pay", require("../api/pay"));

module.exports = Bill;

/**
 *
 * 逻辑环境分析
 *  1.
 *
 * 合同账单逻辑需求
 * 合同   记录  房东 和  租客ID
 * 每张合同对应一部生成账单的机器，
 *    如何生成 账单？
 * 首月账单：
 *    根据合同 起始租房时间 戳来等于账单 月首时间戳 并自动计算 月末时间戳 （逾期：2，有效：1，失效：0）
 * 后续账单（自动生成账单）
 *
 * 发送账单（加工机器打上标记）（查询并更新账单信息）
 *     发送账单列表值会返回 逾期的账单，房东填写
 *
 *
 *
 *
 * new Date("2019-12-1").getTime()
 * 1575129600000
 * new Date("2020-1-1").getTime()
 * 1577808000000
 * new Date("2020-2-1").getTime()
 * 1580486400000
 * new Date("2020-3-1").getTime()
 * 1582992000000
 * new Date("2020-4-1").getTime()
 * 1585670400000
 * new Date("2020-5-1").getTime()
 * 1588262400000

 */

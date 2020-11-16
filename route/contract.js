const Contract = require("express").Router();
Contract.use((req, res, next) => {
  next();
});
// 创建合同
Contract.post("/init", require("../api/InitContract"));
// 房东签订合同
Contract.post("/visa", require("../api/VisaContract"));
// 租客签订合同
Contract.post("/visa1",require("../api/VisaContract1"))
// 查询合同
Contract.post("/search", require("../api/SearchContract"));
module.exports = Contract;

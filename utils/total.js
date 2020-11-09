const total = function (consume, contractId, owe) {
  let waterCost =
    consume.water && consume.water.end
      ? consume.water.end - consume.water.start
      : 0;
  let electricCost =
    consume.electric && consume.electric.end
      ? consume.electric.end - consume.electric.start
      : 0;
  let cw = waterCost * contractId.roomConfig.houseCost.water;
  let ce = electricCost * contractId.roomConfig.houseCost.electricity;
  // 一个月的房租
  let cr =
    contractId.roomConfig.houseCost.clear +
    contractId.roomConfig.houseCost.rent +
    contractId.roomConfig.houseCost.net;
  return cr * owe + cr + cw + ce;
};
module.exports = total;

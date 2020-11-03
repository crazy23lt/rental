const Unit = require("../model/unit_info");
const Build = require("../model/build_info");
const delnull = function (obj, newObj = {}) {
  for (const key in obj) {
    if (Object.prototype.toString.call(obj[key]).slice(8, -1) === "Object") {
      newObj[key] = {};
      delnull(obj[key], newObj[key]);
    } else {
      if (obj[key] !== null) {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
};
const empty = function (obj) {
  if (Object.prototype.toString.call(obj).slice(8, -1) === "Array") {
    // 数组
    if (obj.length) return false;
  } else {
    // 对象
    for (let key in obj) {
      return false; //非空
    }
  }
  return true; //为空
};
const unitTemplate = function (obj) {
  let ret = {
    unit_name: obj.unit_name || null,
    unit_room: obj.unit_room || null,
    unit_config: {
      bathroom: null || obj.bathroom,
      air_condition: null || obj.air_condition,
      geyser: null || obj.geyser,
      gas: null || obj.gas,
      net: null || obj.net,
    },
    unit_cost: {
      clear: obj.clear || null,
      rent: obj.rent || null,
    },
  };
  let result = delnull(ret);
  if (empty(result.unit_config)) delete result.unit_config;
  if (empty(result.unit_cost)) delete result.unit_cost;
  return result;
};
module.exports = async (req, res) => {
  const { build_ret = [], unit_ret = [] } = req.body;
  try {
    let build_status = true;
    let unit_status = true;
    // 空数据
    if (empty(build_ret) && empty(unit_ret)) {
      res.json({
        data: null,
        meta: {
          status: 200,
          msg: "信息更新成功",
        },
      });
    }
    // 公寓数据修改
    if (!empty(build_ret)) {
      // 解构 公寓数据
      const { id } = build_ret[0];
      const updata = Object.assign({}, build_ret[0]);
      delete updata.id;
      // 更新数据
      let status = await Build.findByIdAndUpdate(id, updata);
      if (!status) build_status = false;
    }
    // 公寓房型信息
    if (!empty(unit_ret)) {
      unit_ret.forEach(async (item) => {
        const { _id } = item;
        const updata = Object.assign({}, item);
        delete updata._id;
        let status = await Unit.findByIdAndUpdate(_id, updata);
        if (!status) unit_status = false;
      });
    }
    if (unit_status && build_status) {
      res.json({
        data: null,
        meta: {
          status: 200,
          msg: "信息更新成功",
        },
      });
    } else {
      res.json({    
        data: null,
        meta: {
          status: 202,
          msg: "信息更新失败",
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};

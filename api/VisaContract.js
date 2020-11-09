const Contract = require("../model/contract_info");
const Room = require("../model/room_info");
const Bill = require("../model/bill_info");
const User = require("../model/user_info");
const nextMonth = require("../utils/nextMonth");
module.exports = async (req, res) => {
  // 合同ID 租客ID
  const { id, tenantId, persons, idcard, phone } = req.body;
  const _id = tenantId;
  try {
    // 查询合同信息
    let queryInfo = await Contract.findById(id).lean();
    // 查询租客是否有住房信息
    let { userinfo } = await User.findById(_id, { userinfo: 1 }).lean();
    for (const key in userinfo) {
      if (key === "idcard" && userinfo[key] === null) {
        await User.findByIdAndUpdate(_id, {
          userinfo: Object.assign(userinfo, { idcard }),
        }).lean();
      }
      if (key === "phone" && userinfo[key] === null) {
        await User.findByIdAndUpdate(_id, {
          userinfo: Object.assign(userinfo, { phone }),
        }).lean();
      }
    }
    // 签订合同
    let vis = await Contract.findByIdAndUpdate(
      queryInfo._id,
      {
        tenantId: _id,
        Baseinfo: Object.assign(queryInfo.Baseinfo, { persons }),
        invalid: 1,
      },
      {
        new: true,
      }
    )
      .populate({ path: "tenantId" })
      .populate({ path: "roomId" });
    // 改变房间状态  已出租
    let changeStatus = await Room.findByIdAndUpdate(
      vis.roomId,
      {
        houseStatus: 2,
      },
      { new: true, select: { buildId: 1 } }
    );
    /*
    const { roomId, time, tenantId, roomConfig, Baseinfo } = vis;
    let initBill = await new Bill({
      buildID: roomId.buildId,
      startTime: time.beginTime - 0,
      endTime: nextMonth(time.beginTime - 0),
      userName: tenantId.wxinfo.nickName,
      hourse: roomConfig.houseName,
      rent: roomConfig.houseCost.rent,
      clear: roomConfig.houseCost.clear,
      intiWater: Baseinfo.water,
      eachWater: roomConfig.houseCost.water,
      initElectric: Baseinfo.electric,
      eachElectric: roomConfig.houseCost.electricity,
      eachInter: roomConfig.houseCost.net,
      beforeCost: 0,
    }).save();
    let rret = await Room.findByIdAndUpdate(
      queryInfo.roomId,
      {
        billId: initBill._id,
      },
      { new: true }
    );
    */
    let initBill = await new Bill({
      contractId: id,// 合同ID
      duration: {
        startTime: queryInfo.time.beginTime,
        endTime: nextMonth(queryInfo.time.beginTime)
      },
      consume: {
        water: {
          start: queryInfo.Baseinfo.water
        },
        electric: {
          start: queryInfo.Baseinfo.electric
        }
      }
    }).save();
    await Room.findByIdAndUpdate(
      queryInfo.roomId,
      {
        billId: initBill._id,
      },
      { new: true }
    );
    if (changeStatus && vis) {
      res.json({
        data: null,
        meta: { msg: "合同签订成功", status: 200 },
      });
    } else {
      res.json({ data: null, meta: { msg: "合同签订失败", status: 202 } });
    }
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};

const Room = require("../model/room_info");
const Contract = require("../model/contract_info");
const moment = require("moment"); //引入moment
moment.locale("zh-cna"); //设置时
module.exports = async (req, res) => {
  const { id, status } = req.body;
  try {
    let ret = null;
    let m = await Room.findById(id, { houseStatus: 1 });
    // 未发布 发布未出租 已出租
    if (status === 0 || status === 1 || status === 2) {
      ret = await Room.findByIdAndUpdate(
        id,
        { houseStatus: status, billId: null },
        { new: true, select: { buildId: 0 } }
      );
    }
    // 出租到已发布
    if (m.houseStatus === 2) {
      // 结束租房合同
      await Contract.findOneAndUpdate(
        { roomId: id, invalid: 1 },
        { invalid: 2, "time.endTime": moment().format("x") }
      );
    }
    if (ret) {
      res.json({
        data: ret,
        meta: {
          status: 200,
          msg: "状态改变成功",
        },
      });
    } else {
      res.json({
        data: null,
        meta: {
          status: 202,
          msg: "状态改变失败",
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};

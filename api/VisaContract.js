const Contract = require("../model/contract_info");
const Room = require("../model/room_info");
module.exports = async (req, res) => {
  const { id, user_id, persons, name, phone, idcard } = req.body;
  try {
    let ret = await Contract.findByIdAndUpdate(id, {
      user_id,
      invalid: true,
      tenant_info: {
        persons: persons,
        name: name,
        phone: phone,
        idcard: idcard,
      },
    });
    let ret2 = await Room.findByIdAndUpdate(ret.room_id, {
      house_status: true,
    });
    if (ret && ret2) {
      res.json({
        data: ret,
        meta: { msg: "合同签订成功", status: 200 },
      });
    } else {
      res.json({ data: null, meta: { msg: "合同签订失败", status: 200 } });
    }
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};

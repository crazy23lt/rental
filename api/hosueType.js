const Unit = require("../model/unit_info");
module.exports = async (req, res) => {
  const { id } = req.body;
  try {
    let unitInfo = await Unit.find({ build_id: id }, { __v: 0 });
    if(unitInfo){
      res.json({
        data: unitInfo,
        meta: {
          status: 200,
          msg: "",
        },
      });
    }else{
      res.json({
        data: unitInfo,
        meta: {
          status: 200,
          msg: "添加房子成功",
        },
      });
    }
      
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};

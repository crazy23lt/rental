const Bill = require("../model/bill_info");
const Room = require("../model/room_info");
const moment = require("moment"); //引入moment
moment.locale("zh-cna"); //设置时
module.exports = async (req, res) => {
    const { billId } = req.body;
    const time = moment().format("x");
    try {
        // 获取账单信息
        let InfoBill = await Bill.findById(billId).populate({ path: "contractId", select: { roomId: 1, _id: 0 } }).lean();
        // 获取账单计算前信息
        let startTime = InfoBill.duration.startTime;
        let endTime = InfoBill.duration.endTime;
        // 当前年月
        let currMonth = new Date(time - 0).getMonth();
        let currYear = new Date(time - 0).getFullYear();
        // 账单结束年月
        let endMonth = new Date(endTime).getMonth();
        let endYear = new Date(endTime).getFullYear();
        // 拖欠账单数量
        let owe = currMonth + (12 * (currYear - endYear)) - endMonth;
        // 新建账单开始时间戳
        let newStartTime = moment(endTime).add(owe, 'months').format("x");
        // 新建账单结束时间戳（默认一个月）
        let newEndTime = moment(endTime).add(owe + 1, 'months').format("x");
        // 设置完结账单状态与完结时间
        let UpdateBill = await Bill.findByIdAndUpdate(billId, {
            status: 1,
            "duration.endTime": newStartTime - 0
        });
        // 新建下月账单
        let CreateBill = await new Bill({
            contractId: UpdateBill.contractId,
            "consume.water.start": InfoBill.consume.water.end,
            "consume.electric.start": InfoBill.consume.electric.end,
            "duration.startTime": newStartTime - 0,
            "duration.endTime": newEndTime - 0
        }).save();
        // 修改公寓出租房绑定的账单ID
        let UpdateRoom = await Room.findByIdAndUpdate(InfoBill.contractId.roomId, {
            billId: CreateBill._id
        }, { new: true });
        if (UpdateBill) {
            res.json({
                data: UpdateRoom,
                meta: {
                    status: 200,
                    msg: "成功！账单结账。",
                },
            });
        } else {
            res.json({
                data: null,
                meta: {
                    status: 202,
                    msg: "失败！账单结账。",
                },
            });
        }
    } catch (e) {
        console.info(e);
        res.json({
            data: null,
            meta: { msg: "服务器出现错误，请联系维护者", status: 500 },
        });
    }
};

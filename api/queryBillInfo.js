const Bill = require("../model/bill_info");
const moment = require("moment"); //引入moment
moment.locale("zh-cna"); //设置时
module.exports = async (req, res) => {
    const { billId } = req.body;
    const time = moment().format("x");
    try {
        let BillInfo = await Bill.findById(billId, { __v: 0, status: 0 }).populate({
            path: "contractId",
            select: { "roomConfig.houseName": 1, _id: 0, "roomConfig.houseCost": 1 },
            populate: {
                path: "tenantId",
                select: { "wxinfo.avatarUrl": 1 },
            },
        }).lean();
        let endtime = BillInfo.duration.endTime;
        // 当前年月
        let currMonth = new Date(time - 0).getMonth();
        let currYear = new Date(time - 0).getFullYear();
        // 账单结束年月
        let endMonth = new Date(endtime).getMonth();
        let endYear = new Date(endtime).getFullYear();
        // 拖欠账单数量
        let owe = currMonth + (12 * (currYear - endYear)) - endMonth;
        BillInfo.owe = owe;
        if (BillInfo) {
            res.json({
                data: BillInfo,
                meta: {
                    status: 200,
                    msg: "成功！获取账单详细信息",
                },
            });
        } else {
            res.json({
                data: null,
                meta: {
                    status: 202,
                    msg: "失败！获取账单详细信息",
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

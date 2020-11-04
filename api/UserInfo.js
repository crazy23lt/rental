const User = require("../model/user_info");
module.exports = async (req, res) => {
    const { userid } = req.body;
    try {
        let UserInfo = await User.findById(userid);
        if (UserInfo) {
            const { userinfo, role, wxinfo } = UserInfo;
            res.json({
                data: {
                    nickName: wxinfo.nickName,
                    avatarUrl: wxinfo.avatarUrl,
                    role,
                    name: userinfo.name,
                    phone: userinfo.phone,
                    idcard: userinfo.idcard,
                    provinces: userinfo.provinces,
                    town: userinfo.town,
                },
                meta: {
                    status: 200,
                    msg: "获取用户信息成功",
                },
            });
        } else {
            res.json({
                data: null,
                meta: {
                    status: 202,
                    msg: "不存在该用户",
                },
            });
        }
    } catch (e) {
        console.info(e);
        res.json({
            data: null,
            meta: {
                status: 500,
                msg: "服务器错误",
            },
        });
    }
};

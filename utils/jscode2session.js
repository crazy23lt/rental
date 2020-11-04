const axios = require("axios");
module.exports = async (code) => {
    let { data } = await axios({
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxcf46c7e74bd15998&secret=70ff63f9bcc22ccc2ef3beb444a9a1e2&js_code=${code}&grant_type=authorization_code`,
    });
    // console.info(data);
    const { openid } = data;
    return { openid };
};
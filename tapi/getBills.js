
const bill = require("../model/bill_info");
module.exports = async (req, res) => {
    let id = req.body.id //公寓id
    try {
       const data= await bill.find({buildID:id})
        if(data){
            res.json({
                state:'success',
                data:data,
                mes:'每月账单'
            })
        }else{
            res.json({
                err: 'err'
            })
        }
    } catch (error) {
        res.json({
            err: 'err'
        })
    }

}
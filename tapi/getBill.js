const bill = require("../model/bill_info");
module.exports = async (req, res) => {
    let id = req.body.id //账单id
    try {
       const data= await bill.findById(id)
       console.log(data)
        if(data){
            res.json({
                state:'success',
                data:data,
                mes:'每月账单'
            })
        }else{
            console.log(123)
            res.json({
                err: 'err'
            }) 
        }
    } catch (error) {
        console.log(error)
        res.json({
            err: 'err'
        })
    }

}
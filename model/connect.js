// 创建一个连接好的mongoose
const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://RentalAdmin:liutao2568%40gmail.com@localhost:27017/Rental`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.info("数据库链接成功");
  })
  .catch((err) => {
    console.info(err);
  });
// mongoose
//   .connect(`mongodb://127.0.0.1:27017/rent_db`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.info("数据库链接成功");
//   })
//   .catch((err) => {
//     console.info(err);
//   });

const mongoose = require("mongoose");

const DB_URL =
  "mongodb://localhost:27017/store?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

console.log("Establishing Database Connection . . . ");
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.info("DB Connection Status: ", "Connection Established!");
  })
  .catch((err) => {
    console.log("DB Connnection Status: ", "Connection Failed!");
    console.error("Error Details: ", err);
  });

const db = mongoose.connection;
module.exports = db;

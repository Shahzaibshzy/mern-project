const mongoose = require('mongoose');
 
require('dotenv').config();
 
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("Connection Ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

exports.mongoConnect = async () => {
  await mongoose.connect(
    MONGO_URL /*, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }*/
  );
};

exports.mongoDisconnect = async () => {
  await mongoose.disconnect();
};

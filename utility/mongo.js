const mongoose = require("mongoose");
const mongoPath = process.env.MONGO_PATH;

module.exports = async () => {
  mongoose.connect(mongoPath, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};
console.log('Successfully connected to MongoDB')
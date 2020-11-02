const mongoose = require("mongoose");
const mongoPath =
  "mongodb+srv://proxy:KCMmongodb0312abc@the-controller.ykmyk.mongodb.net/the-controller?retryWrites=true&w=majority";

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose;
};

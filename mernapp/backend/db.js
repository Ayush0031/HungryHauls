const mongoose = require("mongoose");
const mongoURI =process.env.URI;
const mongoDB = async () => {
  await mongoose.connect(mongoURI,{ useNewUrlParser: true },async (err, result) => {
      if (err) console.log(err);
      else {
        console.log("Connected");
        const fetched_data = await mongoose.connection.db.collection(
          "food_items"
        );
        fetched_data.find({}).toArray(async function (err, data) {
          const fetched_category = await mongoose.connection.db.collection(
            "food_category"
          );
          fetched_category.find({}).toArray(function (err, Catdata) {
            if (err) {
              console.log(err);
            } else {
              global.food_category = Catdata;
              global.food_items = data;
            }
          });
        });
      }
    }
  );
};
module.exports = mongoDB;

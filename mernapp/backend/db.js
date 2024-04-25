const mongoose = require("mongoose");
const mongoURI =
  "mongodb://ayush97987:ayush%40Chandra@ac-n5jtdj5-shard-00-00.umkuxg8.mongodb.net:27017,ac-n5jtdj5-shard-00-01.umkuxg8.mongodb.net:27017,ac-n5jtdj5-shard-00-02.umkuxg8.mongodb.net:27017/HungryHauls?ssl=true&replicaSet=atlas-a2799o-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
// const mongoURI="mongodb+srv://ayush97987:ayush%40Chandra@cluster0.umkuxg8.mongodb.net/HungryHauls?retryWrites=true&w=majority&appName=Cluster0"
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
// const mongoose = require('mongoose')
// // const mongoDbClient = require("mongodb").MongoClient
// const mongoURI = 'mongodb://ayush97987:ayush%40Chandra@ac-n5jtdj5-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/Customer?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority' // Customer change url to your db you created in atlas
// // mongodb://<username>:<password>@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority
// module.exports = function (callback) {
//     mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
//         // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
//         if (err) console.log("---" + err)
//         else {
//             // var database =
//             console.log("connected to mongo")
//             const foodCollection = await mongoose.connection.db.collection("food_items");
//             foodCollection.find({}).toArray(async function (err, data) {
//                 const categoryCollection = await mongoose.connection.db.collection("Categories");
//                 categoryCollection.find({}).toArray(async function (err, Catdata) {
//                     callback(err, data, Catdata);

//                 })
//             });
//             // listCollections({name: 'food_items'}).toArray(function (err, database) {
//             // });
//             //     module.exports.Collection = database;
//             // });
//         }
//     })
// };

const Mongoose = require('mongoose');

const localDB = 'mongodb+srv://admin:admin@cluster0.vbsgm.mongodb.net/store-db';

const connectDB = async() => {

    await Mongoose.connect(localDB);
    console.log("DB connection stablished");
};

module.exports = connectDB;

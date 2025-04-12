const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connect("mongodb+srv://admin:admin%401234@cluster0.l3rpr.mongodb.net/devTinder"); 
}

module.exports = connectDB;

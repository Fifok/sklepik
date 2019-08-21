const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nickname: String,
    email: {type: String, unique: true},
    password: String
},{timestamps: true});

module.exports = mongoose.model("user",userSchema);
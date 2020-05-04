const mongoose = require("mongoose");
const dbConfig = require("../dbConfig");
const Schema = mongoose.Schema;

let locationSchema = new Schema({
    location: { type: String, required: true },
    addressLine1: { type: String },
    suiteNo: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    phoneNo: { type: String },
    timeZone: { type: String },
    facility: { type: String },
    pool: { type: String },
    createdAt: { type: Date, default: new Date() },
});

module.exports.getModel = function () {
    let connection = dbConfig.connect();
    return connection.model("location", locationSchema);
};


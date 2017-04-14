const mongoose = require('mongoose');

// Order object schema
var Schema = mongoose.Schema
 
var ordersSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    idNumber: {type: String},
    companyName: {type: String},
    email: {type: String},
    phone: {type: String},
    country: {type: String},
    address: {type: String},
    postcode: {type: String},
    city: {type: String},
    notes: {type: String}
    //orderTotal: {type: Number},
    //paymentMethod: {type: String},
    //orderItems: [Object]
});

mongoose.model('orders', ordersSchema);
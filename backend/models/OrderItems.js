
const mongoose = require('mongoose');

const OrderItems = new mongoose.Schema({
restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurant',
},
user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
},
menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'menu',
},
Quantiy: {
    type: Number,
    required: true,
},
deliveryMethod: {
    type: String,
    required: true,
},
orderStatus: {
    type: String,
},
date: {
    type: Date,
    default: Date.now,
},
});


const OrderItems = mongoose.model('orderItems', OrderItems);
module.exports = Order;
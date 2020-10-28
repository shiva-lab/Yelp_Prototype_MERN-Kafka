const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const orderSchema = new Schema({

      order_id: {
         type: mongoose.Schema.Types.ObjectId
    },
    fullname: {
        type: String,
        
    },

    restaurant_id: {
        type: String,
        
    },
   
    user_id: {
        type: String,
    },
    cartprice: {
        type: String,
        
    },
    status: {
        type: String,
    },
    deliverymode: {
        type: String,
        
    },
    
   
    
    ts: {
        type: Date,
        default: Date.now,
    },

   
    email: {
        type: String,
       
    },
    zipcode: {
        type: String
       
    },
    contactnumber: {
        type: String
       
    },
    address: {
        type: String
       
    },
    city: {
        type: String
       
    },
    cart:[{
        itemname:  {type: String},
        itemid:  {type: String},
        price:  {type: String},
        path:  {type: String},
        cartstatus:  {type: String},
        user_id:{type: String},  
    }],  
},
{
    versionKey: false
}
);
const Order = mongoose.model('order', orderSchema);
module.exports = Order;
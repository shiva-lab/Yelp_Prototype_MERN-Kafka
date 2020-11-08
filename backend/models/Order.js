const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const orderSchema = new Schema({

      order_id: {
         type: mongoose.Schema.Types.ObjectId
    },

    restaurant_id: {
        type: String,
        
    },
    restaurant_name: {type: String},
   
   
    user_id: {
        type: String,
    },
    
    user_name: {
        type: String,
    },
    deliverymode: {
        type: String,
        
    },
    
    orderstatus:{
    type: String,
    default:" "
   },
   
    
    ts: {
        type: Date,
        default: Date.now,
    },

   
    
    cart:[{
        itemname:  {type: String},
        itemid:  {type: String},
        price:  {type: String},
        path:  {type: String},
        cartstatus:  {type: String , default:" "},
        user_id:{type: String}, 
        restaurant_id: {type: String},
        restaurant_name: {type: String},
        user_name: {type: String}
    }],  
},
{
    versionKey: false
}
);
const Order = mongoose.model('order', orderSchema);
module.exports = Order;
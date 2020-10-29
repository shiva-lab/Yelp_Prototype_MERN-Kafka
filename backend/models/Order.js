const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const orderSchema = new Schema({

      order_id: {
         type: mongoose.Schema.Types.ObjectId
    },

    restaurant_id: {
        type: String,
        
    },
   
    user_id: {
        type: String,
    },
    
    deliverymode: {
        type: String,
        
    },
    
   
    
    ts: {
        type: Date,
        default: Date.now,
    },

   
    _menu: [{ type: Schema.ObjectId, ref: "Menu" }],
    _user: { type: Schema.ObjectId, ref: "User" },
    _restaurant: { type: Schema.ObjectId, ref: "Restaurant" },
    // cart:[{
    //     itemname:  {type: String},
    //     itemid:  {type: String},
    //     price:  {type: String},
    //     path:  {type: String},
    //     cartstatus:  {type: String},
    //     user_id:{type: String},  
    // }],  
},
{
    versionKey: false
}
);
const Order = mongoose.model('order', orderSchema);
module.exports = Order;
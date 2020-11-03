const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const cartSchema = new Schema({


    itemname:  {type: String},
    itemid:  {type: String},
    price:  {type: String},
    restaurant_id:{type: String},
    cartstatus:  {type: String},
    user_id:{type: String},  
    path:  {type: String},
    
    OrderPlaced : [
        {
            order_id : {type: mongoose.Schema.Types.ObjectId,
                   unique:true} ,
           
            deliverymode : {type : String , required : true} ,
            orderstatus : {type : String , required : true} ,
            ts: {    type: Date, default: Date.now,
            },

        }
    ]
 
},
{
versionKey: false
}
);
const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;
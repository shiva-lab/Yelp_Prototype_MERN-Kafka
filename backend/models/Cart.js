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

  
 
},
{
versionKey: false
}
);
const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;
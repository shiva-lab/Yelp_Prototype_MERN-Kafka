const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var menuSchema = new Schema({
    
    itemname:  {type: String},
    price:  {type: String},
    item_description: {type: String},
    path:  {type: String},
    itemcategory:  {type: String},
    quantity:  {type: String},
    Ingredients: {type: String},  
    restaurant_id:{type: String},
 

},
{
    versionKey: false
}
);
const Menu = mongoose.model('menu', menuSchema);
module.exports = Menu;
const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    // restaurant_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //   unique:true},
    restaurantname: {type: String},
    
    Emailid: {type: String,unique: true},
    restpass: {type: String},
    location: {type: String},
    rdescription: {type: String},
    ts: { type: Date,default: Date.now},
    contactinfo: {type: Number},
   
    cuisine: {type: String},
    timings: {type: String},
    zipcode: {type: Number},
    lat: {type: String},
    lng:{type: String},
    address: {type: String},
    rating: {type: String},
    modeofdelivery: {type: String},
    delivery_method: {type: String},
    website: {type: String},
    path: {type: String},
    path1: {type: String},
    path2: {type: String},
    path3: {type: String},
    
    menu:[{
    
      itemname:  {type: String},
      price:  {type: String},
      item_description: {type: String},
      path:  {type: String},
      itemcategory:  {type: String},
      quantity:  {type: String},
      Ingredients: {type: String},  
   
  }],
},
{
    versionKey: false
}
);

const Restaurant = mongoose.model('restaurant', RestaurantSchema);
module.exports = Restaurant;
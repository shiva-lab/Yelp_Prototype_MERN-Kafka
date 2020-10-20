const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId
      },
    restaurantname: {type: String,required: true},
    
    Emailid: {type: String,required: true,unique: true},
    restpass: {type: String,required: true},
    location: {type: String,required: true},
    rdescription: String,
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
    path1: String,
    path2: String,
    path3: String,
    
    menu:[{
        item_id: String,
     
      itemname: String,
      price: String,
      item_description:String,
      path: String,
      itemcategory: String,
      quantity: String,
      ts: {
          type: Date,
          default: Date.now,
      },
      Ingredients:String,  
   
  }],
 
},
{
    versionKey: false
}
);

const Restaurant = mongoose.model('restaurant', RestaurantSchema);
module.exports = Restaurant;
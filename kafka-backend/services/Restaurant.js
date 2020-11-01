const Restaurant = require("../Models/Restaurant");
var bcrypt = require("bcrypt-nodejs");


function handle_request(msg, callBack) {
    console.log("Message from Handle Request", msg);
    console.log("path", msg.path)
    console.log("From Kafka Restaurant Register Service");
    if (msg.path === "get_restaurant_details") {
        Restaurant.findById(msg.id, (error, result) => {
          if (error) {
            callBack(error);
          }
          console.log(result);
          return callBack(null, result);
        });
      }
      else if (msg.path === "create_restaurant") {
          console.log("Inside create_restaurant path")
        let data = msg.data;
        let hashp=bcrypt.hashSync(data.restpass)
        var newRestaurant = new Restaurant({
            restaurantname:data.restaurantname ,
    Emailid:data.Emailid,
    restpass: hashp,
    location:data.location ,
   
});
        
    }
    try {
              // see if user exists
              console.log(newRestaurant)
            //   var Emailid = msg.data.Emailid
            //   let restaurant =  Restaurant.findOne({ Emailid });
            //   if (restaurant) {
            //       console.log ("Restaurant Already Exists");
            //   }

            newRestaurant.save((error, data) => {
                if (error) {
                  callBack(error);
                }
                console.log(data);
                return callBack(null, data);
              })
        
            // newRestaurant.save()
            // try{
            //     console.log("Successfully Added")
            //     return callBack(null,data);
            // }

            // catch(err) {
            // console.log(err)
            // };       
            } 
            catch (err) {
              console.error(err.message);
            }}

            exports.handle_request = handle_request;
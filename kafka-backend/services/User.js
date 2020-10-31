const User = require("../Models/User");
var bcrypt = require("bcrypt-nodejs");




function handle_request(msg, callBack) {
  console.log("Message from Handle Request", msg);
  console.log("path", msg.path)
  console.log("From Kafka User Register Service");
  if (msg.path === "get_user_details") {
      User.findById(msg.id, (error, result) => {
        if (error) {
          callBack(error);
        }
        console.log(result);
        return callBack(null, result);
      });
    }
    else if (msg.path === "create_user") {
        console.log("Inside create_user path")
      let data = msg.data;
      let hashp=bcrypt.hashSync(data.userpass)

      var newUser = new User({
          user_name:data.user_name ,
  Emailid:data.Emailid,
  userpass: hashp,
  zipcode:data.zipcode ,
});
      
  
  try {
            // see if user exists
            console.log(newUser)
          //   var Emailid = msg.data.Emailid
          //   let restaurant =  Restaurant.findOne({ Emailid });
          //   if (restaurant) {
          //       console.log ("Restaurant Already Exists");
          //   }

          newUser.save((error, data) => {
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

        
          else if (msg.path === "student_login") {
            let data = msg.data;
            Student.findOne({ email: data.email }, (error, user) => {
              if (error) {
                callBack(error);
              }
              if (user) {
                return callBack(null, user);
              }
              return callBack("No such user found");
            }
            );
          }
          
exports.handle_request = handle_request;








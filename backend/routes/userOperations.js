 const express = require("express");
// const connection = require("../models/yelpschema");
const userroute = express.Router();
const User = require('../models/User');

var multer = require('multer');
var multerS3 = require('multer-s3');
const Order = require('../models/Order');
const Restaurant = require("../models/Restaurant");
const checkAuth =require('../config/checkAuth')

const passport = require('passport');

aws = require('aws-sdk'),
aws.config.update({
  secretAccessKey: '0am/9n/qQMhH4NnBJBasYvoM8enIMta/FirpNhAf',
  accessKeyId: 'AKIAIX7RODER3FW5UBIA',
  region: 'us-east-1'
});

var app = express(),
    s3 = new aws.S3();

    var upload = multer({
      storage: multerS3({
          s3: s3,
          bucket: 'yelpa',
          key: function (req, file, cb) {
              console.log(file);
              cb(null, file.originalname); //use Date.now() for unique file keys
          }
      })
  });






//   userroute.post("/uviewrestaurant", (req, res, next) => {
//     console.log("Hello from User Restaurant View");
//     var zipcode = req.body.zipcode;
//     console.log("Zipcode from uviewrestaurant:",zipcode)
//     var sql = `SELECT * FROM dim_restaurant`;
  
//     connection.query(sql, [zipcode], function (err, results) {
//       if (err) {
//         console.log("can not fetch restaurant");
//         res.status(400).json({ responseMessage: "can not fetch restaurant" });
        
//       } else {
//         console.log("successfully retrived");
//         console.log(results);
//         res.send(JSON.stringify(results));
//       }
//     });
//   });
  
  userroute.post("/uviewmenu",(req, res) => {
  console.log(req.body.restaurant_id);
  console.log(req.body.restaurant_id);
  Restaurant.find({ _id: req.body.restaurant_id },{'menu':[]}, (error, result) => {
    if (error) {
      console.log(error)
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end();
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      console.log("result")
      console.log(result);
      res.end(JSON.stringify(result));
    }
  });
  // Restaurant.find({ _id: req.body.restaurant_id },{'menu':[]}, (error, result) => {
  //   if (error) {
  //     console.log(error)
  //     res.writeHead(500, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end();
  //   } else {
  //     res.writeHead(200, {
  //       "Content-Type": "application/json",
  //     });
  //     console.log("result")
  //     console.log(result);
  //     res.end(JSON.stringify(result));
  //   }
  // });
});

//********************* */
// List of all Users
//********************* */


userroute.post("/viewuserlist",checkAuth, async(req, res, next) => {
  const {user_id} = req.body;
  console.log("UserID: ", user_id)
  await User.find({_id: {$ne: req.body.user_id}}, (error, result) => {
    if (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end();
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      console.log(result);
      res.end(JSON.stringify(result));
    }
  });
});
//********************* */
// List of all Users by name or location
//********************* */

userroute.post("/filterusersearch", async(req, res, next) => {
  const search1 = req.body.name;
  console.log("Data: ",search1)
  //console.log("UserID: ", user_id)
  await User.find({ $or: [{fname: req.body.name }, {city: req.body.name}] }, (error, result) => {
    if (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end();
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      console.log(result);
      res.end(JSON.stringify(result));
    }
  });
});


//********************* */
// Follow Users
//********************* */

userroute.post("/followuserprofile", async (req, res, next) => {
   
  const {user_id,_id,fname,lname,city,Emailid,headline} = req.body;
  console.log("Data in backend",user_id,_id,user_id,fname,lname,city,Emailid,headline);
  User.updateOne({ _id: req.body.user_id },  { $addToSet: { followedUser: {_id:req.body._id,fname:req.body.fname,lname:req.body.lname,city:req.body.city,Emailid:req.body.Emailid,headline:req.body.headline} }}, {  safe: true },(err, data) => console.log(data))
        .then(response => {
          return res.status(200).json("Successfully Followed");
        })
        .catch(err => {
          console.log(err);
          return res.status(500).json({ error: err });
        });
    //})
  });

  //********************* */
//  Users I follow
//********************* */

userroute.post("/usersifollow", async (req, res, next) => {
   
  const {user_id} = req.body;
  console.log("Data in backend for follo list",user_id);
  User.find({ _id:req.body.user_id },{},(error, result) => {
    if (error) {
      console.log(error)
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end();
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      console.log("result")
      console.log(result);
      res.end(JSON.stringify(result));
    }
  });
});
  




userroute.post("/addtocart", async(req, res) => {
  const { itemname,price,path,restaurant_id,user_id,_id,user_name} = req.body;

  var cartstatus="New"
  var orderstatus=" "
  console.log(itemname, restaurant_id, price, user_id, path, cartstatus,user_name);



  Order.findOneAndUpdate(
    { user_id:req.body.user_id,restaurant_id: req.body.restaurant_id, orderstatus:" "},
    {  restaurant_id: req.body.restaurant_id,user_name:req.body.user_name,orderstatus:orderstatus, $push: { cart:{itemname:req.body.itemname ,itemid:req.body._id,price:req.body.price,path:req.body.path,cartstatus:cartstatus,user_id:req.body.user_id,restaurant_id:req.body.restaurant_id ,  user_name:req.body.user_name} }},{upsert:true},(error, data) => {
   
// order = new Order({
//   user_id:req.body.user_id,
//   restaurant_id:req.body.restaurant_id,
//   user_name:req.body.user_name,
// cart: [{
//   itemname:req.body.itemname,itemid:req.body._id,price:req.body.price,path:req.body.path,cartstatus:cartstatus,user_id:req.body.user_id,restaurant_id:req.body.restaurant_id,

// }]
//  });
//  //await order.save();
//  await order.save((error, data) => {
  if (error) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    })
    res.end();
}
else {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    })
    res.end(JSON.stringify(data));;
}
})

      


});





userroute.post("/uviewcart",(req, res) => {
  console.log("User ID: ",req.body.user_id);
  Order.find({  "user_id": req.body.user_id,orderstatus:" " },{}, (error, result) => {
    
    if (error) {
      console.log(error)
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end();
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      console.log("result")
      console.log(result);
      res.end(JSON.stringify(result));
    }
  });
});
userroute.post("/deletefromcart", (req, res) => {
  console.log("Printing Body",req.body);
  Order.updateOne({ user_id:req.body.user_id,restaurant_id:req.body.restaurant_id,orderstatus:" "},{ $pull: { "cart": { "itemid": req.body.itemid } }}, { safe: true, multi:true },(error, result) => {
    if (error) {
      res.writeHead(500, {
          'Content-Type': 'text/plain'
      })
      res.end();
  }
  else {
      res.writeHead(200, {
          'Content-Type': 'text/plain'
      })
      res.end();
  }
          })
           
        });
  


  

   userroute.post("/createorder", (req, res) => {
    const { deliverymode,user_id, order_id} = req.body;//removed rest id
    console.log(deliverymode,user_id, order_id)
    var orderstatus = "new order"
    var cartstatus="done"
    var ts = Date.now()
  
   try {
        // Order.Update(
        //   { _id: req.body.order_id },{deliverymode:req.body.deliverymode,orderstatus:orderstatus,$set :{'cart.$.cartstatus:"done"}}, {multi: true}
        Order.updateOne({'_id': req.body.order_id, "cart.user_id": req.body.user_id},
      {$set: {"cart.$.cartstatus": "done"}, deliverymode:req.body.deliverymode,orderstatus:orderstatus,ts:ts},
    
          (error, results) => {
            if (error) {
              console.log(error);
            } else {
              res.writeHead(200, {
                "Content-Type": "text/plain",
              });
              res.end();
            } 
            })
          }
       catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
  
    
          

//      res.cookie('order_id', Order._id, { maxAge: 900000, httpOnly: false, path: '/' });
//      console.log(order_id);
// res.writeHead(200, {
// 'Content-Type': 'text/plain'
// })
// res.end();

  })



userroute.post("/uviewprofile",(req, res) => {
  console.log(req.body.user_id);
  User.find({ _id: req.body.user_id }, (error, result) => {
    if (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end();
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      console.log(result);
      res.end(JSON.stringify(result));
    }
  });
});







  

        
        // // Updating user Profile
        userroute.post("/uupdateprofile", upload.single("myfile"), async (req, res, next) => {
          try {
            console.log("Uploading user Image...");
          } catch (err) {
            res.send(400);
          }
          var path = req.file.location;
          console.log("Add userupdae API Checkpoint");
          console.log("Image Path on AWS: ", path);
          const { bio,headline, fname,lname,city,ustate,country, nick_name,mobile,emailid,address, favorites, myblog,things_ilove,
            find_me_in,user_id,dob
          } = req.body;
        
          console.log(
            "Data in backend",bio,headline,fname,lname,city,ustate,
            country,nick_name,mobile,emailid,address,favorites,myblog,things_ilove,find_me_in,path,
user_id,
            dob
          );
        
          User.findByIdAndUpdate(
            { _id: req.body.user_id },
            {
            bio,
            headline,
            fname,
            lname,
            city,
            ustate,
            country,
            nick_name,
            mobile,
            emailid,
            address,
            favorites,
            myblog,
            things_ilove,
            find_me_in,
            path,
            dob
            },{new:true},(error, results) => {
              if (error) {
                console.log("error");
              } else {
                console.log("Success");
                console.log(results);
                res.send(JSON.stringify(results));
              }
            }
          );
        }
        );






 module.exports = userroute;


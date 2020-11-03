 const express = require("express");
// const connection = require("../models/yelpschema");
const userroute = express.Router();
const User = require('../models/User');
const Menu = require("../models/Menu");
const Cart = require("../models/Cart");
var multer = require('multer');
var multerS3 = require('multer-s3');
const Order = require('../models/Order');
const Restaurant = require("../models/Restaurant");

const passport = require('passport');
let checkAuth = passport.authenticate('jwt', { session: false });

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
  
  userroute.post("/uviewmenu", (req, res) => {
  console.log(req.body.restaurant_id);
  console.log(req.body.restaurant_id);
  Menu.find({ restaurant_id: req.body.restaurant_id }, (error, result) => {
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


userroute.post("/viewuserlist", async(req, res, next) => {
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
// Follow Users
//********************* */

userroute.post("/followuserprofile",checkAuth, async (req, res, next) => {
   
  const {user_id,_id,fname,lname,city,Emailid,headline} = req.body;
  console.log("Data in backend",user_id,_id,user_id,fname,lname,city,Emailid,headline);
  User.update({ _id: req.body.user_id },  { $push: { followedUser: {_id:req.body._id,fname:req.body.fname,lname:req.body.lname,city:req.body.city,Emailid:req.body.Emailid,headline:req.body.headline} }}, {  safe: true, upsert: true },(err, data) => console.log(data))
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
  console.log("Data in backend",user_id);
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
  console.log(itemname, restaurant_id, price, user_id, path, cartstatus,user_name);

//var itemid=req.body._id
  // var objData={ itemname:req.body.itemname,itemid:req.body._id,price:req.body.price,path:req.body.path,cartstatus:cartstatus,user_id:req.body.user_id,restaurant_id:req.body.restaurant_id};
//  console.log(objData)

  // Order.insertOne(
  //   { user_id: req.body.user_id },
  //   { $push: { cart:{itemname:req.body.itemname ,itemid:req.body._id,price:req.body.price,path:req.body.path,cartstatus:cartstatus,user_id:req.body.user_id,restaurant_id:req.body.restaurant_id  } }},
   
order = new Order({
  user_id:req.body.user_id,
  restaurant_id:req.body.restaurant_id,
  user_name:req.body.user_name,
cart: [{
  itemname:req.body.itemname,itemid:req.body._id,price:req.body.price,path:req.body.path,cartstatus:cartstatus,user_id:req.body.user_id,restaurant_id:req.body.restaurant_id,

}]
 });
 //await order.save();
 await order.save((error, data) => {
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




// try {
 
// order = new Oder({
//   user_id
//   restaurant_id,
// cart: [{

//   itemname:req.body.itemname,itemid:req.body._id,price:req.body.price,path:req.body.path,cartstatus:cartstatus,user_id:req.body.user_id,restaurant_id:req.body.restaurant_id

// }]


// });

// await order.save();

// // const payload = {
// // event: { id: event.id },
// // };

// res.writeHead(200, {
// 'Content-Type': 'text/plain'
// })
// res.end();


// } catch (err) {
// console.error(err.message);
// res.status(500).send('Server Error');
// }

// // console.log(req.body);
// },
// );


userroute.post("/uviewcart", (req, res) => {
  console.log(req.body.user_id);
  
  
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
  console.log(req.body.itemid);
  
  Order.updateOne({ user_id:req.body.user_id},{ "$pull": { "cart": { "itemid": req.body.itemid } }}, { safe: true, multi:true },(error, result) => {
    if (error) {
      res.writeHead(500, {
          'Content-Type': 'text/plain'
      })
      res.end();
  }
  // if (result.n == 0) {
  //     res.writeHead(400, {
  //         'Content-Type': 'text/plain'
  //     })
  //     res.end("item ID does not exists");
  // }
  else {
      res.writeHead(200, {
          'Content-Type': 'text/plain'
      })
      res.end();
  }
          })
           
        });
  


  
//   userroute.post("/uviewcart", (req, res) => {
//     var user_id = req.body.user_id;
//     console.log("User ID:", user_id);
  
//     var sql = `SELECT * FROM dim_cart
//           WHERE user_id = ?
//           and order_id is NULL`;
  
//     connection.query(sql, [user_id], function (err, results) {
//       if (err) {
//         console.log("error in adding data");
//         res.status(400).json({ responseMessage: "can not fetch restaurant" });
//       } else {
//         console.log("successfully retrived");
//         console.log(results);
//         res.send(JSON.stringify(results));
//       }
//     });
//   });
  
//   userroute.post("/deletefromcart", (req, res) => {
//     var item_id = req.body.item_id;
//     var itemname = req.body.itemname;
//     var restaurant_id = req.body.restaurant_id;
//     var price = req.body.price;
//     var foodimage = req.body.foodimage;
//     var user_id = req.body.user_id;
//     var cart_id = req.body.cart_id;
//     console.log(
//       item_id,
//       itemname,
//       restaurant_id,
//       price,
//       user_id,
//       foodimage,
//       cart_id
//     );
  
//     var sql = `DELETE from dim_cart WHERE cart_id = ?`;
  
//     connection.query(sql, [cart_id], function (err, data) {
//       if (err) {
//         console.log("error in adding data");
//         res.status(400).json({ responseMessage: "can not fetch restaurant" });
//       } else {
//         console.log("Food Item Successfully Deleted to the Cart");
//         res.status(200).json({
//           responseMessage: "Login Successful",
//         });
//       }

//     });
//   });
  
//   userroute.post("/cartprice", (req, res) => {
//     var user_id = req.body.user_id;
//     console.log("User ID:", user_id);
//     var sql = `select round(sum(price),2) as price from dim_cart
//     where user_id = ? and order_id is NULL`;
//     connection.query(sql, [user_id], function (err, data) {
//       if (err) {
//         console.log("error in adding data");
//         return res.status(400).json({
//           status: 'error',
//           error: 'error in calculating price',
//         });
//       } else {
//         console.log("Price Calculated", data[0].price);
//         res.cookie("cartprice", data[0].price, {
//                       maxAge: 900000,
//                       httpOnly: false,
//                       path: "/",
//                     });
//         res.send(data);
        
//       }
//     });
//   });
   userroute.post("/createorder", (req, res) => {
    const { deliverymode,user_id, order_id} = req.body;//removed rest id
    console.log(deliverymode,user_id, order_id)
    var orderstatus = "new order"
    var cartstatus="done"
  
   try {
        // Order.Update(
        //   { _id: req.body.order_id },{deliverymode:req.body.deliverymode,orderstatus:orderstatus,$set :{'cart.$.cartstatus:"done"}}, {multi: true}
        Order.updateOne({'_id': req.body.order_id, "cart.user_id": req.body.user_id},
      {$set: {"cart.$.cartstatus": "done"}, deliverymode:req.body.deliverymode,orderstatus:orderstatus},
    
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



userroute.post("/uviewprofile", (req, res) => {
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



//   // userroute.post("/userorderstatus", (req, res) => {
//   //   var order_id = req.body.order_id;
//   //   var user_id = req.body.user_id;
//   //   console.log("Order_ID:", order_id);
//   //   console.log("User_id:", user_id);

  
//   //   var sql = `SELECT * FROM dim_order
//   //         WHERE user_id = ? ORDER BY ts DESC`;
  
//   //   connection.query(sql, [user_id], function (err, results) {
//   //     if (err) {
//   //       console.log("error in adding data");
//   //       res.status(400).json({ responseMessage: "can not fetch restaurant" });
//   //     } else {
//   //       console.log("successfully retrived");
//   //       console.log(results);
//   //       res.send(JSON.stringify(results));
//   //     }
//   //   });
//   // });


//   // userroute.post("/uorderdetails", (req, res) => {
//   //   var order_id = req.body.order_id;
//   //   console.log("Order_ID:", order_id);

  
//   //   var sql = `SELECT * FROM dim_cart
//   //         WHERE order_id = ?`;
  
//   //   connection.query(sql, [order_id], function (err, results) {
//   //     if (err) {
//   //       console.log("error in adding data");
//   //       res.status(400).json({ responseMessage: "can not fetch restaurant" });
//   //     } else {
//   //       console.log("successfully retrived");
//   //       console.log(results);
//   //       res.send(JSON.stringify(results));
//   //     }
//   //   });
//   // });


// userroute.post("/addreview", upload.single('myfile'),(req, res, next) => {
//   try {
//     res.send(req.file);
//     console.log("hello")
//   }catch(err) {
//     res.send(400);
//   }
//   var review = req.body.review;
//   var rating = req.body.rating;
//   var order_id = req.body.order_id;
//   var restaurant_id = req.body.restaurant_id;
//   var user_id = req.body.user_id;
//   var path = req.file.location;
 


//   console.log(review, rating, restaurant_id,order_id,user_id, path);

//   var sql = `INSERT INTO dim_review 
//             (
//                 review_desc, rating, restaurant_id, order_id, user_id, path
//             )
//             VALUES
//             (
//                 ?, ?, ?, ? ,?,?
//             )`;

//   connection.query(sql, [review, rating, restaurant_id,order_id, user_id, path], function (err, data) {
//     if (err) {
//       console.log("error in adding data");
//       console.log(err)
//       res.status(400).json({ responseMessage: "error in adding data" });
//     } else {
//       res.status(200)
//       console.log("successfully added");
//       var newsql = `UPDATE dim_restaurant t2
//       join (SELECT  restaurant_id, round(avg(rating)) as rating from dim_review
//       group by 1) as t1  on t1.restaurant_id = t2.restaurant_id
//       SET t2.rating = t1.rating;`;
//       connection.query(newsql, function (err, data){
//         if (err) {
//           console.log("error in adding data");
//         } else {
//           console.log("successfully updated rating");
//         }
//       })
      
//     }
//   });
// });




  
 
// userroute.post("/addtocart", async(req, res) => {
//   const { itemname,price,path,restaurant_id,user_id, 
//   } = req.body;
// //     console.log(item_id, itemname, restaurant_id, price, user_id, path);
// var cartstatus="New Order"
// var itemid=req.body._id
// //  var objData={ itemname:req.body.itemname,itemid:req.body._id,price:req.body.price,path:req.body.path,cartstatus:cartstatus,user_id:req.body.user_id};
// //  console.log(objData)
// try {
 
// cart = new Cart({
//   itemname,
//   itemid,
//   price,
//   restaurant_id,
//   cartstatus,
//   user_id,
//   path

// });

// await cart.save();

// // const payload = {
// // event: { id: event.id },
// // };

// res.writeHead(200, {
// 'Content-Type': 'text/plain'
// })
// res.end();


// } catch (err) {
// console.error(err.message);
// res.status(500).send('Server Error');
// }

// // console.log(req.body);
// },
// );


// userroute.post("/uviewcart", (req, res) => {
//   console.log(req.body.user_id);
  
//   Cart.find({ user_id: req.body.user_id },{"OrderPlaced:":{$elemMatch:{"$in":[null], "$exists":false}}}, (error, result) => {
//     if (error) {
//       console.log(error)
//       res.writeHead(500, {
//         "Content-Type": "text/plain",
//       });
//       res.end();
//     } else {
//       res.writeHead(200, {
//         "Content-Type": "application/json",
//       });
//       console.log("result")
//       console.log(result);
//       res.end(JSON.stringify(result));
//     }
//   });
// });
// userroute.post("/deletefromcart", (req, res) => {
//   console.log(req.body.itemid);
  
//   Cart.deleteOne({ itemid: req.body.itemid }, (error, result) => {
//     if (error) {
//       res.writeHead(500, {
//           'Content-Type': 'text/plain'
//       })
//       res.end();
//   }
//   // if (result.n == 0) {
//   //     res.writeHead(400, {
//   //         'Content-Type': 'text/plain'
//   //     })
//   //     res.end("item ID does not exists");
//   // }
//   else {
//       res.writeHead(200, {
//           'Content-Type': 'text/plain'
//       })
//       res.end();
//   }
//           })


         // Books.deleteOne({ BookID: req.body.BookID }, (error, result) => {
           
     //   });
  

        
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
            "Data in backend",
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
            },
            {new: true},(error, results) => {
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

//     var item_id = req.body.item_id;
//     var itemname = req.body.itemname;
//     var restaurant_id = req.body.restaurant_id;
//     var price = req.body.price;
//     var path = req.body.path;
//     var user_id = req.body.user_id;
//     console.log(item_id, itemname, restaurant_id, price, user_id, path);
  
//     var sql = `INSERT INTO dim_cart
//               (
//                 item_id, itemname, restaurant_id, price, user_id, path
//               )
//               VALUES
//               (
//                   ?,?,?,?,?,?
//               )`;
  
//     connection.query(
//       sql,
//       [item_id, itemname, restaurant_id, price, user_id, path],
//       function (err, data) {
//         if (err) {
//           console.log("error in adding data to cart");
//           res.status(400).json({ responseMessage: "error in adding data to cartt" });
          
        
//         } else {
//           console.log("Food Item Successfully Added to the Cart");
//           res.status(200).json({
//             responseMessage: "Food Item Successfully Added",
//           });
//         }
//       }
//     );
//   });
  
//   userroute.post("/uviewcart", (req, res) => {
//     var user_id = req.body.user_id;
//     console.log("User ID:", user_id);
  
//     var sql = `SELECT * FROM dim_cart
//           WHERE user_id = ?
//           and order_id is NULL`;
  
//     connection.query(sql, [user_id], function (err, results) {
//       if (err) {
//         console.log("error in adding data");
//         res.status(400).json({ responseMessage: "can not fetch restaurant" });
//       } else {
//         console.log("successfully retrived");
//         console.log(results);
//         res.send(JSON.stringify(results));
//       }
//     });
//   });
  
//   userroute.post("/deletefromcart", (req, res) => {
//     var item_id = req.body.item_id;
//     var itemname = req.body.itemname;
//     var restaurant_id = req.body.restaurant_id;
//     var price = req.body.price;
//     var foodimage = req.body.foodimage;
//     var user_id = req.body.user_id;
//     var cart_id = req.body.cart_id;
//     console.log(
//       item_id,
//       itemname,
//       restaurant_id,
//       price,
//       user_id,
//       foodimage,
//       cart_id
//     );
  
//     var sql = `DELETE from dim_cart WHERE cart_id = ?`;
  
//     connection.query(sql, [cart_id], function (err, data) {
//       if (err) {
//         console.log("error in adding data");
//         res.status(400).json({ responseMessage: "can not fetch restaurant" });
//       } else {
//         console.log("Food Item Successfully Deleted to the Cart");
//         res.status(200).json({
//           responseMessage: "Login Successful",
//         });
//       }

//     });
//   });
  
//   userroute.post("/cartprice", (req, res) => {
//     var user_id = req.body.user_id;
//     console.log("User ID:", user_id);
//     var sql = `select round(sum(price),2) as price from dim_cart
//     where user_id = ? and order_id is NULL`;
//     connection.query(sql, [user_id], function (err, data) {
//       if (err) {
//         console.log("error in adding data");
//         return res.status(400).json({
//           status: 'error',
//           error: 'error in calculating price',
//         });
//       } else {
//         console.log("Price Calculated", data[0].price);
//         res.cookie("cartprice", data[0].price, {
//                       maxAge: 900000,
//                       httpOnly: false,
//                       path: "/",
//                     });
//         res.send(data);
        
//       }
//     });
//   });
  
//   // userroute.post("/createorder", (req, res) => {
//   //   var fullname = req.body.fullname;
//   //   var address = req.body.address;
//   //   var city = req.body.city;
//   //   var zipcode = req.body.zipcode;
//   //   //var mode = req.body.mode;
//   //   var deliverymode = req.body.deliverymode;
//   //   var contactnumber = req.body.contactnumber;
//   //   var email = req.body.email;
//   //   var restaurant_id = req.body.restaurant_id;
//   //   var user_id = req.body.user_id;
//   //   var cartprice = req.body.cartprice;
//   //   var status = "new order"
//   //   //var status = req.body.status;
//   //   console.log(fullname,address,city,zipcode,deliverymode,contactnumber,email,restaurant_id,user_id,cartprice,status)
  
//   //   var sql = `INSERT INTO dim_order 
//   //         (
//   //             fullname,address,city,zipcode,deliverymode,contactnumber,email,restaurant_id,user_id,cartprice,status
//   //         )
//   //         VALUES
//   //         (
//   //             ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
//   //         )`;
  
//   //   connection.query(
//   //     sql,
//   //     [
//   //       fullname,address,city,zipcode,deliverymode,contactnumber,email,restaurant_id,user_id,cartprice, status
//   //     ],
//   //     function (err, data) {
//   //       if (err) {
//   //         console.log("error in adding data");
//   //         console.log(err)
//   //       } else {
//   //         res.cookie("order_id", data.insertId, {
//   //           maxAge: 900000,
//   //           httpOnly: false,
//   //           path: "/",
//   //         });
//   //         res.status(200).json({
//   //           responseMessage: "order placed",
//   //         });
//   //         console.log(JSON.stringify(data.insertId))
//   //         var order_id = JSON.stringify(data.insertId)

//   //         console.log("Order ID : ", order_id, restaurant_id, user_id)
//   //         var sql = `UPDATE dim_cart 
//   //         SET order_id = ?,
//   //         cartstatus = 'done'
//   //         WHERE restaurant_id = ?
//   //         and user_id = ?
//   //         and cartstatus is NULL`;
//   //         connection.query(sql,[order_id,restaurant_id,user_id], function (err, data){
//   //         if (err){
//   //           console.log("error in adding data");
//   //         }
//   //         else{
//   //           console.log("Success")
//   //           };
//   //         } 
            
//   //           )


//   //       }
//   //     }
//   //   );
//   // });





 module.exports = userroute;


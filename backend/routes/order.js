const express = require("express");
//const connection = require("../models/yelpschema");
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
//const Cart = require('../models/Cart');
const orderroute = express.Router();
//const User = require('../models/User');
const Order = require('../models/Order');
//const Restaurant = require("../models/Restaurant");
//const Cart = require("../models/Cart");
const passport = require("passport");
const checkAuth =require('../config/checkAuth')

 orderroute.post("/rvieworder",(req, res) => {
   Order.find({restaurant_id:req.body.restaurant_id,orderstatus:{ $ne: " " }}, (error, result) => {
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








// orderroute.post("/userorderstatus", (req, res) => {
//   var order_id = req.body.order_id;
//   var user_id = req.body.user_id;
//   console.log("Order_ID:", order_id);
//   console.log("User_id:", user_id);


//   var sql = `SELECT * FROM dim_order
//         WHERE user_id = ? ORDER BY ts DESC`;

//   connection.query(sql, [user_id], function (err, results) {
//     if (err) {
//       console.log("error in adding data");
//       res.status(400).json({ responseMessage: "can not fetch restaurant" });
//     } else {
//       console.log("successfully retrived");
//       console.log(results);
//       res.send(JSON.stringify(results));
//     }
//   });
// });


orderroute.post("/userorderstatus",(req, res) => {
    Order.find({ user_id: req.body.user_id,orderstatus:{ $ne: " " }} , (error, result) => {
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
    }).sort({ts:1});
  });

  orderroute.post("/userorderstatusdesc",(req, res) => {
    Order.find({ user_id: req.body.user_id,orderstatus:{ $ne: " " }} , (error, result) => {
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
    }).sort({ts:-1});
  });

  orderroute.post("/filterordersearch",(req, res) => {
    //console.log(req.body.user_id,req.body.filter);
    console.log(req.body);
    
    // Order.find({ $or: [{user_id: req.body.user_id }, {restaurant_id: req.body.restaurant_id}],orderstatus:req.body.filter} , (error, result) => {
    Order.find({ user_id: req.body.user_id,orderstatus:req.body.filter} , (error, result) => {
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
  
  

  orderroute.post("/uorderdetails",(req, res) => {
    console.log(req.body.order_id);
    
    Order.find({ "_id": req.body.order_id},{'cart':[]}, (error, result) => {
   
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
 orderroute.post("/neworderstatuschange", (req, res) => {
   console.log(req.body)
   try{
   Order.findByIdAndUpdate({_id:req.body._id},{orderstatus:req.body.updatestatus},{new:true},(error, result) => {
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
}
catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
}

});
    



// orderroute.post("/uorderdetails", (req, res) => {
//   var order_id = req.body.order_id;
//   console.log("Order_ID:", order_id);


//   var sql = `SELECT * FROM dim_cart
//         WHERE order_id = ?`;

//   connection.query(sql, [order_id], function (err, results) {
//     if (err) {
//       console.log("error in adding data");
//       res.status(400).json({ responseMessage: "can not fetch restaurant" });
//     } else {
//       console.log("successfully retrived");
//       console.log(results);
//       res.send(JSON.stringify(results));
//     }
//   });
// });
 module.exports = orderroute;
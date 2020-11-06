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
let checkAuth = passport.authenticate('jwt', { session: false });

 orderroute.post("/rvieworder", (req, res) => {
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
//   var restaurant_id = req.body.restaurant_id;
//   var status = "new order";
//   //var restaurant_id = req.body.restaurant_id;
//   console.log("Restaurant ID ", restaurant_id);
//   console.log("status:", status);

//   var sql = `SELECT * FROM dim_order a
//   join dim_cart b on a.order_id = b.order_id 
//           WHERE a.restaurant_id = ? and a.status = ?`;

//   connection.query(sql, [restaurant_id, status], function (err, results) {
//     if (err) {
//       console.log("error in adding data");
//       console.log(err);
//       res.status(400).json({
//         responseMessage: "Issue while querying database",
//       });
//     } else {
//       console.log("successfully retrived");
//       console.log(results);
//       res.send(JSON.stringify(results));
//     }
//   });
// });

// orderroute.post("/acceptorder", (req, res) => {
//   var order_id = req.body.order_id;
//   var orderstatus = "In Progress";

//   console.log(order_id, orderstatus);
//   var sql = `UPDATE dim_order  
//       SET status= ? 
//       WHERE  
//       order_id = ?`;

//   connection.query(sql, [orderstatus, order_id], function (err, data) {
//     if (err) {
//       console.log("error in updating data");
//     } else {
//       res.status(200).json({
//         responseMessage: "Successful",
//       });
//       console.log("successfully accepted");
//     }
//   });
// });

// orderroute.post("/rejectorder", (req, res) => {
//   var order_id = req.body.order_id;
//   var orderstatus = "Rejected";

//   console.log(order_id, orderstatus);
//   var sql = `UPDATE dim_order  
//       SET status= ? 
//       WHERE  
//       order_id = ?`;

//   connection.query(sql, [orderstatus, order_id], function (err, data) {
//     if (err) {
//       console.log("error in updating data");
//     } else {
//       console.log("successfully rejected");
//       res.status(200).json({
//         responseMessage: "Successful",
//       });
//     }
//   });
// });

// orderroute.post("/rcurrentorder", (req, res) => {
//   var restaurant_id = req.body.restaurant_id;
//   //console.log("view menu", fool);
//   //var restaurant_id = localStorage.getItem("restaurant_id");
//   //var restaurant_id = req.body.restaurant_id;
//   var status = "In Progress";
//   var restaurant_id = req.body.restaurant_id;
//   console.log("Restaurant ID ", restaurant_id);
//   console.log("status:", status);

//   var sql = `SELECT * FROM dim_order 
//           WHERE restaurant_id = ? and status = ?`;

//   connection.query(sql, [restaurant_id, status], function (err, results) {
//     if (err) {
//       console.log("error in adding data");
//       console.log(err);
//     } else {
//       console.log("successfully retrived");
//       console.log(results);
//       res.send(JSON.stringify(results));
//     }
//   });
// });

// orderroute.post("/orderinprogress", (req, res) => {
//   var order_id = req.body.order_id;
//   var orderstatus = "Food Ready";

//   console.log(order_id, orderstatus);
//   var sql = `UPDATE dim_order  
//       SET status= ? 
//       WHERE  
//       order_id = ?`;

//   connection.query(sql, [orderstatus, order_id], function (err, data) {
//     if (err) {
//       console.log("error in updating data");
//     } else {
//       console.log("Order Successfully Completed");
//       res.status(200).json({
//         responseMessage: "Login Successful",
//       });
//     }
//   });
// });

// orderroute.post("/foodreadystatus", (req, res) => {
//   var restaurant_id = req.body.restaurant_id;
//   var status = "Food Ready";
//   console.log("restaurant_id ", restaurant_id);
//   console.log("status:", status);

//   var sql = `SELECT * FROM dim_order 
//           WHERE restaurant_id = ? and status = ?`;

//   connection.query(sql, [restaurant_id, status], function (err, results) {
//     if (err) {
//       console.log("error in adding data");
//       console.log(err);
//     } else {
//       console.log("successfully retrived");
//       console.log(results);
//       res.send(JSON.stringify(results));
//     }
//   });
// });

// orderroute.post("/pickupdelivery", (req, res) => {
//   var order_id = req.body.order_id;
//   console.log("Inside PICKUP delivery");
//   console.log("Order ID", order_id);

//   var sql = `UPDATE dim_order
//     SET status = (case when deliverymode = 'Pickup' then 'Ready For Pickup'
//     when deliverymode = 'Delivery' then 'On the Way'
//     end)
//     WHERE order_id = ?
//     `;
//   connection.query(sql, [order_id], function (err, results) {
//     if (err) {
//       console.log("error in adding data");
//       console.log(err);
//     } else {
//       console.log("successfully Updated the Status");
//       console.log(results);
//       res.send(JSON.stringify(results));
//     }
//   });
// });

// orderroute.post("/pickupdeliverystatus", (req, res) => {
//   var restaurant_id = req.body.restaurant_id;
//   var status = "Food Ready";
//   console.log("restaurant_id ", restaurant_id);
//   console.log("status:", status);

//   var sql = `SELECT * FROM dim_order 
//           WHERE restaurant_id = ? and status in ('Ready For Pickup','On the Way')`;

//   connection.query(sql, [restaurant_id], function (err, results) {
//     if (err) {
//       console.log("error in adding data");
//       console.log(err);
//     } else {
//       console.log("successfully retrived");
//       console.log(results);
//       res.send(JSON.stringify(results));
//     }
//   });
// });

// orderroute.post("/orderfinalstatus", (req, res) => {
//   var order_id = req.body.order_id;
//   console.log("Inside Fianl Order Update");
//   console.log("Order ID", order_id);

//   var sql = `UPDATE dim_order
//     SET status = (case when deliverymode = 'Pickup' then 'Picked up'
//     when deliverymode = 'Delivery' then 'Delivered'
//     end)
//     WHERE order_id = ?
//     `;
//   connection.query(sql, [order_id], function (err, results) {
//     if (err) {
//       console.log("error in adding data");
//       console.log(err);
//     } else {
//       console.log("successfully Updated the Status");
//       console.log(results);
//       res.send(JSON.stringify(results));
//     }
//   });
// });

// orderroute.post("/orderdone", (req, res) => {
//   var restaurant_id = req.body.restaurant_id;
//   var status = "Food Ready";
//   console.log("restaurant_id ", restaurant_id);
//   console.log("status:", status);

//   var sql = `SELECT * FROM dim_order 
//           WHERE restaurant_id = ? and status in ('Picked up','Delivered')`;

//   connection.query(sql, [restaurant_id], function (err, results) {
//     if (err) {
//       console.log("error in adding data");
//       console.log(err);
//     } else {
//       console.log("successfully retrived");
//       console.log(results);
//       res.send(JSON.stringify(results));
//     }
//   });
// });



// orderroute.post("/createorder", (req, res) => {
//   var fullname = req.body.fullname;
//   var address = req.body.address;
//   var city = req.body.city;
//   var zipcode = req.body.zipcode;
//   //var mode = req.body.mode;
//   var deliverymode = req.body.deliverymode;
//   var contactnumber = req.body.contactnumber;
//   var email = req.body.email;
//   var restaurant_id = req.body.restaurant_id;
//   var user_id = req.body.user_id;
//   var cartprice = req.body.cartprice;
//   var status = "new order"
//   //var status = req.body.status;
//   console.log(fullname,address,city,zipcode,deliverymode,contactnumber,email,restaurant_id,user_id,cartprice,status)

//   var sql = `INSERT INTO dim_order 
//         (
//             fullname,address,city,zipcode,deliverymode,contactnumber,email,restaurant_id,user_id,cartprice,status
//         )
//         VALUES
//         (
//             ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
//         )`;

//   connection.query(
//     sql,
//     [
//       fullname,address,city,zipcode,deliverymode,contactnumber,email,restaurant_id,user_id,cartprice, status
//     ],
//     function (err, data) {
//       if (err) {
//         console.log("error in adding data");
//         console.log(err)
//       } else {
//         res.cookie("order_id", data.insertId, {
//           maxAge: 900000,
//           httpOnly: false,
//           path: "/",
//         });
//         res.status(200).json({
//           responseMessage: "order placed",
//         });
//         console.log(JSON.stringify(data.insertId))
//         var order_id = JSON.stringify(data.insertId)

//         console.log("Order ID : ", order_id, restaurant_id, user_id)
//         var sql = `UPDATE dim_cart 
//         SET order_id = ?,
//         cartstatus = 'done'
//         WHERE restaurant_id = ?
//         and user_id = ?
//         and cartstatus is NULL`;
//         connection.query(sql,[order_id,restaurant_id,user_id], function (err, data){
//         if (err){
//           console.log("error in adding data");
//         }
//         else{
//           console.log("Success")
//           };
//         } 
          
//           )


//       }
//     }
//   );
// });



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


orderroute.post("/userorderstatus", (req, res) => {
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

  orderroute.post("/filterordersearch", (req, res) => {
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
  
  

  orderroute.post("/uorderdetails", (req, res) => {
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
    
// orderroute.post("/neworderstatuschange", (req, res) => {
//   var order_id = req.body.order_id;
//   var status = req.body.updatestatus;
//   console.log("Inside New Order Update");
//   console.log("Order ID", order_id);
//   console.log("Status", status);

//   var sql = `UPDATE dim_order
//     SET status = ?
//     WHERE order_id = ?
//     `;
//   connection.query(sql, [status,order_id], function (err, results) {
//     if (err) {
//       console.log("error in adding data");
//       console.log(err);
//     } else {
//       console.log("successfully Updated the Status");
//       console.log(results);
//       res.send(JSON.stringify(results));
//     }
//   });
// });


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
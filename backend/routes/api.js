const express = require("express");
const router = express.Router();
//const connection = require("../models/yelpschema");
var multer = require("multer");
const Restaurant = require("../models/Restaurant");
const Order = require('../models/Order');
//let checkAuth = passport.authenticate('jwt', { session: false });
const checkAuth =require('../config/checkAuth')

var multerS3 = require("multer-s3");
(aws = require("aws-sdk")),
  aws.config.update({
    secretAccessKey: "0am/9n/qQMhH4NnBJBasYvoM8enIMta/FirpNhAf",
    accessKeyId: "AKIAIX7RODER3FW5UBIA",
    region: "us-east-1",
  });

var app = express(),
  s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "yelpa",
    key: function (req, file, cb) {
      console.log("from Multer:", file);
      cb(null, file.originalname); //use Date.now() for unique file keys
    },
  }),
});



router.post("/viewhome", (req, res) => {
  console.log(req.body.restaurant_id);
  Restaurant.find({ _id: req.body.restaurant_id }, (error, result) => {
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

router.get("/homeviewrestaurant", (req, res) => {
 // console.log(req.body.restaurant_id);
  Restaurant.find({}, (error, result) => {
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


router.post("/restaurantsearch", (req, res) => {
 console.log("Data Recieved from FrontEnd: ",req.body.search1);
 const filter = req.body.search1
   Restaurant.find(
    { $or: [{cuisine: req.body.search1 }, {location : req.body.search1},{deliverymethod : req.body.search1},{"menu.itemname" : req.body.search1}] },
    function(error, result) {
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
       console.log(result);
       res.end(JSON.stringify(result));
     }
   });
 });
 

router.post("/filterrestaurantsearch", (req, res) => {
  console.log("Data Recieved from FrontEnd: ",req.body);
  const search = req.body.search
  const filter = req.body.filter
  console.log("Data ", search,filter)
    Restaurant.find()
      .and([
        { $or: [{delivery_method: req.body.filter }, {modeofdelivery : req.body.filter}] },
          { $or: [{cuisine: req.body.search }, {location : req.body.search},{"menu.itemname" : req.body.search}] }
      ])
      .exec(function (error, result) {
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
          console.log(result);
          res.end(JSON.stringify(result));
        }
      });
  //    $and: [
  //     { $or: [{delivery_method: req.body.filter }, {modeofdelivery : req.body.filter}] },,
  //     { $or: [{cuisine: req.body.search }, {location : req.body.search},{"menu.itemname" : req.body.search}] }
  // ]},
  //    function(error, result) {
      
   
  });

// router.get("/homeviewrestaurant", (req, res, next) => {
//   console.log("Hello from home Restaurant View");
//   var sql = `SELECT * FROM dim_restaurant`;

//   connection.query(sql, function (err, results) {
//     if (err) {
//       console.log("can not fetch restaurant");
//       res.status(400).json({ responseMessage: "can not fetch restaurant" });
//     } else {
//       console.log("successfully retrived");
//       console.log(results);
//       res.send(JSON.stringify(results));
//     }
//   });
// });

// // Updating Restaurant Profile
router.post(
  "/restaurantupdate",
  upload.array("photos", 4),
  async (req, res, next) => {
    try {
      //res.send(req.files);
      console.log("hello");
    } catch (err) {
      res.send(400);
    }
    var location = req.files.map((file) => file.location);
    var path = location[0];
    var path1 = location[1];
    var path2 = location[2];
    var path3 = location[3];

    console.log("Update Restaurant API Checkpoint");
    const {
      rdescription,
      contactinfo,
      cuisine,
      timings,
      restaurant_id,
      zipcode,
      website,
      address,
      lat,
      lng,
      modeofdelivery,
      delivery_method,
    } = req.body;

    console.log(
      "Data in backend",
      rdescription,
      contactinfo,
      cuisine,
      timings,
      restaurant_id,
      zipcode,
      website,
      address,
      lat,
      lng,
      modeofdelivery,
      delivery_method,
      path,
      path1,
      path2,
      path3
    );

    Restaurant.findByIdAndUpdate(
      { _id: req.body.restaurant_id },
      {
        rdescription,
        contactinfo,
        cuisine,
        timings,
        restaurant_id,
        zipcode,
        website,
        address,
        lat,
        lng,
        modeofdelivery,
        delivery_method,
        path,
        path1,
        path2,
        path3,
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

// Addmenu
router.post("/addmenu", upload.single("myfile"), async (req, res, next) => {
  try {
    console.log("Uploading Menu Item Image...");
  } catch (err) {
    res.send(400);
  }
  var path = req.file.location;
  console.log("Add Menu Item API Checkpoint");
  console.log("Image Path on AWS: ", path);
  const {
    itemname,
    price,
    itemdescription,
    itemcategory,
    ingredients,
    restaurant_id,
  } = req.body;
var objData={ itemname:req.body.itemname,price:req.body.price,description:req.body.description,path:path,itemcategory:req.body.itemcategory, Ingredients:req.body.ingredients};
  console.log(  "Data in backend", itemname, price, itemdescription,itemcategory,ingredients,path,restaurant_id
  );
  try {
    Restaurant.findByIdAndUpdate(
      { _id: req.body.restaurant_id },
      { $push: { menu: objData  } },
      (error, results) => {
        if (error) {
          console.log("error");
        }  else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    //res.end(JSON.stringify(results));
                    res.end()
                }
        })
      }
   catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// // Addmenu
// router.post("/addmenu", upload.single("myfile"), async (req, res, next) => {
//   try {
//     console.log("Uploading Menu Item Image...");
//   } catch (err) {
//     res.send(400);
//   }
//   var path = req.file.location;
//   var quantity = "1";
//   console.log("Add Menu Item API Checkpoint");
//   console.log("Image Path on AWS: ", path);
//   console.log("Quantity",quantity)
//   const {  itemname,price,itemdescription,itemcategory,ingredients,restaurant_id,
//   } = req.body;
// // var objData={ itemname:req.body.itemname,price:req.body.price,description:req.body.description,path:path,itemcategory:req.body.itemcategory, ingredients:req.body.ingredients};
//   console.log(
//     "Data in backend", itemname,  price,itemdescription,quantity,itemcategory,ingredients, path, restaurant_id
//   );
//     menu = new Menu({
//       itemname,price,itemdescription,itemcategory,quantity,ingredients,path,restaurant_id
//   });
  
 
//     await menu.save((error, data) => {
//       if (error) {
//           res.writeHead(500, {
//               'Content-Type': 'text/plain'
//           })
//           res.end();
//       }
//       else {
//           res.writeHead(200, {
//               'Content-Type': 'text/plain'
//           })
//           res.end(JSON.stringify(data));;
//       }
//   })

// },
// );


router.post("/viewmenu", (req, res) => {
  console.log(req.body.restaurant_id);
  Restaurant.find({ _id: req.body.restaurant_id },{} ,(error, result) => {
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

// router.post("/editmenu", (req, res) => {
  router.post( "/editmenu",checkAuth,upload.single("myfile"), async(req, res, next) => {
    try {
      console.log("Uploading Menu Item Image...");
    } catch (err) {
      res.send(400);
    }
    var path = req.file.location;
    console.log("Add Menu Item API Checkpoint");
    console.log("Image Path on AWS: ", path);
    const {
      itemname, 
      price,
      itemdescription,
      itemcategory,
      ingredients,
      restaurant_id,
      item_id
    } = req.body;
var quantity="1"
    console.log(
      "Data in backend",
      itemname,
      price,
      itemdescription,
      itemcategory,
      ingredients,
      path,
      quantity,
      restaurant_id,
      item_id
      
    );



    await  Restaurant.updateOne(
        { _id: req.body.restaurant_id, "menu._id":req.body.item_id},
          { $set: { "menu.$.itemname" : itemname,"menu.$.price":price, "menu.$.itemdescription":itemdescription,"menu.$.itemcategory":itemcategory,"menu.$.quantity":quantity,"menu.$.Ingredients":ingredients,"menu.$.path":path} }
       , (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Success");
            console.log(results);
            res.send(JSON.stringify(results));
          }
        }
      );
    }
  );
  
  router.post("/deletefrommenu", (req, res) => {
    console.log(req.body._id,req.body.restaurant_id);
    
    Restaurant.updateOne({ _id:req.body.restaurant_id} ,{"$pull":{"menu":{"_id": req.body._id }}},{ safe: true, multi:true }, (error, result) => {
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
            });
  });


  router.post("/filterorderrestsearch", (req, res) => {
   
    console.log(req.body.restaurant_id,req.body.filter);
    
    // Order.find({ $or: [{user_id: req.body.user_id }, {restaurant_id: req.body.restaurant_id}],orderstatus:req.body.filter} , (error, result) => {
    Order.find({ restaurant_id: req.body.restaurant_id,orderstatus:req.body.filter} , (error, result) => {
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
// router.post("/viewhome", (req, res, next) => {
//   console.log("Hello from viewhome");
//   var restaurant_id = req.body.restaurant_id;
//   console.log("Restaurant ID ", restaurant_id);

//   //var restaurant_id = "4";
//   var sql = `SELECT * FROM dim_restaurant
//         WHERE restaurant_id = ?`;

//   connection.query(sql, [restaurant_id], function (err, results) {
//     if (err) {
//       console.log("error in adding data");
//       res.status(400).json({
//         responseMessage: "Issue while querying the items table",
//       });
//     } else {
//       console.log("successfully retrived");
//       console.log(results);
//       res.send(JSON.stringify(results));
//     }
//   });
// });

// router.post("/viewreview", (req, res, next) => {
//   console.log("Hello from viewreview");

//   var restaurant_id = req.body.restaurant_id;
//   var sql = `SELECT
//   b.fname as fname,
//   b.lname as lname,
//   b.user_name as user_name,
//   a.review_desc as review_desc,
//   a.rating as rating,
//   a.path as path,
//   DATE_FORMAT(a.ts, '%D %M %Y') as ts
//   FROM yelp.dim_review a
//   JOIN yelp.dim_user b  ON a.user_id = b.user_id
//   WHERE restaurant_id = ?
//   `;

//   connection.query(sql, [restaurant_id], function (err, results) {
//     if (err) {
//       console.log("Error in Retriving Data");
//       res.status(400).json({
//         responseMessage: "Issue while querying the items table",
//       });
//     } else {
//       console.log("successfully retrived");
//       console.log(results);
//       res.send(JSON.stringify(results));
//     }
//   });
// });

// router.post("/restaurantsearch", (req, res, next) => {
//   console.log("Hello from restaurant search");
//   var search1 = req.body.search1;
//   //var search2 = req.body.search2;
//   //console.log(search1,search2)
//   console.log(search1);
//   var sql = `SELECT a.*
//   FROM yelp.dim_restaurant a
//   join yelp.dim_menu b
//   on a.restaurant_id = b.restaurant_id
//   where (b.itemname = ? or a.restaurant_name = ? or a.cuisine = ? or a.modeofdelivery = ?)
//   group by a.restaurant_id
//   `;

//   // `SELECT a.*
//   // FROM yelp.dim_restaurant a
//   // join yelp.dim_menu b
//   // on a.restaurant_id = b.restaurant_id
//   // where (b.itemname = ? or a.restaurant_name = ? or a.cuisine = ? or a.modeofdelivery = ?)
//   // AND (a.location = ? or a.zipcode = ?)
//   // group by a.restaurant_id
//   // `;
//   // connection.query(sql,[search1,search1,search1,search1,search2,search2],function (err, results) {

//   connection.query(sql, [search1, search1, search1, search1], function (
//     err,
//     results
//   ) {
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

// router.post("/filterrestaurantsearch", (req, res, next) => {
//   console.log("Hello from filter search");
//   var filter = req.body.filter;
//   console.log(filter);
//   var sql = `SELECT * FROM dim_restaurant
//   WHERE (delivery_method = ? or location = ?)`;

//   connection.query(sql, [filter, filter], function (err, results) {
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

// router.post("/filterordersearch", (req, res, next) => {
//   console.log("Hello from filter search");
//   var filter = req.body.filter;
//   console.log(filter);
//   var sql = `SELECT * FROM dim_order
//   WHERE status = ?`;

//   connection.query(sql, [filter], function (err, results) {
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

// // router.post("/addreview", upload.single('myfile'),(req, res, next) => {
// //   try {
// //     res.send(req.file);
// //     console.log("hello")
// //   }catch(err) {
// //     res.send(400);
// //   }
// //   var review = req.body.review;
// //   var rating = req.body.rating;
// //   var order_id = req.body.order_id;
// //   var restaurant_id = req.body.restaurant_id;
// //   var user_id = req.body.user_id;
// //   var path = req.file.location;

// //   console.log(review, rating, restaurant_id,order_id,user_id, path);

// //   var sql = `INSERT INTO dim_review
// //             (
// //                 review_desc, rating, restaurant_id, order_id, user_id, path
// //             )
// //             VALUES
// //             (
// //                 ?, ?, ?, ? ,?,?
// //             )`;

// //   connection.query(sql, [review, rating, restaurant_id,order_id, user_id, path], function (err, data) {
// //     if (err) {
// //       console.log("error in adding data");
// //       console.log(err)
// //       res.status(400).json({ responseMessage: "error in adding data" });
// //     } else {
// //       console.log("successfully added");
// //       res.status(200)
// //     }
// //   });
// // });

router.post("/addreview", upload.single("myfile"), async (req, res, next) => {
  try {
    console.log("Uploading Review Item Image...");
  } catch (err) {
    res.send(400);
  }
  var path = req.file.location;
  console.log("Add Review Item API Checkpoint");
  console.log("Image Path on AWS: ", path);
  const {
    review,
    rating,
    order_id,
    restaurant_id,
    user_id,
    email
  } = req.body;

var objData={ review_desc:req.body.review,
  rating:req.body.rating,
  order_id:req.body.order_id,
  email:req.body.email,
  path:path,
  restaurant_id:req.body.restaurant_id,
  user_id:req.body.user_id,
  
};
  console.log(  "Data in backend",review,
  rating,
  order_id,
  restaurant_id,
  user_id,
  path,
  email
  );
  console.log("End")
  try {
    Restaurant.findByIdAndUpdate(
      { _id: req.body.restaurant_id },
      { $push: { review: objData  } },
      (error, results) => {
        if (error) {
          console.log("error");
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
});


router.post("/viewreview", (req, res) => {
  console.log(req.body.restaurant_id);
  Restaurant.find({ _id: req.body.restaurant_id },{} ,(error, result) => {
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


const {
  createMessage,
    getMessages,
    addMessage


} = require("./message/messageController");

router.get("/getMessages/:id", (req, res) => {
  return getMessages(req,res)
});
router.post("/addMessage", (req, res) => {
  return addMessage(req, res)
});
router.post("/createMessage", (req, res) => {
  return createMessage(req, res)
});

module.exports = router;

const express = require("express");
const router = express.Router();
//const connection = require("../models/yelpschema");
var multer = require("multer");
const Restaurant = require("../models/Restaurant");
const Menu = require("../models/Menu");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");
const { secret } = require("../Utils/config");

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
      (error, results) => {
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
// router.post("/addmenu", upload.single("myfile"), async (req, res, next) => {
//   try {
//     console.log("Uploading Menu Item Image...");
//   } catch (err) {
//     res.send(400);
//   }
//   var path = req.file.location;
//   console.log("Add Menu Item API Checkpoint");
//   console.log("Image Path on AWS: ", path);
//   const {
//     itemname,
//     price,
//     itemdescription,
//     itemcategory,
//     ingredients,
//     restaurant_id,
//   } = req.body;
// var objData={ itemname:req.body.itemname,price:req.body.price,description:req.body.description,path:path,itemcategory:req.body.itemcategory, ingredients:req.body.ingredients};
//   console.log(
//     "Data in backend",
//     itemname,
//     price,
//     itemdescription,
//     itemcategory,
//     ingredients,
//     path,
//     restaurant_id
//   );
//   try {
//     Restaurant.findByIdAndUpdate(
//       { _id: req.body.restaurant_id },
//       { $push: { menu: objData  } },
//       (error, results) => {
//         if (error) {
//           console.log("error");
//         } else {
//           res.writeHead(200, {
//             "Content-Type": "text/plain",
//           });
//           res.end();
//         } 
//         })
//       }
//    catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// Addmenu
router.post("/addmenu", upload.single("myfile"), async (req, res, next) => {
  try {
    console.log("Uploading Menu Item Image...");
  } catch (err) {
    res.send(400);
  }
  var path = req.file.location;
  var quantity='1';
  console.log("Add Menu Item API Checkpoint");
  console.log("Image Path on AWS: ", path);
  const {  itemname,price,itemdescription,itemcategory,ingredients,restaurant_id,
  } = req.body;
// var objData={ itemname:req.body.itemname,price:req.body.price,description:req.body.description,path:path,itemcategory:req.body.itemcategory, ingredients:req.body.ingredients};
  console.log(
    "Data in backend",itemname, price,itemdescription,quantity,itemcategory,ingredients, path,
    restaurant_id
  );
    menu = new Menu({
      itemname,
      price,
      itemdescription,
      itemcategory,
      quantity,
      ingredients,
      path,
      restaurant_id
  });
  
  await menu.save()
  try{
  res.writeHead(200, {
    'Content-Type': 'text/plain'
})
res.end();
 

} catch (err) {
  console.error(err.message);
  res.status(500).send('Server Error');
}

// console.log(req.body);
},
);


// router.post("/addmenu", upload.single("myfile"), (req, res, next) => {
//   try {
//     res.send(req.file);
//     console.log(req.file);
//   } catch (err) {
//     res.send(400);
//   }

//   var itemname = req.body.itemname;
//   var item_description = req.body.itemdescription;
//   var price = req.body.price;
//   var restaurant_id = req.body.restaurant_id;
//   var ingredients = req.body.ingredients;
//   console.log("Restaurant ID ", restaurant_id);
//   //var restaurant_id = "1";
//   // var foodimage = req.body.foodimage;
//   var itemcategory = req.body.itemcategory;
//   var quantity = "1";
//   var path = req.file.location;
//   console.log(
//     itemname,
//     item_description,
//     price,
//     restaurant_id,
//     itemcategory,
//     quantity,
//     ingredients,
//     path
//   );

//   var sql = `INSERT INTO dim_menu
//         (
//             itemname, item_description, price ,restaurant_id,itemcategory,quantity,ingredients,path
//         )
//         VALUES
//         (
//             ?, ?, ?, ?, ?, ?, ?,?
//         )`;

//   connection.query(
//     sql,
//     [
//       itemname,
//       item_description,
//       price,
//       restaurant_id,
//       itemcategory,
//       quantity,
//       ingredients,
//       path,
//     ],
//     function (err, data) {
//       if (err) {
//         console.log("u=Unable to insert into items database", err);
//         res.status(400).send("Unable to insert into items database");
//       } else {
//         res.status(200);
//         console.log("Successfully Added");
//       }
//     }
//   );
// });
// router.post("/viewmenu", (req, res) => {
//   console.log(req.body.restaurant_id);
//   Restaurant.find({ _id: req.body.restaurant_id },{'menu':[]}, (error, result) => {
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
router.post("/viewmenu", (req, res) => {
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
});

// router.post("/editmenu", (req, res) => {
  router.post( "/editmenu",upload.single("myfile"), (req, res, next) => {
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
    console.log(
      "Data in backend",
      itemname,
      price,
      itemdescription,
      itemcategory,
      ingredients,
      path,
      restaurant_id,
      item_id
      
    );

      Menu.findByIdAndUpdate(
        { _id: req.body.item_id, },
        {
          itemname,
          price,
          itemdescription,
          itemcategory,
          ingredients, 
        path
         
        },
        (error, results) => {
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
  
// router.post("/viewmenu", (req, res) => {
//   var restaurant_id = req.body.restaurant_id;
//   //console.log("view menu", fool);
//   //var restaurant_id = localStorage.getItem("restaurant_id");
//   //var restaurant_id = req.body.restaurant_id;
//   var restaurant_id = req.body.restaurant_id;
//   console.log("Restaurant ID ", restaurant_id);

//   var sql = `SELECT * FROM dim_menu
//         WHERE restaurant_id = ?`;

//   connection.query(sql, [restaurant_id], function (err, results) {
//     if (err) {
//       console.log("error in data");
//       res.status(400).json({
//         responseMessage: "Issue while querying the items ",
//       });
//     } else {
//       console.log("successfully retrived");
//       console.log(results);
//       res.send(JSON.stringify(results));
//     }
//   });
// });

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

// router.post("/editmenu", (req, res) => {
//   var itemname = req.body.itemname;
//   var item_id = req.body.item_id;
//   var item_description = req.body.itemdescription;
//   var price = req.body.price;
//   var restaurant_id = req.body.restaurant_id;
//   var ingredients = req.body.ingredients;
//   console.log("Restaurant ID ", restaurant_id);
//   console.log("ItemID: ", item_id);
//   //var restaurant_id = "1";
//   var foodimage = req.body.foodimage;
//   var itemcategory = req.body.itemcategory;
//   var quantity = "1";
//   console.log(
//     itemname,
//     item_description,
//     price,
//     restaurant_id,
//     foodimage,
//     itemcategory,
//     quantity,
//     ingredients,
//     item_id
//   );

//   var sql = `UPDATE dim_menu
//         SET
//         itemname = ?,
//     item_description = ?,
//     price = ?,
//     foodimage = ?,
//     itemcategory = ?,
//     ingredients = ?
//     WHERE
//     item_id = ?`;

//   connection.query(
//     sql,
//     [
//       itemname,
//       item_description,
//       price,
//       foodimage,
//       itemcategory,
//       ingredients,
//       item_id,
//     ],
//     function (err, data) {
//       if (err) {
//         console.log("error in Updating data");
//         console.log(err);
//       } else {
//         res.status(200).json({
//           responseMessage: "Menu Item Successully Updated",
//         });
//         console.log("Successfully Updated");
//       }
//     }
//   );
// });

// router.post("/deletefrommenu", (req, res) => {
//   var item_id = req.body.item_id;

//   console.log(item_id);

//   var sql = `DELETE from dim_menu WHERE item_id = ?`;

//   connection.query(sql, [item_id], function (err, data) {
//     if (err) {
//       console.log("error in Deleting data");
//       res.status(400).json({ responseMessage: "can not fetch restaunt" });
//     } else {
//       console.log("Food Item Successfully Deleted From the Menu");
//       res.status(200).json({
//         responseMessage: "Successful",
//       });
//     }
//   });
// });

// // router.post("/addevent", (req, res) => {

// //   var eventname  = req.body.eventname;
// //   var eventdescription = req.body.eventdescription;
// //   var date = req.body.date;
// //   var time = req.body.time;
// //   var address = req.body.address;
// //   var city = req.body.city;
// //   var eventimage = req.body.eventimage;
// //   var eventtype = req.body.eventtype
// //   var hashtag = req.body.hashtag
// //   var restaurant_id = req.body.restaurant_id;
// //   console.log("Restaurant ID ", restaurant_id);

// //   console.log(
// //     eventname,
// // eventdescription,
// // date,
// // time,
// // address,
// // city,
// // eventimage,
// // eventtype,
// // hashtag,
// // restaurant_id
// //   );

// //   var sql = `INSERT INTO dim_event
// //         (
// //           eventname,
// //           eventdescription,
// //           date,
// //           time,
// //           address,
// //           city,
// //           eventimage,
// //           eventtype,
// //           hashtag,
// //           restaurant_id
// //         )
// //         VALUES
// //         (
// //             ?, ?, ?, ?, ?, ?, ?,?,?,?
// //         )`;

// //   connection.query(
// //     sql,
// //     [
// //       eventname,
// //           eventdescription,
// //           date,
// //           time,
// //           address,
// //           city,
// //           eventimage,
// //           eventtype,
// //           hashtag,
// //           restaurant_id
// //     ],
// //     function (err, data) {
// //       if (err) {
// //         console.log("error in adding data");
// //         console.log(err)
// //       } else {
// //         res.status(200).json({
// //           responseMessage: "Event Successfully created",
// //         });
// //         console.log("Successfully Added");
// //       }
// //     }
// //   );
// // });

// // router.post("/viewevent", (req, res, next) => {
// //   console.log("Hello from viewevent");

// //   var restaurant_id = req.body.restaurant_id
// //   var sql = `select * from dim_event
// //   `;

// //   connection.query(sql, function (err, results) {
// //     if (err) {
// //       console.log("error in adding data");
// //     } else {
// //       console.log("successfully retrived");
// //       console.log(results);
// //       res.send(JSON.stringify(results));
// //     }
// //   });
// // });

// // router.post("/eventsignup", (req, res, next) => {
// //   console.log("Hello from viewevent");

// //   var restaurant_id = req.body.restaurant_id
// //   var event_id = req.body.event_id
// //   var user_id = req.body.user_id
// //   var sql = `INSERT INTO dim_eventsignup
// //   (
// //     restaurant_id,
// //     event_id,
// //     user_id
// //   )
// //   VALUES
// //   (
// //       ?, ?, ?
// //   )
// //   `;

// //   connection.query(sql,[restaurant_id,event_id,user_id] ,function (err, results) {
// //     if (err) {
// //       console.log("error in adding data");
// //     } else {
// //       console.log("successfully Signedup for the event");
// //       console.log(results);
// //       res.send(JSON.stringify(results));
// //     }
// //   });
// // });

// // router.post("/vieweventlisting", (req, res, next) => {
// //   console.log("Hello from vieweventlisting");
// //   var restaurant_id = req.body.restaurant_id;
// //   var sql = `select * from dim_event where restaurant_id =?
// //   `;

// //   connection.query(sql,[restaurant_id],function (err, results) {
// //     if (err) {
// //       console.log("error in adding data");
// //     } else {
// //       console.log("successfully retrived");
// //       console.log(results);
// //       res.send(JSON.stringify(results));
// //     }
// //   });
// // });

// // router.post("/vieweventsignup", (req, res, next) => {
// //   console.log("Hello from vieweventlisting");
// //   var event_id = req.body.event_id;
// //   var sql = `select b.fname as fname, b.lname as lname, b.user_name as user_name from dim_eventsignup a
// //   join dim_user b
// //   on a.user_id = b.user_id
// //   where a.event_id = ?
// //   `;

// //   connection.query(sql,[event_id],function (err, results) {
// //     if (err) {
// //       console.log("error in adding data");
// //     } else {
// //       console.log("successfully retrived");
// //       console.log(results);
// //       res.send(JSON.stringify(results));
// //     }
// //   });
// // });

// // router.post("/viewusersignedupevent", (req, res, next) => {
// //   console.log("Hello from User View - Signed Up Events");
// //   var user_id = req.body.user_id;
// //   var sql = `SELECT b.eventname as eventname,
// //   b.eventdescription as eventdescription,
// //   DATE(b.date) as eventdate,
// //   b.time as time,
// //   b.eventimage as eventimage,
// //   b.eventtype as eventtype,
// //   b.hashtag as hashtag,
// //   b.city as city
// //   from yelp.dim_eventsignup a
// //   join yelp.dim_event b on a.event_id = b.event_id
// //   where a.user_id = ?
// //   `;

// //   connection.query(sql,[user_id],function (err, results) {
// //     if (err) {
// //       console.log("error in adding data");
// //     } else {
// //       console.log("successfully retrived");
// //       console.log(results);
// //       res.send(JSON.stringify(results));
// //     }
// //   });
// // });

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

module.exports = router;

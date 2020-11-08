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



router.post("/viewhome",checkAuth, (req, res) => {
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
    { $or: [{restaurantname: req.body.search1 },{cuisine: req.body.search1 }, {location : req.body.search1},{deliverymethod : req.body.search1},{"menu.itemname" : req.body.search1}] },
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
 

router.post("/filterrestaurantsearch", checkAuth,(req, res) => {
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
 
      
   
  });

// // Updating Restaurant Profile
router.post(
  "/restaurantupdate",checkAuth,
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
router.post("/addmenu",checkAuth, upload.single("myfile"), async (req, res, next) => {
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
    item_description,
    itemcategory,
    ingredients,
    restaurant_id,
  } = req.body;
var objData={ itemname:req.body.itemname,price:req.body.price,item_description:req.body.item_description,path:path,itemcategory:req.body.itemcategory, Ingredients:req.body.ingredients};
  console.log(  "Data in backend", itemname, price, item_description,itemcategory,ingredients,path,restaurant_id
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



router.post("/viewmenu", checkAuth,(req, res) => {
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
      item_description,
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
      item_description,
      itemcategory,
      ingredients,
      path,
      quantity,
      restaurant_id,
      item_id
      
    );



    await  Restaurant.updateOne(
        { _id: req.body.restaurant_id, "menu._id":req.body.item_id},
          { $set: { "menu.$.itemname" : itemname,"menu.$.price":price, "menu.$.item_description":item_description,"menu.$.itemcategory":itemcategory,"menu.$.quantity":quantity,"menu.$.Ingredients":ingredients,"menu.$.path":path} }
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
  
  router.post("/deletefrommenu",checkAuth, (req, res) => {
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


  router.post("/filterorderrestsearch", checkAuth,(req, res) => {
   
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
;

router.post("/addreview",upload.single("myfile"), async (req, res, next) => {
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


router.post("/viewreview",checkAuth, (req, res) => {
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

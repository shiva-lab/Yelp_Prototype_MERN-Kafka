const express = require("express");
const router = express.Router();
var multer = require("multer");
const checkAuth = require('../config/checkAuth')

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

const {
  createMessage,
  getMessages,
  addMessage
} = require("./message/messageController");

const {
  restaurantregister,
  restaurantlogin,
  viewhome,
  homeviewrestaurant,
  restaurantsearch,
  filterrestaurantsearch,
  restaurantupdate,
  addmenu,
  viewmenu,
  uviewmenu, //Check if duplicate? 
  editmenu,
  deletefrommenu,
  addreview,
  viewreview
} = require("./restaurant/restaurantController")

const {
  filterorderrestsearch,
  rvieworder,
  userorderstatus,
  userorderstatusdesc,
  filterordersearch,
  uorderdetails,
  neworderstatuschange,
  addtocart,
  uviewcart,
  deletefromcart,
  createorder
} = require("./order/orderController")

const {
  viewuserlist,
  usersignup,
  userlogin,
  filterusersearch,
  followuserprofile,
  usersifollow,
  uviewprofile,
  uupdateprofile
} = require("./user/userController")

const {
  addevent,
  vieweventlisting,
  viewevent,
  vieweventasc,
  vieweventdetails,
  eventsignup,
  viewusersignedupevent,
  vieweventsignup,
  searchevent
} = require ("./event/eventController")

router.get("/getMessages/:id", (req, res) => {
  return getMessages(req, res)
});
router.post("/addMessage", (req, res) => {
  return addMessage(req, res)
});
router.post("/createMessage", (req, res) => {
  return createMessage(req, res)
});

router.post("/restaurantregister", (req, res) => {
  return restaurantregister(req, res)
});

router.post("/restaurantlogin", (req, res) => {
  return restaurantlogin(req, res)
})

router.post("/viewhome", (req, res) => {
  return viewhome(req, res)
})

router.get("/homeviewrestaurant", (req, res) => {
  return homeviewrestaurant(req, res)
})

router.post("/restaurantsearch", (req, res) => {
  return restaurantsearch(req, res)
})

router.post("/filterrestaurantsearch",checkAuth, (req, res) => {
  return filterrestaurantsearch(req, res)
})

router.post("/restaurantupdate",checkAuth, upload.array("photos", 4), async (req, res) => {
  return restaurantupdate(req, res)
})

router.post("/addmenu", checkAuth,upload.single("myfile"), async (req, res) => {
  return addmenu(req, res)
})

router.post("/viewmenu", (req, res) => {
  return viewmenu(req, res)
})

router.post("/uviewmenu",checkAuth, (req, res) => {
  return uviewmenu(req, res)
})

router.post("/editmenu",checkAuth, upload.single("myfile"), (req, res) => {
  return editmenu(req, res)
})

router.post("/deletefrommenu",checkAuth, (req, res) => {
  return deletefrommenu(req, res)
})

router.post("/addreview",checkAuth, upload.single("myfile"), (req, res) => {
  return addreview(req, res)
})

router.post("/viewreview",checkAuth, (req, res) => {
  return viewreview(req, res)
})

router.post("/filterorderrestsearch",checkAuth, (req, res) => {
  return filterorderrestsearch(req, res)
})

router.post("/rvieworder",checkAuth, (req, res) => {
  return rvieworder(req, res)
})

router.post("/userorderstatus",checkAuth, (req, res) => {
  return userorderstatus(req, res)
})

router.post("/userorderstatusdesc", checkAuth,(req, res) => {
  return userorderstatusdesc(req, res)
})

router.post("/filterordersearch",checkAuth, (req, res) => {
  return filterordersearch(req, res)
})

router.get("/uorderdetails/:id", checkAuth,(req, res) => {
  return uorderdetails(req, res)
})

router.post("/neworderstatuschange",checkAuth, (req, res) => {
  return neworderstatuschange(req, res)
})

router.post("/addtocart",checkAuth, (req, res) => {
  return addtocart(req, res)
})

router.post("/uviewcart",checkAuth, (req, res) => {
  return uviewcart(req, res)
})

router.post("/deletefromcart",checkAuth, (req, res) => {
  return deletefromcart(req, res)
})

router.post("/createorder",checkAuth, (req, res) => {
  return createorder(req, res)
})

router.post("/viewuserlist",checkAuth, (req, res) => {
  return viewuserlist(req, res)
})

router.post("/userlogin", (req, res) => {
  return userlogin(req, res)
})

router.post("/usersignup", (req, res) => {
  return usersignup(req, res)
})

router.post("/filterusersearch",checkAuth, (req, res) => {
  return filterusersearch(req, res)
})

router.post("/followuserprofile",checkAuth, (req, res) => {
  return followuserprofile(req, res)
})

router.post("/usersifollow", checkAuth,(req, res) => {
  return usersifollow(req, res)
})

router.get("/uviewprofile/:id", (req, res) => {
  return uviewprofile(req, res)
})

router.post("/uupdateprofile",checkAuth, upload.single("myfile"), (req, res) => {
  return uupdateprofile(req, res)
})

router.get("/logout", function (req, res) {
  console.log("Deleting Cookie");
  res.clearCookie("restaurant_id");
  res.clearCookie("cookie1");
  res.clearCookie("username");
  res.json(true);
});

router.post("/addevent", checkAuth, upload.single("myfile"), (req, res) => {
  return addevent(req, res)
})

router.post("/vieweventlisting", checkAuth, (req, res) => {
  return vieweventlisting(req, res)
})

router.get("/viewevent",checkAuth, (req, res) => {
  return viewevent(req, res)
})

router.post("/vieweventasc",checkAuth, (req, res) => {
  return vieweventasc(req, res)
})

router.post("/vieweventdetails",checkAuth, (req, res) => {
  return vieweventdetails(req, res)
})

router.post("/eventsignup",checkAuth, (req, res) => {
  return eventsignup(req, res)
})

router.post("/viewusersignedupevent", checkAuth,(req, res) => {
  return viewusersignedupevent(req, res)
})

router.post("/vieweventsignup",checkAuth, (req, res) => {
  return vieweventsignup(req, res)
})

router.post("/searchevent", checkAuth,(req, res) => {
  return searchevent(req, res)
})

module.exports = router;
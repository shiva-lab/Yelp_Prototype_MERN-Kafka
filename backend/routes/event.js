
const express = require("express");
// //const connection = require("../models/yelpschema");
const User = require('../models/User');
const restEvent = require('../models/restEvent');
const eventroute = express.Router();
var multer = require('multer');
var multerS3 = require('multer-s3');
const passport = require("passport");
const checkAuth =require('../config/checkAuth')
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

  eventroute.post("/addevent", checkAuth,upload.single("myfile"), async (req, res, next) =>{
  try {
    console.log("Uploading event Image...");
  } catch (err) {
    res.send(400);
  }
  var path = req.file.location;
  console.log("Add event API Checkpoint");
  console.log("Image Path on AWS: ", path);
  const { restaurant_id, eventname, eventdescription, date,
time,address, city,eventtype,hashtag
  } = req.body;
 console.log("Data in backend",restaurant_id,eventname,
  eventdescription,date,time,address, city,eventtype, hashtag,
        path
  );
  try {
    // see if user exists
    let event = await restEvent.findOne({ eventname });
    if (event) {
        return res.status(400).json({ errors: [{ msg: 'Event Already Exists' }] });
    }
     event = new restEvent({ restaurant_id:req.body.restaurant_id,
      eventname:req.body.eventname,
      eventdescription:req.body.eventdescription,
      time:req.body.time,
      date:req.body.date,
      address:req.body.address,
      city:req.body.city,
      eventtype:req.body.eventtype,
      hashtag:req.body.hashtag,
      path:path

    });
    await event.save((error, data) => {
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

} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}

},
);

eventroute.post("/vieweventlisting", checkAuth, (req, res) => {
    console.log(req.body.restaurant_id);
    restEvent.find({ restaurant_id: req.body.restaurant_id } , (error, result) => {
      if (error) {
        console.log("error:",error)
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
  

  eventroute.get("/viewevent",checkAuth, async(req, res, next) => {
    //.sort({date: -1}).exec((err, docs) => { ... });
    var mysort = { date: -1 };
    await restEvent.find({},(error, result) => {
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
    }).sort({date:-1});
  });

  eventroute.get("/vieweventasc",checkAuth, async(req, res, next) => {
    
    var mysort = { date: 1 };
    await restEvent.find({},(error, result) => {
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
    }).sort({date:1});
  });

  eventroute.post("/vieweventdetails", checkAuth, async(req, res, next) => {
    console.log(req.body.event_id)
    await restEvent.find({_id:req.body.event_id}, (error, result) => {
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

  eventroute.post("/eventsignup",checkAuth, async (req, res, next) => {
   
    const {user_id,restaurant_id,_id ,username,Emailid} = req.body;
  //var objData={ user_id:req.body.user_id,restaurant_id:req.body.restaurant_id};
  //var objData=User.find({_id:req.body.user_id},'fname lname user_name user_id');
  
    console.log(
      "Data in backend",user_id,restaurant_id,_id,username,Emailid
    );
    restEvent.update({ _id: req.body._id },  { $addToSet: { RegistredUser: {user_id:req.body.user_id,username:req.body,username,Emailid:req.body.Emailid} }}, {  safe: true },(err, data) => console.log(data))
    
          .then(response => {
            return res.status(200).json("Successfully Updated");
          })
          .catch(err => {
            console.log(err);
            return res.status(500).json({ error: err });
          });
      //})
    });
      
    
  
  
  eventroute.post("/viewusersignedupevent",checkAuth,(req, res, next) => {

    console.log("Inside viewusersignedupevent",req.body.user_id);
   // Event.find({ user_id: req.body.user_id },{'signedup':[]}, (error, result) => {
    restEvent.find({ 'RegistredUser.user_id': req.body.user_id },{}, (error, result) => {
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

  eventroute.post("/vieweventsignup",checkAuth,async(req, res, next) => {

     console.log("Inside vieweventsignup",req.body.event_id,req.body.restaurant_id);

  var eventId = req.body.event_id;
  console.log("Event id", eventId);
  await restEvent.findById({_id:req.body.event_id}, function(error, result) {
    console.log("registeredEvents Array", result.RegistredUser);
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

 
eventroute.post("/searchevent",checkAuth,(req, res) => {
  console.log("Data Recieved from FrontEnd: ",req.body.eventname);
  
    restEvent.find(
     { eventname:req.body.eventname },
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

  
   module.exports = eventroute;
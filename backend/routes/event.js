
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
  const {
    restaurant_id,
    eventname,
    eventdescription,
    date,
    time,
    address,
     city,
     eventtype,
    hashtag
  } = req.body;

  console.log(
    "Data in backend",
    restaurant_id,
    eventname,
        eventdescription,
        date,
        time,
        address,
         city,
         eventtype,
        hashtag,
        path
  );
  try {
    // see if user exists
    let event = await restEvent.findOne({ eventname });
    if (event) {
        return res.status(400).json({ errors: [{ msg: 'Event Already Exists' }] });
    }
     event = new restEvent({
        restaurant_id,
        eventname,
        eventdescription,
        time,
        date,
        address,
         city,
         eventtype,
        hashtag,
        path

    });
    await event.save();

    // const payload = {
    //   event: { id: event.id },
    // };
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

eventroute.post("/vieweventlisting",checkAuth, (req, res) => {
    console.log(req.body.restaurant_id);
    restEvent.find({ restaurant_id: req.body.restaurant_id } , (error, result) => {
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
  

  eventroute.get("/viewevent", checkAuth, async(req, res, next) => {
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

  eventroute.post("/vieweventdetails",checkAuth,  async(req, res, next) => {
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

  eventroute.post("/eventsignup", checkAuth,async (req, res, next) => {
   
    const {user_id,restaurant_id,_id ,username,Emailid} = req.body;
  //var objData={ user_id:req.body.user_id,restaurant_id:req.body.restaurant_id};
  //var objData=User.find({_id:req.body.user_id},'fname lname user_name user_id');
  
    console.log(
      "Data in backend",user_id,restaurant_id,_id,username,Emailid
    );
    restEvent.update({ _id: req.body._id },  { $push: { RegistredUser: {user_id:req.body.user_id,username:req.body,username,Emailid:req.body.Emailid} }}, {  safe: true, upsert: true },(err, data) => console.log(data))
    // restEvent.update(
    //   { _id: req.body._id },
    //   { $push: { RegistredUser: user_id } },
    //   { upsert: false }
    // )
      // .then(response => {
      //   User.updateOne(
      //     { _id: user_id },
      //     { $push: { registeredEvents: req.body._id } },
      //     { upsert: true }
      //   )
          .then(response => {
            return res.status(200).json("Successfully Updated");
          })
          .catch(err => {
            console.log(err);
            return res.status(500).json({ error: err });
          });
      //})
    });
      
    
  
  
  eventroute.post("/viewusersignedupevent", checkAuth,(req, res, next) => {

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

  eventroute.post("/vieweventsignup", checkAuth,async(req, res, next) => {

     console.log("Inside vieweventsignup",req.body.event_id,req.body.restaurant_id);
  //   Event.findOne({ _id: req.body.event_id },{'signedup':[]}, (error, result) => {
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
//     if (err) return res.status(500).json({ error: err });
//     User.find({ _id: { $in: events.RegistredUser.user_id } })
//       .exec()
//       .then(result => {
//         console.log("Reg events are:::", result);
//         res.status(200).json(result);
//       })
//       .catch(err => {
//         res.status(500).json({ error: err });
//       });
//   });
// });

   // Event.find({ user_id: req.body.user_id },{'signedup':[]}, (error, result) => {
  //  Event.find({ _id: req.body.event_id },{'signedup':[]}, (error, result) => {
  //  // Restaurant.find({ _id: req.body.event_id },{'signedup':[]}, (error, result)
  //     if (error) {
  //       res.writeHead(500, {
  //         "Content-Type": "text/plain",
  //       });
  //       res.end();
  //     } else {
  //       res.writeHead(200, {
  //         "Content-Type": "application/json",
  //       });
  //       console.log(result);
  //       res.end(JSON.stringify(result));
  //     }
  //   });
  // });

  
    
//   eventroute.post("/eventsignup", (req, res, next) => {
//     console.log("Hello from Event Signup");
  
//     var restaurant_id = req.body.restaurant_id
//     var event_id = req.body.event_id
//     var user_id = req.body.user_id
//     console.log(restaurant_id,event_id,user_id)
//     var sql = `INSERT INTO dim_eventsignup
//     (
//       restaurant_id,
//       event_id,
//       user_id
//     )
//     VALUES
//     (
//         ?, ?, ?
//     )
//     `;
  
//     connection.query(sql,[restaurant_id,event_id,user_id] ,function (err, results) {
//       if (err) {
//         console.log("error in adding data");
//       } else {
//         console.log("Successfully Signedup for the event");
//         console.log(results);
//         res.send(JSON.stringify(results));
//         var newsql = `UPDATE yelp.dim_event t2
//         join (select event_id, count(event_id) as signupcount from yelp.dim_eventsignup
//         group by event_id) as t1  on t1.event_id = t2.event_id
//         SET t2.signupcount = t1.signupcount`;
//       connection.query(newsql, function (err, data){
//         if (err) {
//           console.log("error in adding data");
//         } else {
//           console.log("successfully updated rating");
//         }
//       })
//       }
//     });
//   });
  
  
  
  
//   eventroute.post("/vieweventlisting", (req, res, next) => {
//     console.log("Hello from vieweventlisting");
//     var restaurant_id = req.body.restaurant_id;
//     var sql = `select *, DATE_FORMAT(date, '%D %M %Y') as date from dim_event where restaurant_id =?
//     `;
  
//     connection.query(sql,[restaurant_id],function (err, results) {
//       if (err) {
//         console.log("error in adding data");
//       } else {
//         console.log("successfully retrived");
//         console.log(results);
//         res.send(JSON.stringify(results));
//       }
//     });
//   });
  
  
//   eventroute.post("/vieweventsignup", (req, res, next) => {
//     console.log("Hello from vieweventlisting");
//     var event_id = req.body.event_id;
//     var sql = `select b.fname as fname, b.lname as lname, b.user_name as user_name,
//     a.user_id as user_id
//     from dim_eventsignup a 
//     join dim_user b 
//     on a.user_id = b.user_id
//     where a.event_id = ?
//     `;
  
//     connection.query(sql,[event_id],function (err, results) {
//       if (err) {
//         console.log("error in adding data");
//       } else {
//         console.log("successfully retrived");
//         console.log(results);
//         res.send(JSON.stringify(results));
//       }
//     });
//   });
  
  
//   eventroute.post("/viewusersignedupevent", (req, res, next) => {
//     console.log("Hello from User View - Signed Up Events");
//     var user_id = req.body.user_id;
//     var sql = `SELECT b.eventname as eventname,
//     b.eventdescription as eventdescription,
//     DATE_FORMAT(date, '%D %M %Y') as eventdate,
//     b.time as time,
//     b.path as path,
//     b.eventtype as eventtype,
//     b.hashtag as hashtag,
//     b.city as city
//     from yelp.dim_eventsignup a
//     join yelp.dim_event b on a.event_id = b.event_id
//     where a.user_id = ?
//     `;
  
//     connection.query(sql,[user_id],function (err, results) {
//       if (err) {
//         console.log("error in adding data");
//       } else {
//         console.log("successfully retrived");
//         console.log(results);
//         res.send(JSON.stringify(results));
//       }
//     });
//   });

eventroute.post("/searchevent", checkAuth,(req, res) => {
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
//   eventroute.post("/searchevent", (req, res, next) => {
//     console.log("Hello from searchevent");
  
//     var searcheve = req.body.eventname
//     console.log(searcheve)
//     var sql = `select * from dim_event
//     where eventname = ?`;
  
//     connection.query(sql,[searcheve], function (err, results) {
//       if (err) {
//         console.log("error in adding data");
//       } else {
//         console.log("successfully retrived");
//         console.log(results);
//         res.send(JSON.stringify(results));
//       }
//     });
//   });
//   eventroute.post("/vieweventdetails", (req, res, next) => {
//     console.log("Hello from vieweventdetails");
  
//     var event_id = req.body.event_id;
//     console.log(event_id)
//     var sql = `select *, DATE_FORMAT(date, '%D %M %Y') as date from dim_event
//     where event_id = ?`;
  
//     connection.query(sql,[event_id], function (err, results) {
//       if (err) {
//         console.log("error in adding data");
//       } else {
//         console.log("successfully retrived");
//         console.log(results);
//         res.send(JSON.stringify(results));
//       }
//     });
//   });
  
   module.exports = eventroute;
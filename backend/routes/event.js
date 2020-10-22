
const express = require("express");
// //const connection = require("../models/yelpschema");
//const User = require('../models/User');

const Event = require('../models/Event');
const eventroute = express.Router();
var multer = require('multer');
var multerS3 = require('multer-s3');
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

  eventroute.post("/addevent", upload.single("myfile"), async (req, res, next) =>{
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
    let event = await Event.findOne({ eventname });
    if (event) {
        return res.status(400).json({ errors: [{ msg: 'Event Already Exists' }] });
    }
   

    event = new Event({
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

    });
   
    
  
    
    await event.save();

    const payload = {
      event: { id: event.id },
    };
    res.writeHead(200, {
      'Content-Type': 'text/plain'
  })
  res.end();
    // jwt.sign(payload, secret, {
    //     expiresIn: 1008000,
    // }, (err, token) => {
    //     if (err) throw err;
    //     res.json({ token });
    // });
   

} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}

// console.log(req.body);
},
);

eventroute.post("/vieweventlisting", (req, res) => {
    console.log(req.body.restaurant_id);
    Event.find({ restaurant_id: req.body.restaurant_id } , (error, result) => {
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
  
  
// eventroute.post("/addevent", upload.single('myfile'),(req, res, next) => {
//   try {
  
//          console.log("hello")
//        }catch(err) {
//         res.send(400);
//      }

//     var eventname  = req.body.eventname;
//     var eventdescription = req.body.eventdescription;
//     var date = req.body.date;
//     var time = req.body.time;
//     var address = req.body.address;
//     var city = req.body.city;
//     var eventtype = req.body.eventtype
//     var hashtag = req.body.hashtag
//     var restaurant_id = req.body.restaurant_id;
//     console.log("Restaurant ID ", restaurant_id);
//     var path = req.file.location;
  
//     console.log(
//       eventname,
//   eventdescription,
//   date,
//   time,
//   address,
//   city,
//   eventtype,
//   hashtag,
//   restaurant_id,
//   path
//     );
  
//     var sql = `INSERT INTO dim_event 
//           (
//             eventname,
//             eventdescription,
//             date,
//             time,
//             address,
//             city,
//             eventtype,
//             hashtag,
//             restaurant_id,
//             path
//           )
//           VALUES
//           (
//               ?, ?, ?, ?, ?, ?, ?,?,?,?
//           )`;
  
//     connection.query(
//       sql,
//       [
//         eventname,
//             eventdescription,
//             date,
//             time,
//             address,
//             city,
//             eventtype,
//             hashtag,
//             restaurant_id,
//             path
//       ],
//       function (err, data) {
//         if (err) {
//           console.log("error in adding data");
//           console.log(err)
//         } else {
//           res.status(200).json({
//             responseMessage: "Event Successfully created",
//           });
//           console.log("Successfully Added");
//         }
//       }
//     );
//   });
  
//   eventroute.post("/viewevent", (req, res, next) => {
//     console.log("Hello from viewevent");
  
//     var restaurant_id = req.body.restaurant_id
//     var sql = `select *, DATE_FORMAT(date, '%D %M %Y') as date from dim_event
//     `;
  
//     connection.query(sql, function (err, results) {
//       if (err) {
//         console.log("error in adding data");
//       } else {
//         console.log("successfully retrived");
//         console.log(results);
//         res.send(JSON.stringify(results));
//       }
//     });
//   });
  
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
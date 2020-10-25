const express = require("express");
const loginroute = express.Router();
var bcrypt = require("bcrypt-nodejs");
const keys = require('../config/keys')
// registering and adding users
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const { secret } = require('../Utils/config');
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const passport = require("passport")
// const { auth } = require('../../../config/passportjwt');

// @route  POST /api/restusers
// @Desc   Resgister User
// @access Public
// Restaurant Registration
loginroute.post(
    '/restaurantregister', [
        check('restaurantname', 'Name is required').not().isEmpty(),
        check('Emailid', 'Please enter valid email').isEmail(),
        check(
            'restpass',
            'Please enter password with 4 or more characters',
        ).isLength({ min: 4 }),
        check('location', 'location is required').not().isEmpty(),
    ],
    
    async(req, res) => {
      console.log("Hello")
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
        
        const {
            restaurantname,
            Emailid,
            restpass,
            location
        } = req.body;
        console.log("Data in backend",restaurantname,
          Emailid,
          restpass,
          location)
        try {
            // see if user exists
            let restaurant = await Restaurant.findOne({ Emailid });
            if (restaurant) {
                return res.status(400).json({ errors: [{ msg: 'Restaurant Already Exists' }] });
            }
          
            restaurant = new Restaurant({
              restaurantname,
              Emailid,
              restpass,
              location,
            });
          
            restaurant.restpass =  bcrypt.hashSync(restpass);
            await restaurant.save()
            .catch(err => console.log(err))

            const payload = {
              restaurant: { id: restaurant.id },
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

// loginroute.post('/restaurantlogin',(req, res) => {
//   Restaurant.findOne({ Emailid: req.body.Emailid, restpass: req.body.restpass }, (error, restuser) => {

//     const {
//       Emailid,
//       restpass,
//   } = req.body;
//   console.log("Data in forlogin",
//     Emailid,
//     restpass)

//       if (error) {
//           res.writeHead(500, {
//               'Content-Type': 'text/plain'
//           })
//           res.end("Error Occured");
//       }
//       if (restuser) {
//           res.cookie('restaurant_id', restuser.Emailid, { maxAge: 900000, httpOnly: false, path: '/' });
          
//           res.writeHead(200, {
//               'Content-Type': 'text/plain'
//           })
//           res.end();
//       }
//       else {
//           res.writeHead(401, {
//               'Content-Type': 'text/plain'
//           })
//           res.end("Invalid Credentials");
//       }
//   });    
// });

// Adding Login Functionality For the Restaurant using JWT & Passport
loginroute.post(
  '/restaurantlogin', [
      check('Emailid', 'Please enter valid email').isEmail(),
      check(
          'restpass',
          'Password is required',
      ).exists(),
  ],
  // eslint-disable-next-line consistent-return
  async(req, res) => {
      //const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //     return res.status(400).json({ errors: errors.array() });
      // }

    //Getting Restaurant Email and Password from the Body
      const {
          Emailid,
          restpass,
      } = req.body;
      console.log(Emailid, restpass)

      //Find the Restaurant in MongoDB
      try {
          // see if user exists
          const restuser = await Restaurant.findOne({  Emailid: req.body.Emailid, });
          if (!restuser) {
              return res.status(404).json({ errors: [{ msg: 'Restaurant Not Found' }] });
          }
          //Check Password 
          const isMatch = await bcrypt.compareSync(req.body.restpass, restuser.restpass);
          if (!isMatch) {
              return res.status(404).json({ errors: [{ msg: 'Invalid Password' }] });
          }
          else {
            //User Matched 
            console.log("User Matched - Creating Payload")
            const payload = {
              id: restuser._id,
              restaurantname: restuser.restaurantname,
              location: restuser.location,
              Emailid: restuser.Emailid,
             
            } // Create JWT Payload

            //Sign Token
            console.log("Creating Token")
            jwt.sign(payload, 
                     keys.secretOrKey,
                     {expiresIn: 3600 },(err,token) =>{
                       res.json({
                         success:true,
                         token: 'Bearer ' + token
                                           })

            }
             );
             res.cookie('restaurant_id', restuser._id.toString(), { maxAge: 900000, httpOnly: false, path: '/' });
          //req.session.user = user;
          // res.writeHead(200, {
          //     'Content-Type': 'text/plain'
          // })
          // res.end();
      }

                }

          // const payload = {
          //     restuser: { id: restuser.id },
          // };

          // jwt.sign(payload, secret, {
          //     expiresIn: 1008000,
          // }, (err, token) => {
          //     if (err) throw err;
          //     res.json({ token });
          // });
       catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
      }

      // console.log(req.body);
  },
);




loginroute.post(
  '/usersignup', [
      check('user_name', 'Name is required').not().isEmpty(),
      check('Emailid', 'Please enter valid email').isEmail(),
      check(
          'userpass',
          'Please enter password with 4 or more characters',
      ).isLength({ min: 4 }),
      check('zipcode', 'zipcode is required').not().isEmpty(),
  ],
  
  async(req, res) => {
    console.log("Hello")
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //     return res.status(400).json({ errors: errors.array() });
      // }
      

      const {
        user_name,
          Emailid,
          userpass,
          zipcode
      } = req.body;
      console.log("Data in backend",user_name,
        Emailid,
        userpass,
        zipcode)
      try {
          // see if user exists
          let user = await User.findOne({ Emailid });
          if (user) {
              return res.status(400).json({ errors: [{ msg: 'User Already Exists' }] });
          }
         

          user = new User({
            user_name,
            Emailid,
            userpass,
            zipcode,
          });
          // Encrypt password
        //  const salt = await bcyrpt.genSaßlt(10);
        
          user.userpass =  bcrypt.hashSync(userpass);
          await user.save();

          // const payload = {
          //   restaurant: { id: user.id },
          // };
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


loginroute.post(
  '/userlogin', [
      check('Emailid', 'Please enter valid email').isEmail(),
      check(
          'userpass',
          'Password is required',
      ).exists(),
  ],
  // eslint-disable-next-line consistent-return
  async(req, res) => {
      //const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //     return res.status(400).json({ errors: errors.array() });
      // }

      const {

          Emailid,
          userpass,

      } = req.body;
      console.log(Emailid, userpass)

      try {
          // see if user exists
          const user = await User.findOne({  Emailid: req.body.Emailid, });
          if (!user) {
              return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
          }

          const isMatch = await bcrypt.compareSync(req.body.userpass, user.userpass);
          if (!isMatch) {
              return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
          }
          else {
             //res.cookie('restaurant_id', restuser._id.toString(), { maxAge: 900000, httpOnly: false, path: '/' });
             res.cookie("cookie1", user._id.toString(), {
                          maxAge: 900000,
                          httpOnly: false,
                          path: "/",
                        });
                        res.cookie("userzipcode", user.zipcode, {
                          maxAge: 900000,
                          httpOnly: false,
                          path: "/",
                        });
             //req.session.user = user;
    
          res.writeHead(200, {
              'Content-Type': 'text/plain'
          })
          res.end();
      }

                }

          // const payload = {
          //     restuser: { id: restuser.id },
          // };

          // jwt.sign(payload, secret, {
          //     expiresIn: 1008000,
          // }, (err, token) => {
          //     if (err) throw err;
          //     res.json({ token });
          // });
       catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
      }

      // console.log(req.body);
  },
);


loginroute.get("/logout", function (req, res) {
  console.log("Deleting Cookie");
  res.clearCookie("restaurant_id");
  //res.clearCookie("restaurant_id_menu");
  res.clearCookie("cookie1");
  res.clearCookie("userzipcode");
  //res.clearCookie("cartprice");
  res.json(true);
});
module.exports = loginroute;



// loginroute.post("/restaurantregister", (req, res) => {
//     const rhashedPassword = bcrypt.hashSync(req.body.restpass);
//     // console.log("hashed pwd",hashedPassword)
//     var restaurant_name = req.body.restaurant_name;
//     var emailid = req.body.emailid;
//     var restpass = rhashedPassword;
//     var location = req.body.location;
//     console.log(restaurant_name, emailid, restpass, location);
//     var sql = `INSERT INTO dim_restaurant 
//           (
//               restaurant_name, emailid, restpass, location
//           )
//           VALUES
//           (
//               ?, ?, ?, ?
//           )`;
  
//     connection.query(
//       sql,
//       [restaurant_name, emailid, restpass, location],
//       function (err, results) {
//         if (err) {
//           console.log("error in adding data");
//         } else {
//           console.log("successfully added");
//           //res.send(data)
//           var restaurant_id = results.insertId;
//           console.log("Restaurant ID: ", restaurant_id);
//           var sql = `SELECT restaurant_name, emailid, restpass, location FROM dim_restaurant WHERE restaurant_id = ?`;
//           connection.query(sql, [restaurant_id], function (err, results) {
//             if (err) {
//               console.log("error");
//             } else {
//               console.log("Success");
//               console.log(results);
//               res.send(JSON.stringify(results));
//             }
//           });
//         }
//       }
//     );
//   });
  
//    // Validate Restaurant login
//    loginroute.route("/restaurantlogin").post(function (req, res) {
//     console.log("from rest Login");
//     var emailid = req.body.emailid;
//     var restpass = req.body.restpass;
//     console.log(emailid, restpass);
//     var sql = `SELECT * FROM dim_restaurant WHERE emailid = ? `;
  
//     connection.query(sql, [emailid], function (err, results) {
//       if (err) {
//         console.log("error in adding data");
//         console.log(err)
//         res
//           .status(400)
//           .json({ responseMessage: "User doesn't exist, Please sign up!" });
//       } else {
//         if (
//           results.length == 0 ||
//           !bcrypt.compareSync(req.body.restpass, results[0].restpass)
//         ) {
//           res.writeHead(402, {
//             "Content-type": "text/plain",
//           });
//           console.log("Invalid Credentails");
//           res.end("Invalid credentials");
//         } else {
//           var grestaurant_id = JSON.stringify(results[0].restaurant_id);
//           console.log("Success", results);
//           res.cookie("restaurant_id", grestaurant_id, {
//             maxAge: 900000,
//             httpOnly: false,
//             path: "/",
//           });
//           // res.json(results[0]);
//           // req.session.grestaurant_id=results[0].restaurant_id;
//           res.status(200).json({
//             responseMessage: "Login Successful",
//           });
//         }
//       }
//     });
//   });
  

  
// //Adding API for user registration
// loginroute.post("/usersignup", (req, res) => {
//   console.log("Hello from Userzsignup");
//   //hashing user pass
//   const hashedPassword = bcrypt.hashSync(req.body.userpass);
//   console.log("hashed pwd", hashedPassword);
//   var user_name = req.body.user_name;
//   var emailid = req.body.emailid;
//   var userpass = hashedPassword;
//   var zipcode = req.body.zipcode;
//   console.log(user_name, emailid, userpass, zipcode);
//   var sql = `INSERT INTO dim_user 
//             (
//                 user_name, emailid, userpass, zipcode
//             )
//             VALUES
//             (
//                 ?, ?, ? , ?
//             )`;

//   connection.query(sql, [user_name, emailid, userpass, zipcode], function (
//     err,
//     results,
//     fields
//   ) {
//     if (err) {
//       console.log("error in adding data");
//       console.log(err)
//     } else {
//       console.log("successfully added");
//       res.send(" signed up");
//       // console.log(results.insertId)
//       // var guserid = results.insertId
//       // connection.query(`select * from dim_user where user_id = ?`,[guserid], function (error, results, fields) {
//       //    if (error) throw error;
//       //     console.log(results);
//       //})
//     }
//   });
// });
// loginroute.route("/userlogin").post(function (req, res) {
//     console.log("Inside user Login Post");
//     var emailid = req.body.emailid;
//     var userpass = req.body.userpass;
//     console.log("User Data: ", emailid, userpass);
//     var sql = `SELECT * FROM dim_user WHERE emailid = ?`;
//     connection.query(sql, [emailid], function (err, results) {
//       console.log("Results", results);
//       if (err) {
//         console.log("ivalid credentials");
//         res.status(400).json({ responseMessage: "user doesn't exist" });
//       } else {
//         if (
//           results.length == 0 ||
//           !bcrypt.compareSync(req.body.userpass, results[0].userpass)
//         ) {
//           res.writeHead(402, {
//             "Content-type": "text/plain",
//           });
//           console.log("Invalid credentials db");
//           res.end("Invalid credentials");
//         } else {
//           var user_id = JSON.stringify(results[0].user_id);
//           var zipcode = JSON.stringify(results[0].zipcode);
//           console.log("UserID:", user_id);
//           console.log("Zipcode:", zipcode);
//           console.log("Success", results);
//           res.cookie("cookie1", user_id, {
//             maxAge: 900000,
//             httpOnly: false,
//             path: "/",
//           });
//           res.cookie("userzipcode", zipcode, {
//             maxAge: 900000,
//             httpOnly: false,
//             path: "/",
//           });
//           // res.json(results[0]);
//           // req.session.grestaurant_id=results[0].restaurant_id;
//           res.status(200).json({
//             responseMessage: "Login Successful",
//           });
//         }
//       }
//     });
//   });
  

//   loginroute.get("/logout", function (req, res) {
//   console.log("Deleting Cookie");
//   res.clearCookie("restaurant_id");
//   res.clearCookie("restaurant_id_menu");
//   res.clearCookie("cookie1");
//   res.clearCookie("userzipcode");
//   res.clearCookie("cartprice");
//   res.json(true);
// });



// @route  POST /api/restusers
// @Desc   Return Current User
// @access Private
loginroute.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(req.restaurantdata)
  }

);


module.exports = loginroute;
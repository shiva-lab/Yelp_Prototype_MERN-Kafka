const express = require("express");
const loginroute = express.Router();
var bcrypt = require("bcrypt-nodejs");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { secret } = require("../Utils/config");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const passport = require("passport");
var kafka = require("../kafka/client");

// @route  POST /api/restusers
// @Desc   Resgister User
// @access Public
// Restaurant Registration


//****************** */
// Kafka Version//
//***************** */
loginroute.post(
  "/restaurantregister", async (req, res) => {
    console.log("From Node Backend - Sending Request to Kafka");
    const { restaurantname, Emailid, restpass, location } = req.body;
    console.log("Data in backend", restaurantname, Emailid, restpass, location);
    try {
      const body = req.body;
      const data = {
        data: body,
        path: 'create_restaurant'
      }
      kafka.make_request('restaurant', data, (err, results) => {
        if (err) {
          return res.status(400).json({
            success: 0,
            message: err
          });
        }
        return res.status(200).json({
          success: 1,
          data: results,
          message: "Registration Successful"
        });
      });
      
    }catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
          }
  });







//************ */
//Without Kafka
//*********** */
// loginroute.post(
//   "/restaurantregister",
//   [
//     check("restaurantname", "Name is required").not().isEmpty(),
//     check("Emailid", "Please enter valid email").isEmail(),
//     check(
//       "restpass",
//       "Please enter password with 4 or more characters"
//     ).isLength({ min: 4 }),
//     check("location", "location is required").not().isEmpty(),
//   ],

//   async (req, res) => {
//     console.log("Hello");
//     // const errors = validationResult(req);
//     // if (!errors.isEmpty()) {
//     //     return res.status(400).json({ errors: errors.array() });
//     // }

//     const { restaurantname, Emailid, restpass, location } = req.body;
//     console.log("Data in backend", restaurantname, Emailid, restpass, location);
//     try {
//       // see if user exists
//       let restaurant = await Restaurant.findOne({ Emailid });
//       if (restaurant) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: "Restaurant Already Exists" }] });
//       }

//       restaurant = new Restaurant({
//         restaurantname,
//         Emailid,
//         restpass,
//         location,
//       });

//       restaurant.restpass = bcrypt.hashSync(restpass);
//       await restaurant.save().catch((err) => console.log(err));

//       const payload = {
//         restaurant: { id: restaurant.id },
//       };
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end();
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }
//   }
// );

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

//////////////////////////////////////////////////////////////
//Restaurant Login Section
/////////////////////////////////////////////////////////////

loginroute.post(
  "/restaurantlogin",
  [
    check("Emailid", "Please enter valid email").isEmail(),
    check("restpass", "Password is required").exists(),
  ],
  async (req, res) => {
    //Getting Restaurant Email and Password from the Body
    const { Emailid, restpass } = req.body;
    console.log(Emailid, restpass);
    try {
      // see if user exists
      const restuser = await Restaurant.findOne({ Emailid: req.body.Emailid });
      if (!restuser) {
        return res
          .status(404)
          .json({ errors: [{ msg: "Restaurant Not Found" }] });
      }
      //Check Password
      const isMatch = await bcrypt.compareSync(
        req.body.restpass,
        restuser.restpass
      );
      if (!isMatch) {
        return res.status(404).json({ errors: [{ msg: "Invalid Password" }] });
      } else {
        //User Matched
        console.log("User Matched - Creating Payload");
        const payload = {
          id: restuser._id,
          restaurantname: restuser.restaurantname,
          location: restuser.location,
          Emailid: restuser.Emailid,
        }; // Create JWT Payload
        console.log(payload)
        console.log("Creating Token");
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 8000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
        res.cookie("restaurant_id", restuser._id.toString(), {
          maxAge: 900000,
          httpOnly: false,
          path: "/",
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//////////////////////////////////////////////////////////////
//User Login Section
/////////////////////////////////////////////////////////////

loginroute.post(
  "/userlogin",
  [
    check("Emailid", "Please enter valid email").isEmail(),
    check("userpass", "Password is required").exists(),
  ],
  async (req, res) => {
    const { Emailid, userpass } = req.body;
    console.log(Emailid, userpass);
    try {
      const user = await User.findOne({ Emailid: req.body.Emailid });
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "User Not Found" }] });
      }
      const isMatch = await bcrypt.compareSync(
        req.body.userpass,
        user.userpass
      );
      if (!isMatch) {
        return res
          .status(404)
          .json({ errors: [{ msg: "Invalid Password" }] });
      } else {
        console.log("User Matched - Creating Payload");
        const payload = {
          id: user._id,
          username: user.user_name,
          zipcode: user.zipcode,
          Emailid: user.Emailid,
        }; // Create JWT Payload
        console.log("Creating Token");
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
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
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);


//////////////////////////////////////////////////////////////
//User Signup Section
/////////////////////////////////////////////////////////////

loginroute.post("/usersignup", async (req, res) => {
      console.log("From Node Backend - Sending Request to Kafka");
    //   const { restaurantname, Emailid, restpass, location } = req.body;
      console.log("Data in backend", req.body);
      try {
        const body = req.body;
        const data = {
          data: body,
          path: 'create_user'
        }
        kafka.make_request('user', data, (err, results) => {
          if (err) {
            return res.status(400).json({
              success: 0,
              message: err
            });
          }
          return res.status(200).json({
            success: 1,
            data: results,
            message: "Registration Successful"
          });
        });
        
      }catch (err) {
              console.error(err.message);
              res.status(500).send("Server Error");
            }
    });
  
//////////////////////////////////////////////////////
// without Kafka
///////////////////////////////////////////////////
// loginroute.post(
//   "/usersignup",
//   [
//     check("user_name", "Name is required").not().isEmpty(),
//     check("Emailid", "Please enter valid email").isEmail(),
//     check(
//       "userpass",
//       "Please enter password with 4 or more characters"
//     ).isLength({ min: 4 }),
//     check("zipcode", "zipcode is required").not().isEmpty(),
//   ],

//   async (req, res) => {
//     console.log("Hello");
  

//     const { user_name, Emailid, userpass, zipcode } = req.body;
//     console.log("Data in backend", user_name, Emailid, userpass, zipcode);
//     try {
//       // see if user exists
//       let user = await User.findOne({ Emailid });
//       if (user) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: "User Already Exists" }] });
//       }

//       user = new User({
//         user_name,
//         Emailid,
//         userpass,
//         zipcode,
//       });
//       // Encrypt password
//       //  const salt = await bcyrpt.genSaßlt(10);

//       user.userpass = bcrypt.hashSync(userpass);
//       await user.save();

//       // const payload = {
//       //   restaurant: { id: user.id },
//       // };
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end();
//       // jwt.sign(payload, secret, {
//       //     expiresIn: 1008000,
//       // }, (err, token) => {
//       //     if (err) throw err;
//       //     res.json({ token });
//       // });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }

//     // console.log(req.body);
//   }
// );



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
// loginroute.get(
//   "/current",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.json(req.restaurantdata.restaurantname);
//   }
// );

module.exports = loginroute;

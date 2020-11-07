var assert = require("chai").assert;
var app = require("../server");

var chai = require("chai");
chai.use(require("chai-http"));
var expect = require("chai").expect;

var agent = require("chai").request.agent(app);

describe("yelp-app", function() {
  //LOGIN API
  describe("Login Positive Test", function() {
    it("correct Password", function() {
      agent
        .post("/userlogin")
        .send({ Emailid: "rossg@gmail.com", restpass: "12345" })
        .then(function(res) {
          expect(res.status).to.equal(200);
        })
        .catch(error => {
          console.log(error);
        });
    });
  });
})


// var chai = require('chai'),
//     chaiHttp = require('chai-http');

// chai.use(chaiHttp);

// var expect = chai.expect;

// it("Checks signup API and returns status code", function (done) {
//     chai.request('http://localhost:8000')
//         .post('/usersignup')
//         .send({

//             "user_name": "monica",
//             "Emailid": "moni@gmail.com",
//             "userpass": "12345",
//             "zipcode": "95050"
            
//         })
//         .end(function (err, res) {
//             expect(res).to.have.status(200);
//             done();
//         });
// })


// it("Checks Login API and returns status code", function (done) {
//     chai.request('http://localhost:8000')
//         .post('/userlogin')
//                 .send({
//                     emailid: "shiva@gmail.com",
//                     restpass: "1234"
//                 })
//         .end(function (err, res) {
//             expect(res).to.have.status(200);
//             done();
//         });
// })



// it("Checks API for Restaurant List", function (done) {
//     chai.request('http://127.0.0.1:8000')
//         .get('/homeviewrestaurant')
        
//         .end(function (err, res) {
//             expect(res).to.have.status(200);
//             done();
//         });
// })

// it("Checks API of Restaurant Menu", function (done) {
//     chai.request('http://127.0.0.1:8000')
//         .post('/viewmenu')
//         . send({
//             "restaurant_id": ""
//         })
//         .end(function (err, res) {
//             expect(res).to.have.status(200);
//             done();
//         });
// })

// it("Checks API to view profile", function (done) {
//     chai.request('http://127.0.0.1:8000')
//         .post('/uviewprofile')
//         . send({
//             "user_id": "1"
//         })
       
//         .end(function (err, res) {
//             expect(res).to.have.status(200);
//             done();
//         });
// })

// it("Checks  restaurant Login API and returns status code", function (done) {
//     chai.request('http://localhost:8000')
//         .post('/restaurantlogin')
//         .send({
//             "emailid": "gooyi@gmail.com",
//             "restpass": "1234"
//         })
//         .end(function (err, res) {
//             expect(res).to.have.status(200);
//             done();
//         });
// })
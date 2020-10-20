var chai = require('chai'),
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

it("Checks Login API and returns status code", function (done) {
    chai.request('http://localhost:8000')
        .post('/userlogin')
        .send({
            "emailid": "peny@gmail.com",
            "userpass": "1234"
        })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})



it("Checks API for Restaurant List", function (done) {
    chai.request('http://127.0.0.1:8000')
        .get('/homeviewrestaurant')
        
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})

it("Checks API of Restaurant Menu", function (done) {
    chai.request('http://127.0.0.1:8000')
        .post('/viewmenu')
        . send({
            "restaurant_id": "1"
        })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})

it("Checks API to view profile", function (done) {
    chai.request('http://127.0.0.1:8000')
        .post('/uviewprofile')
        . send({
            "user_id": "1"
        })
       
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})

it("Checks  restaurant Login API and returns status code", function (done) {
    chai.request('http://localhost:8000')
        .post('/restaurantlogin')
        .send({
            "emailid": "gooyi@gmail.com",
            "restpass": "1234"
        })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})
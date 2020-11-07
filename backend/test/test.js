var chai = require('chai'),
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

it("Checks signup API and returns status code", function (done) {
    chai.request('http://localhost:8000')
        .post('/usersignup')
        .send({

            "user_name": "Ron",
            "Emailid": "Ron@gmail.com",
            "userpass": "12345",
            "zipcode": "95050"
            
        })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})


it("Checks Login API and returns status code", function (done) {
    chai.request('http://localhost:8000')
        .post('/userlogin')
                .send({
                    Emailid: "shiva@gmail.com",
                    userpass: "1234"
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
            "restaurant_id": "5fa22a30a6e3a3660cde53d4"
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
            "Emailid": "yummy@gmail.com",
            "restpass": "1234"
        })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})
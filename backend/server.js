// install packages
const express= require('express');
const path= require('path')
var cors=require("cors")
//const mysql = require('mysql');
const morgan = require('morgan');
const { mongoDB } = require('./Utils/config');
const mongoose = require('mongoose');
const routes=require('./routes/api');
const loginroutes=require('./routes/loginRegisterOperations');
const eventroute = require('./routes/event');
 const userroute=require('./routes/userOperations');
// const orderoute=require('./routes/order');

var bodyParser = require('body-parser');
//const eventroute = require('./routes/event');
const app = express();
app.use(morgan('tiny'));


const port=process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
      console.log(err);
      console.log(`MongoDB Connection Failed`);
  } else {
      console.log(`MongoDB Connected`);
  }
});

//http request logger
app.use(morgan('tiny'));
app.use('/',routes);
app.use('/',loginroutes);
app.use('/',userroute);
// app.use('/',orderoute);
 app.use('/',eventroute);

app.listen(port, () =>{
 console.log(`Server Up on ${port}`)
}); 

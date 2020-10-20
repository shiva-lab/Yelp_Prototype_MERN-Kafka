const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const eventSchema = new Schema({

      event_id: {
        type: String,
        required: true,
    },
    restaurant_id: {
        type: String,
       
    },
   
    eventname: {
        type: String,
        required: true,
    },
    eventdescription: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required=true
    },
    time: {
        type: Date,
        
    },
    address: {
        type: String,
        required=true
    },
    city: {
        type: String,
        required=true
        
    }, 
    path: {
        type: String,
        
    },
    ts: {
        type: Date,
        default: Date.now,
    },
    signupcount: {
        type: String,
        required: true,
    },
    eventtype: {
        type: String,
        enum: ["On site", "Virtual"]
    },
    signedup : [
        {
            signupID : {type : String , required : true} ,

            user_id : {type : String , required : true} ,
             restaurant_id:{type : String , required : true} 
        }
    ]

},
{
    versionKey: false
}
);
const Event = mongoose.model('menu', eventSchema);
module.exports = Event;
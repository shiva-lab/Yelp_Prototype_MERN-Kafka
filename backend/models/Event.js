const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const eventSchema = new Schema({

      event_id: {
        type: String,
        
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
        type: Date
        
    },
    time: {
        type: String
        
    },
    address: {
        type: String
      
    },
    city: {
        type: String
        
    }, 
    // eventtype: {
    //     type: String
        
    // },
    hashtag: {
        type: String
        
    },
    eventtype: {
        type: String,
        enum: ["On site", "virtual"]
    },
    path: {
        type: String
        
    },
    
    ts: {
        type: Date,
        default: Date.now,
    },
    signupcount: {
        type: String,
        
    },
    
    signedup : [
        {
            signupID : {type : String } ,

            user_id : {type : String } ,
             restaurant_id:{type : String } 
        }
    ]

},
{
    versionKey: false
}
);
const Event = mongoose.model('event', eventSchema);
module.exports = Event;
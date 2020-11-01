const mongoose = require('mongoose');

const RestEventSchema = new mongoose.Schema({
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
    },
    eventname: {
        type: String,
        required: true,
    },
    eventdescription: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    eventtype:{
        type: String,
        required: true,
    },
    hashtag: {
        type: String,
    },
    path: {
        type: String,
    },
    RegistredUser : [
        {
            user_id : {type : String , required : true} 
        }
    ]
});

const RestEvent = mongoose.model('restevent', RestEventSchema);
module.exports = RestEvent;
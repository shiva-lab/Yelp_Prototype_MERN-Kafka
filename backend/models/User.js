const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId
      },
      user_name: {type: String,required: true,
    },
    fname: {type: String},
    lname: { type: String },
    Emailid: {
        type: String,
        required: true,
        unique: true,
    },
    userpass: {type: String, required: true},
    ts: {type: Date,
        default: Date.now },
    mobile: {type: String },
    dob: {type: Date },

    city: {type: String },
    country: {type: String },
    path: {type: String },
    bio:{type: String },
    favorites: {type: String },
    username: {type: String },
    zipcode: {type: String },
    address:{type: String },
    things_ilove:{type: String },
    find_me_in: {type: String },
    myblog: {type: String },
    ustate:{type: String },
    nick_name: {type: String },
    headline: {type: String },
    registeredEvents: { type: Array, max: 100 },
    yelpingsince:{type:Date},
    //followedUser: { type: Array, max: 100 },
    
    followedUser : [
        {
            _id : {type : String , required : true},
            fname: {type: String},
            lname: {type: String},
            Emailid: {type: String,required: true,unique: true},
            headline: {type: String },
            city: {type: String }
        }
    ]
},
{
    versionKey: false
}
);

const User = mongoose.model('user', UserSchema);
module.exports = User;
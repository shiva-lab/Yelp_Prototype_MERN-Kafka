const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId
      },
    userName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    Emailid: {
        type: String,
        required: true,
        unique: true,
    },
    userpass: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    ts: {
        type: Date,
        default: Date.now,
    },
    mobile: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    favorites: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
   
    zipcode: {
        type: String,
        required: true,
    },
    things_i_love: {
        type: String,
        required: true,
    },
    find_me_in: {
        type: String,
        required: true,
    },
    myblog: {
        type: String,
        required: true,
    },
    ustate: {
        type: String,
        required: true,
    },
    nick_name: {
        type: String,
        required: true,
    },
    headline: {
        type: String,
        required: true,
    },
},
{
    versionKey: false
}
);

const User = mongoose.model('user', UserSchema);
module.exports = User;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageSchema = new Schema({
        user1: {
            id: { type: String, required: true },
            name: { type: String, required: true },
            profile_img_url: String
        },
        user2: {
            id: { type: String, required: true },
            name: { type: String, required: true },
            profile_img_url: String
        },
        chats: [
            {
                from: { type: String, required: true },
                to: { type: String, required: true },
                chat: { type: String, required: true },
                time: { type: Date, required: true }
            }
        ]
    }
    ,
    {
        versionKey: false
    });


module.exports = mongoose.model('message', messageSchema);
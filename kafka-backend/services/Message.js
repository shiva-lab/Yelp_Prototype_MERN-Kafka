const Message = require('../Models/MessageModel');

function handle_request(msg, callBack) {
    if (msg.path === "get_messages") {
        Message.find({ $or: [{ 'user1.id': msg.id }, { 'user2.id': msg.id }] }, (error, result) => {
            if (error) {
                callBack(error);
            }
            console.log(result);
            return callBack(null, result);
        });
    }
    else if (msg.path === "add_message") {
        let data = msg.data;
        var newChat = {
            from: data.from,
            to: data.to,
            chat: data.chat,
            time: new Date().toISOString()
        }
        Message.update({ _id: data.id }, { $push: { chats: newChat } }, { upsert: false }, (error, results) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
        );
    }
    else if (msg.path === "create_message") {
        let data = msg.data;
        Message.findOne({
            $or: [
                {
                    $and: [{ 'user1.id': data.user1.id }, { 'user2.id': data.user2.id }]
                },
                {
                    $and: [{ 'user1.id': data.user2.id }, { 'user2.id': data.user1.id }]
                }
            ]
        }, (error, message) => {
            if (error) {
                callBack(error);
            }
            if (message) {
                return callBack(null);
            }
            else {
                var newMessage = new Message({
                    user1: data.user1,
                    user2: data.user2,
                    chats: []
                });
                newMessage.save((error, data) => {
                    if (error) {
                        callBack(error);
                    }
                    console.log(data);
                    return callBack(null, data);
                })
            }
        })
    }
};

exports.handle_request = handle_request;
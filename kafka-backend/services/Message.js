const Message = require('../models/Message');

function handle_request(msg, callBack) {
    if (msg.path === "get_messages") {
        console.log("----------In Get Message Service -----------")

        Message.find({ $or: [{ 'user1.id': msg.id }, { 'user2.id': msg.id }] }, (error, result) => {
            if (error) {
                callBack(error);
            }
            console.log(result);
            return callBack(null, result);
        });
    }
    else if (msg.path === "add_message") {
        console.log("----------In Add Message Service -----------", JSON.stringify(msg.data))

        let data = msg.data;
        var newChat = {
            "from": data.from,
            "to": data.to,
            "chat": data.chat,
            "time": new Date().toISOString()
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
        console.log("----------In Create Message Service -----------")
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
                console.log(data)

                var newMessage = new Message({
                    'user1.id' : data.user1.id,
                    'user2.id' : data.user2.id,
                    'user1.name': data.user1.name,
                    'user2.name': data.user2.name,
                    chats: []
                });
                newMessage.save()
                console.log("=========== Data ===========", newMessage)
                return callBack(null, data)
            }
        })
    }
};

exports.handle_request = handle_request;
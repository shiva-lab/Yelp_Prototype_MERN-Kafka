const connectionStrings = require('./config/configValues.js')
const ConnectionProvider = require( './kafka/connection.js')
const Message = require('./services/Message.js')
const User = require('./services/User.js')
const Restaurant = require('./services/Restaurant.js')
const Order = require('./services/Order.js')
const Event = require('./services/Event.js')
const mongoose = require('mongoose');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(connectionStrings.mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`Kafka MongoDB Connection Failed`);
    } else {
        console.log(`Kafka - MongoDB Connected`);
    }
});

function handleTopicRequest(topic_name,fname){
    var consumer = ConnectionProvider.getConsumer(topic_name);
    var producer = ConnectionProvider.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        fname.handle_request(data.data, function(err,res){
            console.log('after handle response: --------------  '+ res + JSON.stringify(data.data));
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

handleTopicRequest("message",Message)
handleTopicRequest("restaurant",Restaurant)
handleTopicRequest("user",User)
handleTopicRequest("event",Event)
handleTopicRequest("order",Order)
exports.receiveMsg = (req, res) => {
    console.log(" RabitMQ Receiver Activated");
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'service-api';
        var queue1 = 'weatherdata';

        channel.assertQueue(queue, {
            durable: true
        });

        channel.assertQueue(queue1, {
            durable: false
        });
        // console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        // ch.consume(q, function(msg) {
        //     console.log(" [x] Received");
        //     console.log(JSON.parse(msg.content));
        //  }, {noAck: true});
        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
        channel.consume(queue1, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});

};

exports.sendMsg = (req, res) => {
    const data=req.body;
    console.log(data);

    var amqp = require('amqplib/callback_api');

    amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
    
            var queue = 'retrieval-processing';
            // const value = "{'userid': 'abc'}";
    
            channel.assertQueue(queue, {
                durable: true
            });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    
            console.log(" [x] Sent %s", data);
        });
        
    });

    res.status(200).json({ message: "Data Sent Successfully to queue." });
    
};
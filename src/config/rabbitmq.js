import { connect } from 'amqplib/callback_api.js';
import {Mail} from '../utils/user.util'

//Sender
export const sender = (data) => {

  connect('amqp://localhost', (error0, connection) => {
    if (error0) throw error0;
    connection.createChannel((error1, ch1) => {
      if (error1) throw error1;
      var queue = 'userRegistration';
      var msg= data;
      ch1.assertQueue(queue, {
        durable: false
      });
        ch1.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
  });
}

//Receiver
 const receiver = () => {
  connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, ch2) {
        if (error1) {
            throw error1;
        }
        var queue = 'userRegistration';
        ch2.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        ch2.consume(queue, (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
            const msg1= JSON.parse(msg.content.toString());
            Mail(msg1.emailID);
            console.log("Message received....")
            
        }, {
            noAck: true
        });
    });
});
}
receiver();

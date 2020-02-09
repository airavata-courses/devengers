from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import nexradaws
import pika
import json


#app = Flask(__name__)
#app.config.from_object("project.config.Config")
#db = SQLAlchemy(app)
#channel = None


# Step #2
def on_connected(connection):
    """Called when we are fully connected to RabbitMQ"""
    # Open a channel
    connection.channel(on_open_callback=on_channel_open)
    print("cpnnected")

    # Step #3
def on_channel_open(new_channel):
    """Called when our channel has opened"""
    global channel
    channel = new_channel
    channel.queue_declare(queue="data-analysis", durable=True, exclusive=False, auto_delete=False, callback=on_queue_declared)
    print("channel open")

# Step #4
def on_queue_declared(frame):
    """Called when RabbitMQ has told us our Queue has been declared, frame is the response from RabbitMQ"""
    channel.basic_consume('data-analysis', handle_delivery)
    print("queue declared")

def return_api(data):
    #channel = connection.channel()
    print("return api called")
    connection1 = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel1 = connection1.channel()
    channel1.queue_declare(queue='service-api', durable=True)
    print("servicepai  processing connection established")
    data = {
        "userid": 1,
        "correlationid": "123456",
        "date": "02/02/2019",
        "time": "14:00"
        }
    message = json.dumps(data)
    channel1.basic_publish(exchange='',
                           routing_key='service-api',
                           body=message)
    print("message sent")
    connection1.close()
    print("conenction1 closed")
    

# Step #5
def handle_delivery(channel, method, header, body):
    """Called when we receive a message from RabbitMQ"""
    #print("Method: {}".format(method))
    #print("Properties: {}".format(header))
    #print(body)
    print("message recieved")
    
    print(body)
    
    data = json.loads(body)
    print("userid: {}".format(data['userid']))
    print("correlationid: {}".format(data['correlationid']))
    print('Date: {}'.format(data['date']))
    print('Time: {}'.format(data['time']))
    return_api(data)
    


# Step #1: Connect to RabbitMQ using the default parameters
parameters = pika.ConnectionParameters(host='localhost')
connection = pika.SelectConnection(parameters, on_open_callback=on_connected)


try:
    # Loop so we can communicate with RabbitMQ
    connection.ioloop.start()                                                                                                                                                            
except KeyboardInterrupt:
    # Gracefully close the connection
    connection.close()
    # Loop until we're fully closed, will stop on its own
    connection.ioloop.start()








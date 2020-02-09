from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import nexradaws
import pika
import json


app = Flask(__name__)
app.config.from_object("project.config.Config")
db = SQLAlchemy(app)
channel = None


# Step #2
def on_connected(connection):
    """Called when we are fully connected to RabbitMQ"""
    # Open a channel
    connection.channel(on_open_callback=on_channel_open)

    # Step #3
def on_channel_open(new_channel):
    """Called when our channel has opened"""
    global channel
    channel = new_channel
    channel.queue_declare(queue="retrieval-processing", durable=True, exclusive=False, auto_delete=False, callback=on_queue_declared)

# Step #4
def on_queue_declared(frame):
    """Called when RabbitMQ has told us our Queue has been declared, frame is the response from RabbitMQ"""
    channel.basic_consume('retrieval-processing', handle_delivery)

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

    #print(body)


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


class User(db.Model):
    __tablename__ = "dataretrieval_tracker"
	 
    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer)
    correlationid = db.Column(db.Integer)
    date = db.Column(db.String)
    time = db.Column(db.String)
    status =  db.Column(db.String)

def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)






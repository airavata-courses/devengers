from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import nexradaws
import pika
import json
import psycopg2


#app = Flask(__name__)
#app.config.from_object("project.config.Config")
#db = SQLAlchemy(app)
#channel = None


# Step #2
def on_connected(connection):
    """Called when we are fully connected to RabbitMQ"""
    # Open a channel
    print("connected")
    connection.channel(on_open_callback=on_channel_open)


    # Step #3
def on_channel_open(new_channel):
    """Called when our channel has opened"""
    print("cgannel open")
    global channel
    channel = new_channel
    channel.queue_declare(queue="model-processing", durable=True, exclusive=False, auto_delete=False, callback=on_queue_declared)

# Step #4
def on_queue_declared(frame):
    """Called when RabbitMQ has told us our Queue has been declared, frame is the response from RabbitMQ"""
    print("queue declared")
    channel.basic_consume('model-processing', handle_delivery)

def send_to_dataanalysis(data):
    #channel = connection.channel()
    print("model processing called")
    credentials1 = pika.PlainCredentials(username='guest', password='guest')
    connection1 = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq',port=5672,credentials=credentials1))
    channel1 = connection1.channel()
    channel1.queue_declare(queue='data-analysis', durable=True)
    print("model processing connection established")
    message = json.dumps(data)
    channel1.basic_publish(exchange='',
                           routing_key='data-analysis',
                           body=message)
    print("message sent")
    connection1.close()
    print("conenction1 closed")

def create_tables():
    """ create tables in the PostgreSQL database"""
    commands = """ CREATE TABLE IF NOT EXISTS modelling_status (
            id SERIAL PRIMARY KEY,
            userid VARCHAR(255) NOT NULL,
            correlationid VARCHAR(255) NOT NULL,
            request VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL
        );
        """
    return commands

# Step #5
def handle_delivery(channel, method, header, body):
    """Called when we receive a message from RabbitMQ"""
    #print("Method: {}".format(method))
    #print("Properties: {}".format(header))
    #print(body)
    print("message recieved")
    
    try:
        print("connecting to db")
        conn = psycopg2.connect("dbname='datamodelling_db' user='postgres' host='postgres' password='postgres'")
        print("connected to db")
        cur = conn.cursor()
        command = create_tables()
        print ("executin command")
        cur.execute(command)
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
        if cur is not None:
            cur.close()

    try:
        data = json.loads(body)
        send_to_dataanalysis(data)

        conn = psycopg2.connect("dbname='datamodelling_db' user='postgres' host='postgres' password='postgres'")
        cur = conn.cursor()
        userid = (data['userid'])
        correlationid = (data['correlationid'])
        status = "forwarded"
        print (userid)
        print(correlationid)
        sql = "INSERT INTO modelling_status (userid,correlationid,request,status) VALUES(%s,%s,%s,%s);"
        record_to_insert = (userid, correlationid, str(data), status)
        cur.execute(sql, record_to_insert)
        #get the generated id back
        #id = cur.fetchone()[0]
        conn.commit()
        print("data entered")

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
        if cur is not None:
            cur.close()
    

# Step #1: Connect to RabbitMQ using the default parameters
credentials = pika.PlainCredentials(username='guest', password='guest')
parameters = pika.ConnectionParameters(host='rabbitmq',port=5672,credentials=credentials)
connection = pika.SelectConnection(parameters, on_open_callback=on_connected)


try:
    # Loop so we can communicate with RabbitMQ
    connection.ioloop.start()                                                                                                                                                            
except KeyboardInterrupt:
    # Gracefully close the connection
    connection.close()
    # Loop until we're fully closed, will stop on its own
    connection.ioloop.start()








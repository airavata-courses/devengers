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
    
    message = json.dumps(data)
    channel1.basic_publish(exchange='',
                           routing_key='service-api',
                           body=message)
    print("message sent")
    connection1.close()
    print("conenction1 closed")

def create_tables():
    """ create tables in the PostgreSQL database"""
    commands = """ CREATE TABLE IF NOT EXISTS analysis_status (
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
    print("message recieved")
    
    try:
        print("connecting to db")
        conn = psycopg2.connect("dbname='dataresult_db' user='postgres' host='localhost' password='postgres'")
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
        return_api(data)

        conn = psycopg2.connect("dbname='dataresult_db' user='postgres' host='localhost' password='postgres'")
        cur = conn.cursor()
        userid = (data['userid'])
        correlationid = (data['correlationid'])
        status = "forwarded"
        print (userid)
        print(correlationid)
        sql = "INSERT INTO analysis_status (userid,correlationid,request,status) VALUES(%s,%s,%s,%s);"
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








from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import nexradaws
import pika
import json
import pytz
import psycopg2
import tempfile 
from datetime import datetime
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT




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

def return_api(data, correlationid, userid):
    #channel = connection.channel()
    print("return api called")
    print(data)
    message = {
        "userid": userid,
        "correlationid": correlationid,
        "no_of_files": data
        }
    credentials1 = pika.PlainCredentials(username='guest', password='guest')
    connection1 = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq',port=5672,credentials=credentials1))
    channel1 = connection1.channel()
    channel1.queue_declare(queue='service-api', durable=True)
    print("servicepai  processing connection established")
    
    message_final = json.dumps(message)
    channel1.basic_publish(exchange='',
                           routing_key='service-api',
                           body=message_final)
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
        print("creating ecting to db")
        ##conn = psycopg2.connect("dbname='dataretrieval_db' user='postgres' host='localhost' password='postgres'")
        conn = psycopg2.connect("dbname='postgres' user='postgres' host='postgres' password='postgres'")
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT);
        # Obtain a DB Cursor
        cursor          = conn.cursor();
        name_Database   = "dataresult_db";
        sqlCreateDatabase = "create database "+name_Database+";"
        cursor.execute(sqlCreateDatabase);
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
        if cursor is not None:
            cursor.close()
            
    try:
        print("connecting to db")
        conn = psycopg2.connect("dbname='dataresult_db' user='postgres' host='postgres' password='postgres'")
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
        print("reading data")
        data = json.loads(body)
        userid = (data['userid'])
        correlationid = (data['correlationid'])
        year = (data['year'])
        month = (data['month'])
        day = (data['day'])
        starthour = (data['starthour'])
        startmin = (data['startmin'])
        endhour = (data['endhour'])
        endmin = (data['endmin'])
        station = (data['station'])
        central_timezone = pytz.timezone('US/Central')
        radar_id = station

        start = central_timezone.localize(datetime(int(year),int(month),int(day),int(starthour),int(startmin)))
        end = central_timezone.localize (datetime(int(year),int(month),int(day),int(endhour),int(endmin)))
        conn_nexrad = nexradaws.NexradAwsInterface()
        scans = conn_nexrad.get_avail_scans_in_range(start, end, radar_id)
        print("There are {} scans available between {} and {}\n".format(len(scans), start, end))
        print(scans[0:4])

        templocation = tempfile.mkdtemp()
        results = conn_nexrad.download(scans[0:1], templocation)
        
        return_api(format(len(scans)), correlationid, userid)

        conn = psycopg2.connect("dbname='dataresult_db' user='postgres' host='postgres' password='postgres'")
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








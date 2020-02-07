from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import nexradaws

app = Flask(__name__)
app.config.from_object("project.config.Config")
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = "dataretrieval_tracker"
	 
    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer)
    correlationid = db.Column(db.Integer)
    request = db.Column(db.String)
    status =  db.Column(db.String)

    def __init__(self, email):
        self.email = email


@app.route("/")
def hello_world():
	conn = nexradaws.NexradAwsInterface()
	years =  conn.get_avail_years()
	print(years)
	return jsonify(hello="world")

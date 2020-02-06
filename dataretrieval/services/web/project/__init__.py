from flask import Flask, jsonify
import nexradaws

app = Flask(__name__)


@app.route("/")
def hello_world():
	conn = nexradaws.NexradAwsInterface()
	years =  conn.get_avail_years()
	print(years)
	return jsonify(hello="world")
from flask import Flask, request
from flask_cors import CORS
import json
from face_rec import FaceRec
from PIL import Image
import base64
import io
import os
import shutil
import time


app = Flask(__name__)
CORS(app)


@app.route("/add", methods=['POST', 'GET'])
def add():
	paramsa = request.get_json()
	
	emailo = paramsa['data1']
	
	resp = emailo
	
	directory = './known_people'

	if not os.path.exists(directory):
		os.mkdir(directory)
	if paramsa:
		if os.path.exists(directory):
			try:
				time.sleep(1)
				result = paramsa['data']
				b = bytes(result, 'utf-8')
				image = b[b.find(b'/9'):]
				im = Image.open(io.BytesIO(base64.b64decode(image)))
				im.save(directory+'/'+emailo+'.jpeg')
				
			except:
				pass
	return resp


@app.route('/api', methods=['POST', 'GET'])
def api():
	paramsa = request.get_json()
	global emailo
	emailo = paramsa['data1']
	resp = 'Nobody'
	directory = './stranger'
	if paramsa:
		if os.path.exists(directory):
			shutil.rmtree(directory)

		if not os.path.exists(directory):
			try:
				os.mkdir(directory)
				time.sleep(1)
				result = paramsa['data']
				b = bytes(result, 'utf-8')
				image = b[b.find(b'/9'):]
				im = Image.open(io.BytesIO(base64.b64decode(image)))
				im.save(directory+'/stranger.jpeg')


				if FaceRec('./known_people/'+emailo+'.jpeg', './stranger', emailo).recognize_faces() == emailo:
					resp = "access"
					
				else:
					resp = 'Nobody'
			except:
				pass
	return resp



if __name__ == '__main__':
	app.run()

	# https://pure-waters-34900.herokuapp.com/
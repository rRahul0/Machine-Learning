from flask import Flask, request, jsonify
from flask_cors import CORS
import utils

app = Flask(__name__)
CORS(app)

@app.route('/')
def test():
    return 'Hello, World!'

@app.route('/api/locations', methods=['GET'])
def locations():
    response = jsonify({
        'locations': utils.get_locations()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/predict_price', methods=['POST'])
def predict_price():
    data = request.get_json() 
    sqft = float(data['sqft'])
    bhk = int(data['bhk'])
    bath = int(data['bath'])
    location = data['location']

    response = jsonify({
        'estimated_price': utils.get_estimated_price(location, sqft, bhk, bath)
    })
    return response

if __name__ == '__main__':
    app.run()#debug=True
import os
from inference_sdk import InferenceHTTPClient
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

# initialize roboflow
CLIENT = InferenceHTTPClient(
    api_url="https://serverless.roboflow.com",
    api_key=os.getenv('ROBOFLOW_API_KEY')
)

# predict route
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded.'}), 400
    
    # save image to temp file
    file = request.files['file']
    temp_path = os.path.join('temp', file.filename)
    os.makedirs('temp', exist_ok=True)
    file.save(temp_path)

    # roboflow prediction
    result = CLIENT.infer(temp_path, model_id="accessrater-sy5y1/2")

    # clean up temp file 
    os.remove(temp_path)

    return jsonify(result)

# run on port 5000
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


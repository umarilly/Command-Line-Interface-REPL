from flask import Flask, request, jsonify
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the file to the draw-chart directory
    file.save(os.path.join('draw-chart', file.filename))

    return jsonify({'message': 'File uploaded successfully'}), 200

@app.route('/api/draw', methods=['POST'])
def draw_chart():
    # Implement chart drawing functionality here
    return jsonify({'message': 'Chart drawn successfully'}), 200

if __name__ == '__main__':
    app.run()

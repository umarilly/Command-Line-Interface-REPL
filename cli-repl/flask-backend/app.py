from flask import Flask, request, jsonify
import os
import pandas as pd
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
    
    file.save(os.path.join('draw-chart', file.filename))

    return jsonify({'message': 'File uploaded successfully'}), 200

@app.route('/api/draw', methods=['POST'])
def draw_chart():
    
    if not request.json or 'file' not in request.json or 'columns' not in request.json:
        return jsonify({'error': 'Invalid request'}), 400

    file_path = os.path.join('draw-chart', request.json['file'])

    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'}), 404

    df = pd.read_csv(file_path)
    
    df.fillna(0, inplace=True)

    df = df[~(df == 0).any(axis=1)]

    columns = request.json['columns']

    chart_data = df[columns]

    chart_data = chart_data.to_dict(orient='records')

    return jsonify({'chart_data': chart_data}), 200

if __name__ == '__main__':
    app.run()

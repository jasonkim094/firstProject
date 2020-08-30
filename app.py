from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.Diary


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/write')
def write_one():
    return render_template('write.html')


@app.route('/diaries', methods=['GET'])
def read_diary():
    history = list(db.daily.find({}, {'_id': False}))
    return jsonify({'result': 'success', 'history': history})


@app.route('/diaries', methods=['POST'])
def write_diary():
    date = request.form['date']
    rate = request.form['rate']
    keyword = request.form['keyword']
    content = request.form['content']

    doc = {
        'date': date,
        'rate': rate,
        'keyword': keyword,
        'content': content
    }

    db.daily.insert_one(doc)
    return jsonify({'result': 'success', 'msg': '하루가 기록되었습니다!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

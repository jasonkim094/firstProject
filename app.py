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


@app.route('/modify')
def modify_one():
    return render_template('modify.html')


@app.route('/see')
def see_one():
    return render_template('see.html')


@app.route('/diaries1', methods=['GET'])
def read_diary():
    history = list(db.daily.find({}, {'_id': False}))
    return jsonify({'result': 'success', 'history': history})


@app.route('/diaries2', methods=['GET'])
def read_diary2():
    history = list(db.daily.find({}, {'_id': False}))
    return jsonify({'result': 'success', 'history': history})


@app.route('/diaries3', methods=['GET'])
def read_diary3():
    history = list(db.daily.find({}, {'_id': False}))
    return jsonify({'result': 'success', 'history': history})


@app.route('/diaries1', methods=['POST'])
def write_diary():
    date = request.form['date']
    rate = request.form['rate']
    keyword = request.form['keyword']
    content = request.form['content']
    show_status = request.form['status']

    doc = {
        'date': date,
        'rate': rate,
        'keyword': keyword,
        'content': content,
        'show_status': show_status
    }

    db.daily.insert_one(doc)
    return jsonify({'result': 'success', 'msg': '하루가 기록되었습니다!'})


@app.route('/diaries2', methods=['POST'])
def modify_diary():
    date = request.form['date']
    rate = request.form['rate']
    keyword = request.form['keyword']
    content = request.form['content']
    show_status = request.form['status']

    db.daily.update_one({'show_status': 1}, {
        '$set': {'date': date, 'rate': rate, 'keyword': keyword, 'content': content, 'show_status': 0}})
    return jsonify({'result': 'success', 'msg': '하루가 수정되었습니다!'})


@app.route('/diaries3', methods=['POST'])
def current_diary():
    target = request.form['target']
    db.daily.update_one({'date': target}, {'$set': {'show_status': 1}})
    return jsonify({'result': 'success'})


@app.route('/modifyDiaries', methods=['GET'])
def see_diary():
    target = list(db.daily.find({'show_status': 1}, {'_id': False}))
    return jsonify({'result': 'success', 'target_data': target})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

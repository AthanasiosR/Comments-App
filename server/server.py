from flask import Flask, jsonify, request
from flask_cors import CORS
from comment import Comment

app = Flask(__name__)
CORS(app)

comment = Comment()

@app.route('/comment', methods=['POST'])
def post_comment():
    data = request.get_json()
    comment.insert_comment(data)
    return jsonify(comment.get_comments()), 201


@app.route('/comments', methods=['GET'])
def get_comments():
    return jsonify(comment.get_comments()), 201

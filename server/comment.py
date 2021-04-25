import MySQLdb
import os
import uuid
from time import time
from dotenv import load_dotenv

class Comment(object):
    
    def __init__(self):
        load_dotenv()
        db_host = os.environ.get("DATABASE_HOST")
        username = os.environ.get("USERNAME")
        password = os.environ.get("PASSWORD")
        db_name = os.environ.get("DATABSE_NAME")
        self.db = MySQLdb.connect(db_host, username, password, db_name)
        self.cursor = self.db.cursor()
        print("DB :: ", self.db)
        print("Cursor :: ", self.cursor)
    
    def insert_comment(self, comment):
        id = str(uuid.uuid4())
        name = comment.get("name", "")
        email = comment.get("email", "")
        comment = comment.get("comment", "")
        timestamp = int(time())
        # id | name  | email          | comment        | time
        query = 'INSERT INTO comments VALUES ("{id}", "{name}", "{email}", "{comment}", {time});'.format(
            id=id, name=name, email=email, comment=comment, time=timestamp)
        print("executing query :: ", query)
        try:
            self.cursor.execute(query)
            self.db.commit()
        except Exception as e:
            print("Got error :: ", str(e))
            self.db.rollback()
    
    def get_comments(self):
        query = 'SELECT * FROM comments ORDER BY time DESC;'
        print("executing query :: ", query)
        comments = []
        try:
            self.cursor.execute(query)
            for row in self.cursor.fetchall():
                comments.append({
                    'id': row[0],
                    'name': row[1],
                    'email': row[2],
                    'comment': row[3],
                    'time': row[4]
                })
        except Exception as e:
            print("Got error :: ", str(e))
        return comments

import datetime
from hashlib import md5

import pytz
from sqlalchemy import or_
from sqlalchemy import func, desc

from lib.util_sqlalchemy import ResourceMixin, AwareDateTime
from server.extensions import db


class Comment(ResourceMixin, db.Model):
    __tablename__ = 'comments'

    # Properties
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text(), nullable=False)
    visible = db.Column(db.Boolean(), server_default="1")
    
    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id', 
                                                  onupdate='CASCADE', 
                                                  ondelete='CASCADE'))

    @classmethod
    def get_all_comments(cls):
        """
        Retrieve all comments.
        """
        return cls.query.order_by(desc(cls.created_on))

    def to_json(self):
        """
        Convert comment instance to json
        """
        return {
            'id': self.id,
            'postId': self.post.id,
            'authorFullName': self.author.full_name,
            'authorUsername': self.author.username,
            'authorName': self.author.first_last_name,
            'created': self.created_on,
            'content': self.content,
            'visible': self.visible,
            'userPhoto': self.author.photo
        }

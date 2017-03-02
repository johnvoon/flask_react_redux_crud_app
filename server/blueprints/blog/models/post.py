import datetime
from hashlib import md5
import pytz
from sqlalchemy.ext.hybrid import hybrid_property
from comment import Comment
from lib.util_sqlalchemy import ResourceMixin, AwareDateTime
from server.extensions import db
from slugify import slugify

class Post(ResourceMixin, db.Model):
    __tablename__ = 'posts'

    # Relationships
    comments = db.relationship('Comment', 
                               backref=db.backref('post', uselist=False), 
                               passive_deletes=True,
                               lazy='dynamic')

    # Properties
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), index=True, unique=True, nullable=False)
    body = db.Column(db.ARRAY(db.String), nullable=False)
    summary = db.Column(db.String(250), nullable=False)
    img_src = db.Column(db.String(200))
    thumbnail_src = db.Column(db.String(200))
    view_count = db.Column(db.Integer, server_default='0')

    # Foreign Keys
    author_id = db.Column(db.Integer, db.ForeignKey('staff.id'))
    practice_area_id = db.Column(db.Integer, db.ForeignKey('practice_areas.id'))

    def __init__(self, **kwargs):
        # Call Flask-SQLAlchemy's constructor.
        super(Post, self).__init__(**kwargs)

    @hybrid_property
    def slug(self):
        return slugify(self.title)

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author.user.first_last_name,
            'body': self.body,
            'summary': self.summary,
            'practiceArea': self.practice_area.area,
            'imgSrc': self.img_src,
            'thumbnailSrc': self.thumbnail_src,
            'created': self.created_on,
            'updated': self.updated_on,
            'views': self.view_count,
            'authorPhoto': self.author.user.photo,
            'slug': self.slug
        }

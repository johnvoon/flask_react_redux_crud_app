import datetime
from hashlib import md5

import pytz
from sqlalchemy import or_
from sqlalchemy import func, desc
from comment import Comment

from lib.util_sqlalchemy import ResourceMixin, AwareDateTime
from snakeeyes.extensions import db

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

    @classmethod
    def get_all_posts(cls):
        """
        Retrieve all posts.

        :return: Array of posts arranged by date created (descending)
        """
        return cls.query.order_by(desc(cls.created_on))

    @classmethod
    def find_by_title(cls, title):
        """
        Find a post by title.

        :param title: Post title
        :type title: str
        :return: Post instance
        """
        return cls.query.filter(cls.title == title).first()

    @classmethod
    def find_by_area(cls, area):
        """
        Find posts by area.

        :param area: Post area
        :type area: str
        :return: Post instance
        """
        return cls.query.filter(cls.area == area
                        ).order_by(desc(cls.created_on))

    @classmethod
    def group_and_count_by_area(cls):
        """
        Perform a group by/count on all subscriber types.

        :return: dict
        """
        return cls._group_and_count(cls.area)

    @classmethod
    def group_and_count_by_author(cls):
        """
        Perform a group by/count on all subscriber types.

        :return: dict
        """
        return cls._group_and_count(cls.author)

    @classmethod
    def _group_and_count(cls, field):
        """
        Group results for a specific model and field.

        :param model: Name of the model
        :type model: SQLAlchemy model
        :param field: Name of the field to group on
        :type field: SQLAlchemy field
        :return: dict
        """
        count = func.count(field)
        query = db.session.query(count, field).group_by(field).all()

        results = {
            'query': query,
            'total': cls.query.count()
        }

        return results

    @classmethod
    def search(cls, query):
        """
        Search post by 1 or more fields.

        :param query: Search query
        :type query: str
        :return: SQLAlchemy filter
        """
        if not query:
            return ''

        search_query = '%{0}%'.format(query)
        search_chain = (cls.title.ilike(search_query),
                        cls.body.ilike(search_query))

        return or_(*search_chain)

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
            'authorPhoto': self.author.user.photo
        }

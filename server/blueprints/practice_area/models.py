from sqlalchemy import func
from lib.util_sqlalchemy import ResourceMixin, AwareDateTime
from sqlalchemy.ext.hybrid import hybrid_property
from server.blueprints.blog.models.post import Post
from server.blueprints.client.models.matter import Matter
from server.extensions import db
from practice_area_matter import practice_area_matter
from sqlalchemy import func

class PracticeArea(ResourceMixin, db.Model):
    __tablename__ = 'practice_areas'

    # Relationships
    posts = db.relationship('Post', backref=db.backref('practice_area', lazy="joined"), lazy='dynamic')
    matters = db.relationship('Matter', backref='practice_areas', secondary=practice_area_matter)

    # Properties
    id = db.Column(db.Integer, primary_key=True)
    area = db.Column(db.String(128), nullable=False, unique=True, index=True)
    img_src = db.Column(db.String(200))
    description = db.Column(db.ARRAY(db.String), nullable=False)
    slug = db.Column(db.String(128), nullable=False, unique=True, index=True)

    def to_json_short(self):
        return {
            'id': self.id,
            'area': self.area
        }

    def to_json(self):
        return {
            'id': self.id,
            'area': self.area,
            'imgSrc': self.img_src,
            'posts': self.posts.count(),
            'description': self.description,
            'slug': self.slug
        }
from sqlalchemy import func
from lib.util_sqlalchemy import ResourceMixin, AwareDateTime
from snakeeyes.blueprints.blog.models.post import Post
from snakeeyes.blueprints.staff.models import Staff
from snakeeyes.blueprints.client.models.case import Case
from snakeeyes.extensions import db

class PracticeArea(ResourceMixin, db.Model):
    __tablename__ = 'practice_areas'

    # Relationships
    posts = db.relationship('Post', backref=db.backref('practice_area', lazy="joined"), lazy='dynamic')
    staff = db.relationship('Staff', backref='practice_area', lazy='dynamic')
    cases = db.relationship('Case', backref='practice_area', lazy='dynamic')

    # Properties
    id = db.Column(db.Integer, primary_key=True)
    area = db.Column(db.String(128), nullable=False, index=True)
    img_src = db.Column(db.String(200))
    description = db.Column(db.ARRAY(db.String), nullable=False)

    @classmethod
    def find_by_area(cls, area):
        """
        Find practice area.

        :param title: Practice area name
        :type title: str
        :return: Practice area instance
        """
        return cls.query.filter(cls.area == area).first()

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
            'description': self.description
        }
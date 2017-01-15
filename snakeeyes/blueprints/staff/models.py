from sqlalchemy import or_
from sqlalchemy import func, desc

from lib.util_sqlalchemy import ResourceMixin, AwareDateTime
from lib.util_datetime import tzaware_datetime
from snakeeyes.blueprints.blog.models.post import Post
from snakeeyes.blueprints.client.models.case import Case
from snakeeyes.blueprints.appointment.models import Appointment
from staff_case import staff_case
from staff_appointment import staff_appointment
from snakeeyes.extensions import db

class Staff(ResourceMixin, db.Model):
    __tablename__ = 'staff'


    # Relationships
    posts_authored = db.relationship(Post, backref=db.backref('author', lazy="joined"), lazy='dynamic')
    cases_handled = db.relationship(Case, backref='staff', secondary=staff_case)
    appointments = db.relationship(Appointment, backref='staff', secondary=staff_appointment)

    id = db.Column(db.Integer, primary_key=True)
    dated_joined = db.Column(AwareDateTime(), default=tzaware_datetime, nullable=False)
    position = db.Column(db.String(128), nullable=False)
    img_src = db.Column(db.String(200))

    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id',
                        onupdate='CASCADE',
                        ondelete='CASCADE'),
                        index=True, nullable=False)
    practice_area_id = db.Column(db.Integer, db.ForeignKey('practice_areas.id'), 
                                 index=True, nullable=False)

    @classmethod
    def get_all_staff(cls):
        """
        Retrieve all staff members.
        """
        return cls.query.order_by(desc(cls.created_on))

    @classmethod
    def find_by_name(cls, name):
        """
        Find a blog by title.

        :param title: Blog title
        :type title: str
        :return: Blog instance
        """
        return cls.query.filter(cls.fullname == name).first()

    @classmethod
    def find_by_area(cls, practice_area):
        """
        Find posts by area.
        :param area: Blog area
        :type area: str
        :return: Blog instance
        """
        return cls.query.filter(cls.practice_area == practice_area
                        ).order_by(desc(cls.created_on))

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
    def search(cls, query):
        """
        Search a blog by 1 or more fields.

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
            'name': self.user.first_last_name,
            'datedJoined': self.dated_joined,
            'position': self.position,
            'imgSrc': self.img_src,
            'posts': self.posts_authored.count() 
        }

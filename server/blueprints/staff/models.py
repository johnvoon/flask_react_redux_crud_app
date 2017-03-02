from sqlalchemy import or_
from sqlalchemy import func, desc
from lib.util_sqlalchemy import ResourceMixin, AwareDateTime
from lib.util_datetime import tzaware_datetime
from server.blueprints.blog.models.post import Post
from server.blueprints.client.models.matter import Matter
from server.blueprints.appointment.models import Appointment
from server.blueprints.practice_area.models import PracticeArea
from staff_matter import staff_matter
from staff_appointment import staff_appointment
from staff_practice_area import staff_practice_area
from server.extensions import db

class Staff(ResourceMixin, db.Model):
    __tablename__ = 'staff'


    # Relationships
    posts_authored = db.relationship(Post, backref=db.backref('author', lazy="joined"), lazy='dynamic')
    matters_handled = db.relationship(Matter, backref='staff', secondary=staff_matter)
    appointments = db.relationship(Appointment, backref='staff', secondary=staff_appointment)
    practice_areas = db.relationship(PracticeArea, backref='staff', secondary=staff_practice_area)

    id = db.Column(db.Integer, primary_key=True)
    dated_joined = db.Column(AwareDateTime(), default=tzaware_datetime)
    position = db.Column(db.String(128))
    description = db.Column(db.ARRAY(db.String))

    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                        index=True, unique=True, nullable=False)

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
        matters_handled = [matter.id for matter in self.matters_handled]
        posts_authored = [post.id for post in self.posts_authored]
        practice_areas = [practice_area.id for practice_area in self.practice_areas]

        return {
            'id': self.id,
            'name': self.user.first_last_name,
            'datedJoined': self.dated_joined,
            'position': self.position,
            'photo': self.user.photo,
            'posts': self.posts_authored.count(),
            'description': self.description,
            'userId': self.user_id,
            'mattersHandled': matters_handled,
            'postsAuthored': posts_authored,
            'practiceAreas': practice_areas
        }

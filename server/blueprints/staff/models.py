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
    def find_by_user_id(cls, user_id):
        """
        Find staff by user ID.

        :param user_id: user ID
        :type title: str
        :return: Staff instance
        """
        return cls.query.filter(cls.user_id == user_id).first()

    def to_json(self):
        matters_handled = [matter.id for matter in self.matters_handled]
        posts_authored = [post.id for post in self.posts_authored]
        practice_areas = [practice_area.id for practice_area in self.practice_areas]

        return {
            'id': self.id,
            'name': self.user.first_last_name,
            'dateJoined': self.dated_joined,
            'position': self.position,
            'photo': self.user.photo,
            'posts': self.posts_authored.count(),
            'description': self.description,
            'userId': self.user_id,
            'mattersHandled': matters_handled,
            'postsAuthored': posts_authored,
            'practiceAreas': practice_areas
        }

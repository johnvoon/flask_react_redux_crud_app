from flask import current_app
from sqlalchemy import or_
from sqlalchemy.ext.hybrid import hybrid_property
from lib.util_sqlalchemy import ResourceMixin
from server.extensions import db
from matter import Matter
from client_matter import client_matter
from server.blueprints.appointment.models import Appointment


class Client(ResourceMixin, db.Model):
    __tablename__ = 'clients'

    # Relationships
    matters = db.relationship(Matter, secondary=client_matter, backref='clients')

    # Properties
    id = db.Column(db.Integer, primary_key=True)

    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', 
        onupdate='CASCADE', 
        ondelete='CASCADE'), index=True, nullable=False)

    def __init__(self, **kwargs):
        super(Client, self).__init__(**kwargs)

    @classmethod
    def find_by_user_id(cls, user_id):
        """
        Find client by user ID.

        :param user_id: user ID
        :type title: str
        :return: Client instance
        """
        return cls.query.filter(cls.user_id == user_id).first()

    def to_json(self):
        matters = [matter.id for matter in self.matters]

        return {
            'id': self.id,
            'userId': self.user.id,
            'matters': matters,
            'name': self.user.first_last_name
        }

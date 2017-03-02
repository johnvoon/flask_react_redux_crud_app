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
    def find_by_identity(cls, identity):
        """
        Find client by user account e-mail or username.

        :param identity: Email or username
        :type identity: str
        :return: Client instance
        """
        user = User.find_by_identity(identity)
        return cls.filter(cls.user_id == user.id).first()

    @classmethod
    def search(cls, query):
        """
        Search by 1 or more fields using ILIKE (case-insensitive).

        :param query: Search query
        :type query: str
        :return: SQLAlchemy filter
        """
        if not query:
            return ''

        search_query = '%{0}%'.format(query)
        search_columns = (Client.surname.ilike(search_query),
                        Client.fullname.ilike(search_query))

        return or_(*search_columns)


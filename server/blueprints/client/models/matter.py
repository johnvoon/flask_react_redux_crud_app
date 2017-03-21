import pytz
from flask import current_app
from sqlalchemy.ext.hybrid import hybrid_property
from lib.util_datetime import tzaware_datetime
from lib.util_sqlalchemy import ResourceMixin, AwareDateTime
from server.extensions import db

class Matter(ResourceMixin, db.Model):
    __tablename__ = 'matters'

    # Properties
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(1000))
    file_open = db.Column(AwareDateTime(),
                          default=tzaware_datetime)
    file_close = db.Column(AwareDateTime())
    costs_on_account = db.Column(db.Numeric(10, 2), server_default='0')
    active = db.Column(db.Boolean(), nullable=False,
                       server_default='1')

    def __init__(self, **kwargs):
        super(Matter, self).__init__(**kwargs)

    def to_json(self):
        """
        Convert Matter instance to json
        """
        clients = [client.id for client in self.clients]
        practice_areas = [practice_area.id for practice_area in self.practice_areas]
        staff = [staff_member.id for staff_member in self.staff]

        return {
            'id': self.id,
            'description': "[" + str(self.id) + "] " + (self.description if self.description else ''),
            'fileOpen': self.file_open,
            'fileClose': self.file_close,
            'active': self.active,
            'costsOnAccount': self.costs_on_account,
            'clients': clients,
            'practiceAreas': practice_areas,
            'staff': staff
        }

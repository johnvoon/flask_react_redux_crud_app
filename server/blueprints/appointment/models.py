from lib.util_sqlalchemy import ResourceMixin, AwareDateTime
from server.extensions import db


class Appointment(ResourceMixin, db.Model):
    __tablename__ = 'appointments'

    # Properties
    id = db.Column(db.Integer, primary_key=True)
    scheduled_datetime = db.Column(db.Date, index=True)
    subject_matter = db.Column(db.String(1000), nullable=False)

    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

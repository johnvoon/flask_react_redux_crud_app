import pytz
from flask import current_app
from sqlalchemy.ext.hybrid import hybrid_property
from lib.util_datetime import tzaware_datetime
from lib.util_sqlalchemy import ResourceMixin, AwareDateTime
from snakeeyes.extensions import db


class Case(ResourceMixin, db.Model):
    __tablename__ = 'cases'

    # Properties
    id = db.Column(db.Integer, primary_key=True)
    matter = db.Column(db.String(1000))
    file_open = db.Column(AwareDateTime(),
                          default=tzaware_datetime)
    file_close = db.Column(AwareDateTime(),
                           default=tzaware_datetime)
    active = db.Column(db.Boolean(), nullable=False,
                       server_default='1')

    # Foreign Key
    practice_area_id = db.Column(db.Integer, db.ForeignKey('practice_areas.id'), index=True, nullable=False)

    def __init__(self, **kwargs):
        super(Case, self).__init__(**kwargs)

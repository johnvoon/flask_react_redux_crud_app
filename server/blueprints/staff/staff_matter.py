from server.extensions import db

staff_matter = db.Table('staff_matter', 
                       db.Column('staff_id', db.Integer, db.ForeignKey('staff.id'), nullable=False),
                       db.Column('matter_id', db.Integer, db.ForeignKey('matters.id'), nullable=False))

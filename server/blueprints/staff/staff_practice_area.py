from server.extensions import db

staff_practice_area = db.Table('staff_practice_area', 
                       db.Column('staff_id', db.Integer, db.ForeignKey('staff.id'), nullable=False),
                       db.Column('practice_area_id', db.Integer, db.ForeignKey('practice_areas.id'), nullable=False))

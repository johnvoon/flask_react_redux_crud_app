from server.extensions import db

practice_area_matter = db.Table('practice_area_matter', 
    db.Column('practice_area_id', db.Integer, db.ForeignKey('practice_areas.id'), nullable=False),
    db.Column('matter_id', db.Integer, db.ForeignKey('matters.id'), nullable=False)
)

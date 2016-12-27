from snakeeyes.extensions import db

staff_case = db.Table('staff_case', 
                       db.Column('staff_id', db.Integer, db.ForeignKey('staff.id'), nullable=False),
                       db.Column('case_id', db.Integer, db.ForeignKey('cases.id'), nullable=False))

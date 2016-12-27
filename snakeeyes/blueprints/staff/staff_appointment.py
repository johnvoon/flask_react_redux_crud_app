from snakeeyes.extensions import db

staff_appointment = db.Table('staff_appointment', 
                        db.Column('staff_id', db.Integer, db.ForeignKey('staff.id'), nullable=False),
                        db.Column('appointment_id', db.Integer, db.ForeignKey('appointments.id'), nullable=False))

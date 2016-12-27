from snakeeyes.extensions import db

client_case = db.Table('client_case', 
                       db.Column('client_id', db.Integer, db.ForeignKey('clients.id'), nullable=False),
                       db.Column('case_id', db.Integer, db.ForeignKey('cases.id'), nullable=False))

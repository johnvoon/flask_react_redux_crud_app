from server.extensions import db

client_matter = db.Table('client_matter', 
    db.Column('client_id', db.Integer, db.ForeignKey('clients.id'), nullable=False),
    db.Column('matter_id', db.Integer, db.ForeignKey('matters.id'), nullable=False)
)

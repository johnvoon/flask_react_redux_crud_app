import datetime
from collections import OrderedDict
from hashlib import md5
import pytz
from flask import current_app
from sqlalchemy import or_
from bcrypt import hashpw, checkpw, gensalt
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.ext.hybrid import hybrid_property
from itsdangerous import URLSafeTimedSerializer, TimedJSONWebSignatureSerializer
from lib.util_sqlalchemy import ResourceMixin, AwareDateTime
from server.blueprints.blog.models.comment import Comment
from server.blueprints.client.models.client import Client
from server.blueprints.staff.models import Staff
from server.blueprints.appointment.models import Appointment
from server.extensions import db

class User(UserMixin, ResourceMixin, db.Model):
    ROLE = OrderedDict([
        ('admin', 'Admin'),
        ('client', 'Client'),
        ('staff', 'Staff'),
        ('public', 'Public')
    ])

    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)

    # Relationships
    client = db.relationship(Client, backref=db.backref('user', uselist=False), 
                           uselist=False, cascade="all, delete-orphan")
    staff = db.relationship(Staff, backref=db.backref('user', uselist=False),
                            uselist=False, cascade="all, delete-orphan")
    comments = db.relationship(Comment, backref=db.backref('author', uselist=False), lazy='dynamic')
    appointments = db.relationship(Appointment, backref='user', lazy='dynamic')

    # Properties.
    role = db.Column(db.Enum(*ROLE, name='role_types', native_enum=False),
                     index=True, nullable=False, server_default='public')
    active = db.Column('is_active', db.Boolean(), nullable=False,
                       server_default='1')
    username = db.Column(db.String(24), unique=True, index=True, nullable=False)
    email = db.Column(db.String(255), unique=True, index=True, nullable=False,
                      server_default='')
    password = db.Column(db.String(128), nullable=False, server_default='')
    first_name = db.Column(db.String(256), nullable=False)
    middle_name = db.Column(db.String(256))
    last_name = db.Column(db.String(256), index=True, nullable=False)
    unit_number = db.Column(db.String(128))
    street_address = db.Column(db.String(128))
    suburb = db.Column(db.String(128))
    postcode = db.Column(db.String(4))
    state = db.Column(db.String(128))
    country = db.Column(db.String(128))
    phone_number = db.Column(db.String(128), nullable=False)
    photo = db.Column(db.String(256))

    # Activity tracking.
    sign_in_count = db.Column(db.Integer, nullable=False, default=0)
    current_sign_in_on = db.Column(AwareDateTime())
    current_sign_in_ip = db.Column(db.String(45))
    last_sign_in_on = db.Column(AwareDateTime())
    last_sign_in_ip = db.Column(db.String(45))

    # Additional settings.
    locale = db.Column(db.String(5), nullable=False, server_default='en')

    def __init__(self, **kwargs):
        # Call Flask-SQLAlchemy's constructor.
        super(User, self).__init__(**kwargs)

        self.password = User.encrypt_password(kwargs.get('password', ''))

    @hybrid_property
    def full_name(self):
        if self.middle_name:
            return self.last_name.upper() + ', ' + self.first_name + ' ' + self.middle_name 
        else:
            return self.last_name.upper() + ', ' + self.first_name

    @hybrid_property
    def first_last_name(self):
        return self.first_name + ' ' + self.last_name

    @hybrid_property
    def full_address(self):
        street_address = self.unit_number + "/" + self.street_address if self.unit_number and self.street_address else self.street_address
        address_elements = [street_address, self.suburb, self.postcode, self.state, self.country]
        return ", ".join(address_elements) if None not in address_elements else None

    @classmethod
    def find_by_identity(cls, identity):
        """
        Find user by e-mail or username.

        :param identity: Email or username
        :type identity: str
        :return: User instance
        """
        return User.query.filter(
          (User.email == identity) | (User.username == identity)).first()

    @classmethod
    def encrypt_password(cls, plaintext_password):
        """
        Hash password using Bcrypt.

        :param plaintext_password: Password in plain text
        :type plaintext_password: str
        :return: str
        """
        if plaintext_password:
            return hashpw(plaintext_password, gensalt())

        return None

    @classmethod
    def deserialize_token(cls, token):
        """
        Obtain user from de-serializing token.

        :param token: Signed token.
        :type token: str
        :return: User instance or None
        """
        private_key = TimedJSONWebSignatureSerializer(
            current_app.config['SECRET_KEY'])
        try:
            decoded_payload = private_key.loads(token)

            return User.find_by_identity(decoded_payload.get('user_email'))
        except Exception:
            return None

    @classmethod
    def initialize_password_reset(cls, identity):
        """
        Generate token to reset the password for a specific user.

        :param identity: User e-mail address or username
        :type identity: str
        :return: User instance
        """
        u = User.find_by_identity(identity)
        reset_token = u.serialize_token()

        # This prevents circular imports.
        from server.blueprints.user.tasks import (
            deliver_password_reset_email)
        deliver_password_reset_email.delay(u.id, reset_token)

        return u

    @classmethod
    def search(cls, query):
        """
        Search using ILIKE (case-insensitive) expression.

        :param query: Search query
        :type query: str
        :return: SQLAlchemy filter
        """
        if not query:
            return ''

        search_query = '%{0}%'.format(query)
        search_chain = (User.email.ilike(search_query),
                        User.username.ilike(search_query))

        return or_(*search_chain)

    @classmethod
    def is_last_admin(cls, user, new_role, new_active):
        """
        Return whether user is last admin account.

        :param user: User being tested
        :type user: User
        :param new_role: New role being set
        :type new_role: str
        :param new_active: New active status being set
        :type new_active: bool
        :return: bool
        """
        is_changing_roles = user.role == 'admin' and new_role != 'admin'
        is_changing_active = user.active is True and new_active is None

        if is_changing_roles or is_changing_active:
            admin_count = User.query.filter(User.role == 'admin').count()
            active_count = User.query.filter(User.is_active is True).count()

            if admin_count == 1 or active_count == 1:
                return True

        return False

    def is_active(self):
        """
        Return whether user account is active (overrides Flask-Login default).

        :return: bool
        """
        return self.active

    def get_auth_token(self):
        """
        Return user's auth token.

        :return: str
        """
        private_key = current_app.config['SECRET_KEY']

        serializer = URLSafeTimedSerializer(private_key)
        data = [str(self.id), md5(self.password.encode('utf-8')).hexdigest()]

        return serializer.dumps(data)

    def authenticated(self, with_password=True, password=''):
        """
        Ensure user authenticated.

        :param with_password: Optionally check password
        :type with_password: bool
        :param password: Password to verify
        :type password: str
        :return: bool
        """
        if with_password:
            return checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

        return True

    def serialize_token(self, expiration=3600):
        """
        Serialize token for resetting passwords, etc.

        :param expiration: Seconds until it expires, defaults to 1 hour
        :type expiration: int
        :return: JSON
        """
        private_key = current_app.config['SECRET_KEY']

        serializer = TimedJSONWebSignatureSerializer(private_key, expiration)
        return serializer.dumps({'user_email': self.email}).decode('utf-8')

    def update_activity_tracking(self, ip_address):
        """
        Update user's meta data.

        :param ip_address: IP address
        :type ip_address: str
        :return: SQLAlchemy commit results
        """
        self.sign_in_count += 1
        self.last_sign_in_on = self.current_sign_in_on
        self.last_sign_in_ip = self.current_sign_in_ip
        self.current_sign_in_on = datetime.datetime.now(pytz.utc)
        self.current_sign_in_ip = ip_address

        return self.save()

    def to_json(self):
        active = "Active" if self.active == True else "Disabled"
        json_data = {
            'id': self.id,
            'created': self.created_on,
            'updated': self.updated_on,
            'active': active,
            'firstLastName': self.first_last_name,
            'firstName': self.first_name,
            'middleName': self.middle_name,
            'lastName': self.last_name.upper(),
            'fullName': self.full_name,
            'username': self.username,
            'email': self.email,
            'phoneNumber': self.phone_number,
            'unitNumber': self.unit_number,
            'streetAddress': self.street_address,
            'suburb': self.suburb,
            'postcode': self.postcode,
            'state': self.state,
            'country': self.country,
            'fullAddress': self.full_address,
            'role': self.role,
            'photo': self.photo,
        }
        
        return json_data

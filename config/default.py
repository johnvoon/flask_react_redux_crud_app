from datetime import timedelta
from celery.schedules import crontab

DEBUG = False
LOG_LEVEL = 'DEBUG'  # CRITICAL / ERROR / WARNING / INFO / DEBUG
WTF_CSRF_ENABLED = False

SERVER_NAME = 'localhost:8000'

# Flask-Mail.
MAIL_DEFAULT_SENDER = 'johnksvoon@gmail.com'
MAIL_SERVER = 'smtp.gmail.com'
MAIL_PORT = 587
MAIL_USE_TLS = True
MAIL_USE_SSL = False

# Celery.
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_REDIS_MAX_CONNECTIONS = 5

# SQLAlchemy.
SQLALCHEMY_TRACK_MODIFICATIONS = False

# User.
REMEMBER_COOKIE_DURATION = timedelta(days=90)

# Rate limit
RATELIMIT_STRATEGY = 'fixed-window-elastic-expiry'
RATELIMIT_HEADERS_ENABLED = True

# File upload
IMAGES = 'server/static/images/'
IMAGES_2000 = 'server/static/images/2000'
IMAGES_400 = 'server/static/images/400'

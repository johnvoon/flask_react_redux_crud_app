SECRET_KEY = 'insecurekeyfordev'

MAIL_USERNAME = 'johnksvoon@gmail.com'
MAIL_PASSWORD = 'jv220289'

CELERY_BROKER_URL = 'redis://:devpassword@redis:6379/0'
CELERY_RESULT_BACKEND = CELERY_BROKER_URL

db_uri = 'postgresql://concept:devpassword@postgres:5432/concept'
SQLALCHEMY_DATABASE_URI = db_uri

SEED_ADMIN_USERNAME = 'admin'
SEED_ADMIN_FIRST_NAME = 'admin'
SEED_ADMIN_LAST_NAME = 'admin'
SEED_ADMIN_EMAIL = 'admin@conceptlawfirm.com'
SEED_ADMIN_PASSWORD = 'devpassword'
SEED_ADMIN_PHONE_NUMBER = '000000000'

RATELIMIT_STORAGE_URL = CELERY_BROKER_URL
from os import getenv, path
from dotenv import load_dotenv
from .base import * # noqa
from .base import BASE_DIR


local_env_file = path.join(BASE_DIR, '.envs', '.env.local')


if path.isfile(local_env_file):
    load_dotenv(local_env_file)


SECRET_KEY = getenv('SECRET_KEY', 'gmwoaHeDhVDo2D3cCVpRtaQ6GwFyip11PUXTG-iwJMkpNlmB0Mk')

DEBUG = getenv('DEBUG')

SITE_NAME = getenv('SITE_NAME')

ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0']

ADMIN_URL = getenv('DJANGO_ADMIN_URL')

EMAIL_BACKEND = 'djcelery_email.backends.CeleryEmailBackend'
EMAIL_HOST = getenv('EMAIL_HOST')
EMAIL_PORT = getenv('EMAIL_PORT')
DEFAULT_FROM_EMAIL = getenv('DEFAULT_FROM_EMAIL')
DOMAIN = getenv('DOMAIN')


MAX_UPLOAD_SIZE = 1 * 1024 * 1024

CSRF_TRUSTED_ORIGINS = ['http://localhost:8080']

LOCKOUT_DURATION = timedelta(minutes=1)

LOGIN_ATTEMPTS = 3

OTP_EXPIRATION = timedelta(minutes=1)


LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(name)-12s %(asctime)s %(module)s %(process)d %(thread)d %(message)s"
        }
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        }
    },
    "root": {
        "level": "INFO",
        "handlers": ["console"],
    }
}
from kgb_ffl.kgb_ffl.settings.base import SITE_ID
import os

USERNAME = os.getenv('USERNAME')
DATABASE_NAME = os.getenv('DATABASE_NAME')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_HOSTNAME = os.getenv('MYSQL_HOSTNAME')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': f'{USERNAME}${DATABASE_NAME}',
        'USER': f'{USERNAME}',
        'PASSWORD': f'{MYSQL_PASSWORD}',
        'HOST': f'{MYSQL_HOSTNAME}',
    }
}
SITE_ID = 1

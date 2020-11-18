from .base import *
import os

if os.getenv('KGB_FFL') == 'production':
    from .production import *
else:
    from .development import *

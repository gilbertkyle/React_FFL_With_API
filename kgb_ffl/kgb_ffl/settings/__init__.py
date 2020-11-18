from .base import *
import os

if os.getenv('KGB_ffl') == 'production':
    from .production import *
else:
    from .development import *

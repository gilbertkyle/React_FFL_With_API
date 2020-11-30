"""
    This file contains all football related settings
    such as start date and number of weeks in the season 
"""
import datetime
from pytz import timezone

BASE_DATE = datetime.datetime(2020, 8, 30, 10, 0, 0)
TIME_ZONE = timezone("US/Pacific")

NUMBER_OF_WEEKS = 17

CURRENT_YEAR = 2020

"""
    This file contains all football related settings
    such as start date and number of weeks in the season 
"""
import datetime
from pytz import timezone

TIME_ZONE = timezone("US/Pacific")
BASE_DATE = datetime.datetime(2020, 8, 30, 10, 0, 0, tzinfo=TIME_ZONE)

NUMBER_OF_WEEKS = 18

CURRENT_YEAR = 2021


def get_week():
    """
    Returns the current week of the NFL
    Set the base week to 7 days before Week 1 Sunday
    """
    base_week = BASE_DATE
    today = datetime.datetime.now(TIME_ZONE)
    diff = today - base_week
    current_week = int(diff.days/7) if diff.days >= 0 else 1
    if current_week > NUMBER_OF_WEEKS:
        return NUMBER_OF_WEEKS
    elif current_week < 1:
        return 1
    return current_week

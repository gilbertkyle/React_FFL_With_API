from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import *

router = DefaultRouter()
router.register(r'api/players', PlayerViewSet, basename='players')
router.register(r'api/leagues', LeagueViewSet, basename="leagues")
router.register(r'api/picks', PickViewSet, basename="picks")
router.register(r'api/threads', ThreadViewSet, basename='threads')
router.register(r'api/invitations', InvitationViewSet, basename="invitations")


urlpatterns = [
    path('api/users', ListUsersAPI.as_view()),
    path('api/league/admin', ListCommishLeaguesAPI.as_view()),
    path('api/admin/picks', AdminRetrievePicksAPI.as_view()),
    path('api/current_week', get_current_week),
    path('api/current_year', get_current_year),
]

urlpatterns += router.urls

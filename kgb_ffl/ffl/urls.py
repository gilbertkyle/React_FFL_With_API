from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import *

router = DefaultRouter()
router.register(r'api/players', PlayerViewSet, basename='player')
router.register(r'api/leagues', LeagueViewSet, basename="league")
router.register(r'api/leagues', LeagueViewSet, basename="leagues")
router.register(r'api/picks', PickViewSet, basename="pick")


urlpatterns = [
    path('api/users', ListUsersAPI.as_view()),
    path('api/league/admin', ListCommishLeaguesAPI.as_view()),
    path('api/admin/picks', AdminRetrievePicksAPI.as_view()),
    path('api/current_week', get_current_week),
    path('api/current_year', get_current_year),
    path('api/invitations', InvitationAPI.as_view()),
    path('api/forum', ThreadAPI.as_view()),
    path('api/forum/<int:pk>', ThreadDetailAPI.as_view())
]

urlpatterns += router.urls

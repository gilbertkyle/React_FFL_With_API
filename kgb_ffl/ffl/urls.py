from django.urls import path, include
from .api import *


urlpatterns = [
    path('api/league/register', CreateLeagueAPI.as_view()),
    path('api/league/join', JoinLeagueAPI.as_view()),
    path('api/league/retrieve', ListLeagueAPI.as_view()),
    path('api/league/retrieve/<int:pk>', RetrieveLeagueAPI.as_view()),
    path('api/current_week', get_current_week),
    path('api/picks', ListPicks.as_view()),
    path('api/picks/<int:id>', UpdatePicks.as_view()),
    path('api/players', PlayerViewSet.as_view({'get': 'list'})),
    path('api/players/<int:pk>', PlayerViewSet.as_view({'get': 'retrieve'}))
]

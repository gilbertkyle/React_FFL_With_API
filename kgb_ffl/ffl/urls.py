from django.urls import path, include
from .api import *

list_players = PlayerViewSet.as_view({
    'get': 'list'
})
get_player = PlayerViewSet.as_view({
    'get': 'list'
})


urlpatterns = [
    path('api/league/register', CreateLeagueAPI.as_view()),
    path('api/league/join', JoinLeagueAPI.as_view()),
    path('api/league/retrieve', ListLeagueAPI.as_view()),
    path('api/league/retrieve/<int:pk>', RetrieveLeagueAPI.as_view()),
    path('api/current_week', get_current_week),
    path('api/picks', ListPicks.as_view()),
    path('api/picks/<int:id>', UpdatePicks.as_view()),
    path('api/players', ListPlayerAPI.as_view()),
    path('api/players/<str:name>', RetrievePlayerAPI.as_view())
]

from django.shortcuts import render
from ffl.serializers import UserSerializer, PlayerSerializer, LeagueSerializer, DefenseSerializer, CreateLeagueSerializer
from ffl.models import User, Player, League, Defense
from rest_framework import viewsets

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class DefenseViewSet(viewsets.ModelViewSet):
    queryset = Defense.objects.all()
    serializer_class = DefenseSerializer

class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer

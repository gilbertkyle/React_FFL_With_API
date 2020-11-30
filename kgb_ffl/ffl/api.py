from django.conf import settings
from rest_framework import status, viewsets
from django.contrib.auth.hashers import check_password
from django.contrib.auth import get_user_model
import datetime
from rest_framework.decorators import api_view
from .models import League, LeagueYear, Pick, Player, PlayerWeek
from .serializers import CreateLeagueSerializer, LeagueSerializer, LeagueAdminSerializer, PickSerializer, PlayerSerializer, PlayerWeekSerializer, UserSerializer, JoinLeagueSerializer, UpdatePickSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions
from .ffl_settings import *


User = get_user_model()


class AdminRetrievePicksAPI(generics.ListAPIView):
    serializer_class = PickSerializer

    def get_queryset(self):
        user = User.objects.filter(
            username=self.request.query_params.get("username", "")).first()
        league = self.request.query_params.get("league", 0)
        return Pick.objects.filter(user=user, league=league)


class PlayerViewSet(viewsets.ReadOnlyModelViewSet):

    serializer_class = PlayerSerializer

    def get_queryset(self):
        player = self.request.query_params.get("player", "")
        return Player.objects.filter(name__contains=player)


class ListUsersAPI(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        league = self.request.query_params.get("league", 0)
        if not league:
            return User.objects.none()
        return User.objects.filter(leagues=league)


class ListCommishLeaguesAPI(generics.ListAPIView):
    serializer_class = LeagueSerializer

    def get_queryset(self):
        # returns all of the leagues that have the user as a commissioner
        return League.objects.filter(admins=self.request.user)


class ListPicks(generics.ListAPIView):
    """
    Returns all picks for a particular user, league and year
    """
    serializer_class = PickSerializer

    def get_queryset(self):
        """
        If no username is provided in query, returns all picks before that week for league specified
        if username is sent, returns all picks
        week and leagueId are required
        """
        filters = {}
        week = self.request.query_params.get('current_week', 0)
        username = self.request.query_params.get('username', '')
        league_id = self.request.query_params.get('leagueId', 0)
        year = datetime.datetime.now().year
        if username:
            filters['user__username'] = username
        else:
            filters['week__lt'] = week
        filters['league__league__id'] = league_id
        filters['year'] = year
        return Pick.objects.filter(**filters)


class UpdatePicks(generics.RetrieveUpdateAPIView):
    """
        Retrieves or updates a single pick object
        if updating, put pick info in body of request
        if retrieving, put pick.pk in url

        Tested and working as of 6/21
    """
    serializer_class = UpdatePickSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Pick.objects.all()

    def update(self, request, *args, **kwargs):
        pick = Pick.objects.get(id=self.kwargs['id'])
        new_picks = request.data
        pick.qb = new_picks['qb']['name']
        pick.qb_id = new_picks['qb']['id']
        pick.rb = new_picks['rb']['name']
        pick.rb_id = new_picks['rb']['id']
        pick.wr = new_picks['wr']['name']
        pick.wr_id = new_picks['wr']['id']
        pick.te = new_picks['te']['name']
        pick.te_id = new_picks['te']['id']
        pick.defense = new_picks['defense']['name']
        pick.defense_id = new_picks['defense']['id']
        pick.save()
        return Response()

    def partial_update(self, request, *args, **kwargs):
        print("partial update")
        return Response()


class CreateLeagueAPI(generics.CreateAPIView):
    """
        Creates a league and adds the creator to the admin list
    """
    serializer_class = CreateLeagueSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        league = serializer.save()
        current_year = datetime.datetime.now().year
        league_year = LeagueYear()                      # Create a LeagueYear object
        league_year.league = league                     # Assign it to current league
        league_year.save()
        # Success!
        # Now to create all of the pick objects for the creator of the league and attach them to the league year
        user_id = request.data['user_id']
        user = User.objects.get(id=user_id)

        user.is_commissioner = True
        user.save()

        league_year.create_picks(user)
        league.users.add(user)
        league.save()

        return Response({
            'leagues': LeagueSerializer(league, context=self.get_serializer_context()).data
        })


class JoinLeagueAPI(generics.UpdateAPIView):
    serializer_class = LeagueAdminSerializer
    queryset = League.objects.all()

    def update(self, request, *args, **kwargs):
        league = League.objects.get(name=request.data['name'])
        user = User.objects.get(id=request.data['user_id'])
        if check_password(request.data['password'], league.password):
            league.users.add(user)
            year = datetime.datetime.now().year
            league_year = league.years.get(year=year)
            league_year.create_picks(user)
            league.save()
            return Response({
                'leagues': LeagueSerializer(league, context=self.get_serializer_context()).data
            })
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class ListLeagueAPI(generics.ListAPIView):
    serializer_class = LeagueSerializer

    def get_queryset(self):

        user = User.objects.get(username=self.request.query_params['username'])

        if user:
            return user.leagues.all()
        return League.objects.none()


class RetrieveLeagueAPI(generics.RetrieveAPIView):
    serializer_class = LeagueSerializer

    def get_queryset(self):
        id = self.kwargs['pk']
        return League.objects.filter(id=id)


class RetrievePlayerAPI(generics.RetrieveAPIView):
    serializer_class = PlayerSerializer

    def get_object(self):
        return Player.objects.all()[0]
    """
    def get_queryset(self):

        nfl_id = self.kwargs.get('nfl_id', '')
        if nfl_id:
            return Player.objects.get(nfl_id=nfl_id)
        return Player.objects.all()
    """


class ListPlayerAPI(generics.ListAPIView):
    serializer_class = PlayerSerializer

    def get_queryset(self):
        return Player.objects.all()


class ListPlayerWeekAPI(generics.ListAPIView):
    serializer_class = PlayerWeekSerializer

    def get_queryset(self):
        nfl_id = self.kwargs.get('nfl_id', '')
        if nfl_id:
            return Player.objects.get(id=nfl_id).week.all()
        return PlayerWeek.objects.none()


@api_view(['GET'])
def get_current_week(request):
    """
    Gets the current week of the NFL season.
    This should be called when someone goes to the base website
    base_week should be 1 week before the first sunday of the nfl season
    """

    current_week = get_week()
    return Response({
        'current_week': current_week
    })


@api_view(['GET'])
def get_current_year(request):

    current_year = CURRENT_YEAR
    return Response({
        "current_year": current_year
    })


def get_week():
    """
    Returns the current week of the NFL
    Set the base week to 7 days before Week 1 Sunday
    """
    base_week = BASE_DATE
    today = datetime.datetime.now(TIME_ZONE)
    print(TIME_ZONE)
    diff = today - base_week
    current_week = int(diff.days/7) if diff.days >= 0 else 1
    if current_week > NUMBER_OF_WEEKS:
        return NUMBER_OF_WEEKS
    elif current_week < 1:
        return 1
    return current_week

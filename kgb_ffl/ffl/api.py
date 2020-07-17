from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CreateLeagueSerializer, LeagueSerializer, LeagueAdminSerializer, PickSerializer, PlayerSerializer, PlayerWeekSerializer, UserSerializer, JoinLeagueSerializer, UpdatePickSerializer
from .models import League, LeagueYear, Pick, Player, PlayerWeek
from rest_framework.decorators import api_view
import datetime
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from rest_framework import status, viewsets
from ffl import ffl_settings

User = get_user_model()


class PlayerViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Player.objects.all()
    serializer_class = PlayerSerializer


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

    # def perform_update(self, request, *args, **kwargs):


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
            return Player.objects.get(nfl_id=nfl_id).week.all()
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


def get_week():
    """
    Returns the current week of the NFL
    Set the base week to 7 days before Week 1 Sunday
    """
    base_week = ffl_settings.BASE_DATE
    today = datetime.datetime.now()
    diff = today - base_week
    current_week = int(diff.days/7) if diff.days >= 0 else 1
    if current_week > ffl_settings.NUMBER_OF_WEEKS:
        return ffl_settings.NUMBER_OF_WEEKS
    elif current_week < 1:
        return 1
    return current_week

from django.conf import settings
from django.db.models import query
from rest_framework import serializers, status, viewsets
from django.contrib.auth.hashers import check_password
from django.contrib.auth import get_user_model
import datetime
from rest_framework.decorators import api_view
from .models import Invitation, League, LeagueYear, Pick, Player, PlayerWeek, Thread
from .serializers import CreateLeagueSerializer, InvitationSerializer, LeagueSerializer, LeagueAdminSerializer, PickSerializer, PlayerSerializer, PlayerWeekSerializer, UserSerializer, JoinLeagueSerializer, UpdatePickSerializer, ThreadSerializer, CommentSerializer, PlayerDetailSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions
from .ffl_settings import *
from knox.auth import TokenAuthentication
from django.shortcuts import get_object_or_404

User = get_user_model()


class ThreadDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ThreadSerializer
    lookup_field = 'id'
    permission_classes = [
        permissions.IsAuthenticated
    ]


class ThreadAPI(generics.ListCreateAPIView):
    serializer_class = ThreadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        league_id = self.request.query_params.get("league_id", 0)
        if not league_id:
            return Thread.objects.none()
        return Thread.objects.filter(league=League.objects.get(id=league_id)).order_by("-updated_at")


class InvitationAPI(generics.ListCreateAPIView):
    serializer_class = InvitationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        options = {}
        options["receiver"] = self.request.user
        return Invitation.objects.filter(**options)


class AdminRetrievePicksAPI(generics.ListAPIView):
    serializer_class = PickSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        league = self.request.query_params.get("league", 0)
        return Pick.objects.filter(user=self.request.user, league=league)


class PlayerViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PlayerSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        player = self.request.query_params.get("search", "")
        return Player.objects.filter(name__contains=player)


class ListUsersAPI(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        league = self.request.query_params.get("league", 0)
        if not league:
            return User.objects.none()
        return User.objects.filter(leagues=league)


class ListCommishLeaguesAPI(generics.ListAPIView):
    serializer_class = LeagueSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # returns all of the leagues that have the user as a commissioner
        return League.objects.filter(admins=self.request.user)


class ListPicks(generics.ListAPIView):
    """
    Returns all picks for a particular user, league and year
    """
    serializer_class = PickSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        If no username is provided in query, returns all picks before that week for league specified
        if username is sent, returns all picks
        week and leagueId are required
        """
        filters = {}
        week = self.request.query_params.get('current_week', 0)
        username = self.request.user.username
        league_id = self.request.query_params.get('leagueId', 0)
        year = CURRENT_YEAR
        if username:
            filters['user__username'] = username
        # else:
            # filters['week__lt'] = week
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
    permission_classes = [permissions.IsAuthenticated]

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
        return Response(status=200)

    def partial_update(self, request, *args, **kwargs):
        print("Partial Update?")
        return Response(status=200)


class PickViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    pk_url_kwarg = 'id'
    serializer_class = PickSerializer

    def get_queryset(self):
        return Pick.objects.filter(user=self.request.user)

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
        return Response(pick, status=200)

    def destroy(self, request, pk=None):
        response = {'message': 'Delete function is not offered in this path.'}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class PlayerViewSet(viewsets.ModelViewSet):
    serializer_class = PlayerDetailSerializer
    pk_url_kwarg = 'id'

    def get_queryset(self):
        name = self.request.query_params.get("search", "")
        if not name:
            return Player.objects.none()
        queryset = Player.objects.filter(name__contains=name)
        return queryset

    def get_object(self, *args, **kwargs):
        id = self.kwargs.get('pk', 0)
        if not id:
            return Player.objects.none()
        player = Player.objects.get(id=id)
        return player

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = PlayerDetailSerializer(instance)
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        serializer = PlayerSerializer(page, many=True)
        return Response(serializer.data)

    def update(self, request, pk=None):
        response = {'message': 'Update function is not offered in this path.'}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def partial_update(self, request, pk=None):
        response = {'message': 'Update function is not offered in this path.'}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, pk=None):
        response = {'message': 'Delete function is not offered in this path.'}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class LeagueViewSet(viewsets.ModelViewSet):
    serializer_class = LeagueSerializer
    queryset = League.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    pk_url_kwarg = 'id'

    def create(self, request, *args, **kwargs):
        serializer = CreateLeagueSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        league = serializer.save()
        league_year = LeagueYear()                      # Create a LeagueYear object
        league_year.league = league                     # Assign it to current league
        league_year.save()
        # Success!
        # Now to create all of the pick objects for the creator of the league and attach them to the league year
        user = self.request.user

        user.is_commissioner = True
        user.save()

        league_year.create_picks(user)
        league.users.add(user)
        league.save()

        return Response({
            'leagues': LeagueSerializer(league, context=self.get_serializer_context()).data
        })

    def retrieve(self, request, *args, **kwargs):
        obj = self.get_object()
        serializer = self.get_serializer(obj)
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        if request.user:
            queryset = self.get_queryset()
            queryset = queryset.filter(users=request.user)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        return League.objects.none()

    def update(self, request, *args, **kwargs):
        league = League.objects.get(name=request.data['name'])
        user = request.user
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
            return Response({'message': 'Password does not match'}, status=status.HTTP_401_UNAUTHORIZED)


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
    diff = today - base_week
    current_week = int(diff.days/7) if diff.days >= 0 else 1
    if current_week > NUMBER_OF_WEEKS:
        return NUMBER_OF_WEEKS
    elif current_week < 1:
        return 1
    return current_week

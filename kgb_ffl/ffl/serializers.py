from rest_framework import serializers
import rest_framework
from .models import Comment, Invitation, Thread, User, Player, League, Defense, Pick, PlayerWeek
from django.contrib.auth.hashers import make_password
from django.conf import settings
from rest_framework.fields import CurrentUserDefault


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'pk']


class LeagueSerializer(serializers.ModelSerializer):
    admins = UserSerializer(many=True, required=False)
    users = UserSerializer(many=True, required=False)

    class Meta:
        model = League
        fields = ['id', 'name', 'password', 'admins', 'users']
        read_only_fields = ['id']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        league = League.objects.create(
            name=validated_data['name'],
            password=make_password(validated_data['password'])
        )
        league.save()
        league.admins.add(User.objects.get(pk=validated_data['user_id']))
        league.save()
        return league


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class ThreadSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, required=False)

    class Meta:
        model = Thread
        fields = '__all__'


class InvitationSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    league = LeagueSerializer()

    class Meta:
        model = Invitation
        fields = '__all__'


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name', 'team', 'position']


class FilteredWeekSerializer(serializers.ListSerializer):
    """
        Filters the foreign key fields of playerweeks by year, when a Player object is queried
    """

    def to_representation(self, data):
        data = data.filter(year=settings.CURRENT_YEAR)
        return super(FilteredWeekSerializer, self).to_representation(data)


class PlayerWeekSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerWeek
        fields = '__all__'
        list_serializer_class = FilteredWeekSerializer  # See above


class PlayerDetailSerializer(serializers.ModelSerializer):
    # See FilteredWeekSerializer ^
    weeks = FilteredWeekSerializer(child=PlayerWeekSerializer())

    class Meta:
        model = Player
        fields = ['id', 'name', 'team', 'position', 'weeks']
        depth = 1


class DefenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defense
        fields = ['team']


class UpdatePickSerializer(serializers.Serializer):
    qb = PlayerSerializer()
    rb = PlayerSerializer()
    wr = PlayerSerializer()
    te = PlayerSerializer()
    defense = PlayerSerializer()


class PickSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Pick
        fields = '__all__'
        depth = 1


class LeagueAdminSerializer(serializers.Serializer):
    name = serializers.CharField()
    password = serializers.CharField()
    user_id = serializers.IntegerField(required=False)

    def create(self, validated_data):
        league = League.objects.create(
            name=validated_data['name'],
            password=make_password(validated_data['password'])
        )
        league.save()
        league.admins.add(User.objects.get(pk=validated_data['user_id']))
        league.save()
        return league

    def validate(self, data):
        """
        try:
            data['admins'] = data['admins']
        except:
            raise serializers.ValidationError(
                "Value can not be converted to int")
        """
        return data


class CreateLeagueSerializer(serializers.ModelSerializer):

    class Meta:
        model = League
        fields = ['name', 'password', 'is_private']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        hashed_password = make_password(validated_data['password'])
        league = League.objects.create(
            name=validated_data['name'],
            password=hashed_password,
            is_private=validated_data.get('is_private', False)
        )
        league.save()
        return league

    def validate_password(self, value):
        return value


class JoinLeagueSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()

    class Meta:
        model = League
        fields = ['name', 'password', 'user_id']

from rest_framework import serializers
from ffl.models import User, Player, League, Defense, Pick, PlayerWeek
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'pk']


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['nfl_id', 'name', 'team', 'position']
        depth = 1


class PlayerWeekSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerWeek
        fields = '__all__'
        depth = 1


class DefenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defense
        fields = ['team']


class UpdatePickSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pick
        fields = "__all__"
        depth = 1


class PickSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Pick
        fields = '__all__'
        depth = 1


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
        print(validated_data)
        league.admins.add(User.objects.get(pk=validated_data['user_id']))
        league.save()
        return league


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
        print(validated_data)
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
    user_id = serializers.IntegerField()

    class Meta:
        model = League
        fields = ['name', 'password', 'user_id']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        hashed_password = make_password(validated_data['password'])
        league = League.objects.create(
            name=validated_data['name'],
            password=hashed_password
        )
        league.admins.add(User.objects.get(pk=validated_data['user_id']))
        league.save()
        return league

    def validate_password(self, value):
        return value


class JoinLeagueSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()

    class Meta:
        model = League
        fields = ['name', 'password', 'user_id']

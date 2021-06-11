from django.db import models
from django.contrib.auth import get_user_model
import datetime
from django.db.models import constraints
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.db.models.fields import related
User = get_user_model()

# Create your models here.


class Thread(models.Model):
    title = models.CharField(max_length=280, blank=False, null=False)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField('Created at', auto_now_add=True)


class Comment(models.Model):
    body = models.TextField()
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    created_at = models.DateTimeField('Created at', auto_now_add=True)


class Invitation(models.Model):
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='receiver')
    body = models.CharField(max_length=280)
    created_at = models.DateTimeField('Created at', auto_now_add=True)
    league = models.ForeignKey('League', on_delete=models.CASCADE)

    def complete(self):
        self.league.add_user(self.receiver)

    class Meta:
        # prevents commissioners from inviting the same user more than once
        constraints = [
            models.UniqueConstraint(
                fields=['receiver', 'league'], name="unique_league_invite")
        ]


class LeagueProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    league = models.OneToOneField("League", on_delete=models.CASCADE)
    team_name = models.CharField(max_length=40, null=True, default="")

    def __str__(self):
        return self.team_name


class League(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True, unique=True)
    password = models.CharField(max_length=150, null=True, blank=True)
    admins = models.ManyToManyField(User, blank=True)

    def __str__(self):
        return self.name

    def add_user(self, user):
        self.users.add(user)
        league_year = self.years.get(year=datetime.datetime.now().year)
        league_year.create_picks(user)
        league_year.save()
        self.save()


"""
    signal for when Leagues are created
"""


@receiver(post_save, sender=League)
def create_league_year(sender, instance, created, **kwargs):
    if created:
        league_year, new = LeagueYear.objects.get_or_create(league=instance)


class LeagueYear(models.Model):
    league = models.ForeignKey(
        'League', related_name='years', on_delete=models.CASCADE)
    year = models.IntegerField(default=datetime.datetime.now().year)

    def __str__(self):
        return f"{self.league.name}, Year: {self.year}"

    def create_picks(self, user):

        for i in range(1, 18):
            pick = Pick.objects.create()
            pick.week = i
            pick.user = user
            pick.league = self
            pick.save()


class Pick(models.Model):
    user = models.ForeignKey(User, related_name="picks",
                             null=True, on_delete=models.CASCADE)
    league = models.ForeignKey(
        LeagueYear, related_name="picks", null=True, on_delete=models.CASCADE)

    week = models.IntegerField(default=1)
    year = models.IntegerField(default=datetime.date.today().year)

    qb = models.CharField("Quarterback", max_length=25)
    qb_id = models.CharField(
        default="", max_length=20, blank=True, null=True)
    qb_points = models.FloatField(default=0.0)

    rb = models.CharField("Running back", max_length=25)
    rb_id = models.CharField(
        default="", max_length=20, blank=True, null=True)
    rb_points = models.FloatField(default=0.0)

    wr = models.CharField("Wide receiver", max_length=25)
    wr_id = models.CharField(
        default="", max_length=20, blank=True, null=True)
    wr_points = models.FloatField(default=0.0)

    te = models.CharField("Tight end", max_length=25)
    te_id = models.CharField(
        default="", max_length=20, blank=True, null=True)
    te_points = models.FloatField(default=0.0)

    defense = models.CharField("Defense", max_length=25)
    defense_id = models.CharField(
        default="", max_length=20, blank=True, null=True)
    def_points = models.FloatField(default=0.0)

    total_points = models.FloatField(default=0.0)

    pick_time = models.DateTimeField('Date Picked', auto_now_add=True)

    def __str__(self):
        return f"{self.user}, League: {self.league}, Week {self.week}"

    def save(self, *args, **kwargs):
        self.total_points = (
            self.qb_points +
            self.rb_points +
            self.wr_points +
            self.te_points +
            self.def_points
        )
        super(Pick, self).save(*args, **kwargs)

    def iter_positions(self):
        return [
            (self.qb_id, self.qb, self.qb_points),
            (self.rb_id, self.rb, self.rb_points),
            (self.wr_id, self.wr, self.wr_points),
            (self.te_id, self.te, self.te_points),
            (self.defense_id, self.defense, self.def_points)
        ]


class Player(models.Model):
    id = models.CharField('id', max_length=10,
                          unique=True, primary_key=True)
    name = models.CharField('Name', max_length=30)
    position = models.CharField('Position', max_length=5, default="")
    team = models.CharField('Team', max_length=5, default="")

    def __str__(self):
        return self.name


class PlayerWeek(models.Model):
    player = models.ForeignKey(
        Player, to_field="id", on_delete=models.CASCADE, related_name="weeks", null=False)
    year = models.IntegerField("Year")
    week = models.IntegerField("Week")
    points = models.FloatField("Points", default=0.0)

    # these fields not in use as of 9/1/2020, but won't be deleted in case I use them later
    passing_yds = models.IntegerField("Passing Yards", default=0)
    passing_tds = models.IntegerField("Passing Touchdowns", default=0)
    passing_ints = models.IntegerField("Passing Interceptions", default=0)
    rushing_yds = models.IntegerField("Rushing Yards", default=0)
    rushing_tds = models.IntegerField("Rushing Touchdowns", default=0)
    receiving_yds = models.IntegerField("Receiving Yards", default=0)
    receiving_tds = models.IntegerField("Receiving Touchdowns", default=0)
    kick_ret_tds = models.IntegerField("Kick Return Touchdowns", default=0)
    two_point_conversions = models.IntegerField(
        "Two Point Conversions", default=0)
    fumbles_lost = models.IntegerField("Fumbles Lost", default=0)
    fumbles_rec_tds = models.IntegerField(
        "Fumble Recovery Touchdowns", default=0)

    def __str__(self):
        return f"{self.player.name}, week {self.week}, {self.year}"


# Not in use anymore, since nfldfs gives points to defenses without me having to calculate it
class Defense(models.Model):
    team = models.CharField("Team Name", max_length=5)
    verbose_name = models.CharField("Verbose Name", max_length=50, default="")

    def __str__(self):
        return self.team


class DefenseWeek(models.Model):
    team = models.ForeignKey(
        "Defense", on_delete=models.CASCADE, related_name="week")
    week = models.IntegerField("Week")
    year = models.IntegerField("Year")
    points_allowed = models.IntegerField("Points Allowed")
    sacks = models.IntegerField("Sacks")
    interceptions = models.IntegerField("Interceptions")
    safeties = models.IntegerField("Safeties")
    fumble_recoveries = models.IntegerField("Fumble Recoveries")
    defensive_touchdowns = models.IntegerField("Defensive Touchdowns")
    extra_point_blocks = models.IntegerField("Extra Point Blocks")
    kick_return_touchdowns = models.IntegerField("Kick Return Touchdowns")
    punt_return_touchdowns = models.IntegerField("Punt Return Touchdowns")
    fantasy_points = models.FloatField("Fantasy Points", default=0.0)

    def __str__(self):
        return f'{self.team.team}, week {str(self.week)}'

from django.core.management.base import BaseCommand, CommandError
from ffl.ffl_settings import CURRENT_YEAR, get_week
from nfldfs import games as games
from ffl.models import Player, Pick, PlayerWeek


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('year', type=int, help="Current season of NFL")
        parser.add_argument(
            'week', type=int, help="Current week of NFL season")

    def handle(self, *args, **kwargs):
        year = kwargs['year']
        week = kwargs['week']
        self.stdout.write(f"Year: {year}, Week: {week}")

        self.update_players(week, year)
        self.update_picks(week, year)

    def update_players(self, week, year):

        g = games.find_games('yh', year, week)
        stats = games.get_game_data(g)

        for row in stats.itertuples():
            player, created = Player.objects.get_or_create(
                id=row.Index, defaults={
                    "name": row.player_name,
                    "position": row.position,
                    "team": row.team_name
                }
            )

            player_week, created = PlayerWeek.objects.update_or_create(
                player=player,
                week=week,
                year=year,
                defaults={
                    "points": row.points
                }
            )

    def update_picks(self, week, year):
        picks = Pick.objects.filter(week=week, year=year)

        for pick in picks:
            try:
                qb = Player.objects.get(id=pick.qb_id).weeks.get(
                    week=week, year=year)
                pick.qb_points = qb.points
            except PlayerWeek.DoesNotExist:
                pick.qb_points = 0
            except Player.DoesNotExist:
                print(pick)
            try:
                rb = Player.objects.get(id=pick.rb_id).weeks.get(
                    week=week, year=year)
                pick.rb_points = rb.points
            except PlayerWeek.DoesNotExist:
                pick.rb_points = 0
            except Player.DoesNotExist:
                print(pick)
            try:
                wr = Player.objects.get(id=pick.wr_id).weeks.get(
                    week=week, year=year)
                pick.wr_points = wr.points
            except PlayerWeek.DoesNotExist:
                pick.wr_points = 0
            except Player.DoesNotExist:
                print(pick)
            try:
                te = Player.objects.get(id=pick.te_id).weeks.get(
                    week=week, year=year)
                pick.te_points = te.points
            except PlayerWeek.DoesNotExist:
                pick.te_points = 0
            except Player.DoesNotExist:
                print(pick)
            try:
                defense = Player.objects.get(id=pick.defense_id).weeks.get(
                    week=week, year=year)
                pick.def_points = defense.points
            except PlayerWeek.DoesNotExist:
                pick.def_points = 0
            except Player.DoesNotExist:
                print(pick)
            pick.save()

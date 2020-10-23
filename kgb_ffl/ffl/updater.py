from nfldfs import games as games
from .models import Player, PlayerWeek, Pick
from .ffl_settings import CURRENT_YEAR, get_week
from django.conf import settings


class Updater():
    def __init__(self, week, year):
        self.week = week
        self.year = year

    def update(self):
        g = games.find_games('yh', self.year, self.week)
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
                week=self.week,
                year=self.year,
                defaults={
                    "points": row.points
                }
            )

    def update_picks(self):
        picks = Pick.objects.filter(week=self.week, year=self.year)

        for pick in picks:
            try:
                qb = Player.objects.get(id=pick.qb_id).weeks.get(
                    week=self.week, year=self.year)
                pick.qb_points = qb.points
            except PlayerWeek.DoesNotExist:
                pick.qb_points = 0
            try:
                rb = Player.objects.get(id=pick.rb_id).weeks.get(
                    week=self.week, year=self.year)
                pick.rb_points = rb.points
            except PlayerWeek.DoesNotExist:
                pick.rb_points = 0
            try:
                wr = Player.objects.get(id=pick.wr_id).weeks.get(
                    week=self.week, year=self.year)
                pick.wr_points = wr.points
            except PlayerWeek.DoesNotExist:
                pick.wr_points = 0
            try:
                te = Player.objects.get(id=pick.te_id).weeks.get(
                    week=self.week, year=self.year)
                pick.te_points = te.points
            except PlayerWeek.DoesNotExist:
                pick.te_points = 0
            try:
                defense = Player.objects.get(id=pick.defense_id).weeks.get(
                    week=self.week, year=self.year)
                pick.def_points = defense.points
            except PlayerWeek.DoesNotExist:
                pick.def_points = 0
        pick.save()


if __name__ == "__main__":
    # settings.configure(DEBUG=True)
    current_week = get_current_week()
    updater = Updater(current_week, CURRENT_YEAR)
    updater.update()

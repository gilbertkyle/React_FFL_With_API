from nfldfs import games as games
from .models import Player, PlayerWeek


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


if __name__ == "__main__":
    updater = Updater(1, 2019)
    updater.update()

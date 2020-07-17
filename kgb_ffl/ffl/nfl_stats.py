import nflgame
import datetime
from django.db.models import Max
from collections import Counter
from .models import *



def current_week():
    base_week = datetime.datetime(2019, 9, 1, 10, 0, 0)
    today = datetime.datetime.now()
    diff = today - base_week
    current_week = int(diff.days/7) if diff.days >= 0 else 1
    return current_week

if __name__ == "__main__":
    for i in range(18):
        updater = Updater(week=i, year=2019)
        updater.update()


class Updater:
    """
    The class that pulls data using nflgame and calculates the scoring
    for everyones picks
    """
    


    def __init__(self, year=datetime.datetime.now().year, week=current_week()-1):
        self.week = week
        self.year = year
        self.games = nflgame.games(self.year, week=self.week)
        self.players = nflgame.combine_max_stats(self.games)

    def update(self):
        self.create_players()
        self.insert_players()
        self.get_defense()
        self.get_defense_week()
        self.update_points()

    def calc_offensive_points(self, my_player, scoring, **kwargs):

        fantasy_points = (
            my_player.passing_yds * scoring["passing_yds"] +
            my_player.passing_tds * scoring["passing_tds"] +
            my_player.passing_ints * scoring["passing_ints"] +
            my_player.rushing_yds * scoring["rushing_yds"] +
            my_player.rushing_tds * scoring["rushing_tds"] +
            my_player.receiving_yds * scoring["receiving_yds"] +
            my_player.receiving_tds * scoring["receiving_tds"] +
            my_player.kick_ret_tds * scoring["kickret_tds"] +
            my_player.two_point_conversions * scoring["two_point_conversions"] +
            my_player.fumbles_lost * scoring["fumbles_lost"] +
            my_player.fumbles_rec_tds * scoring["fumbles_rec_tds"]
            )
        return fantasy_points

    def calc_defensive_points(self, team, scoring, **kwargs):
        fantasy_points = 0.0
        try:
            defense = Defense.objects.get(team=team).week.get(year=self.year, week=self.week)
            points_allowed = defense.points_allowed
        except:
            print("Couldn't get team week")
            return 0


        fantasy_points += defense.sacks * scoring["sacks"]
        fantasy_points += defense.interceptions * scoring["interceptions"]
        fantasy_points += defense.safeties * scoring["safeties"]
        fantasy_points += defense.fumble_recoveries * scoring["fumble_recoveries"]
        fantasy_points += defense.defensive_touchdowns * scoring["defensive_touchdowns"]
        fantasy_points += defense.extra_point_blocks * scoring["extra_point_blocks"]
        fantasy_points += defense.kick_return_touchdowns * scoring["kick_return_touchdowns"]
        fantasy_points += defense.punt_return_touchdowns * scoring["punt_return_touchdowns"]

        if defense.points_allowed == 0:
            fantasy_points += 10
        elif defense.points_allowed < 7:
            fantasy_points += 7
        elif defense.points_allowed < 14:
            fantasy_points += 4
        elif defense.points_allowed < 21:
            fantasy_points += 1
        elif defense.points_allowed < 28:
            fantasy_points += 0
        elif defense.points_allowed < 35:
            fantasy_points += -1
        else:
            fantasy_points += -4

        return fantasy_points


    def calc_fantasy_points(self, pick, scoring):
        """
        TODO
        Clean up this fucking mess of a function.
        Also don't put it on resume
        """

        try:
            if pick.qb_id:
                qb = Player.objects.get(nfl_id=pick.qb_id).week.get(year=self.year, week=self.week)
                pick.qb_points = self.calc_offensive_points(qb, scoring)
            else:
                players = Player.objects.filter(name=pick.qb)
                weekly_points = []
                for player in players:
                    try:
                        week = player.week.get(year=self.year, week=self.week)
                        weekly_points.append(self.calc_offensive_points(week, scoring))
                    except PlayerWeek.DoesNotExist:
                        continue
                if weekly_points:
                    pick.qb_points = max(weekly_points)
                else:
                    pick.qb_points = 0
            pick.save()

        except Player.DoesNotExist:
            print(f"Could not get player.  {pick.user.username}, {pick.league.name}, week {self.week}, {pick.qb}")

        except PlayerWeek.DoesNotExist:
            print(f"Could not get playerweek.  {pick.user.username}, {pick.league.name}, week {self.week}")


        try:
            if pick.rb_id:
                rb = Player.objects.get(nfl_id=pick.id).week.get(year=self.year, week=self.week)
                pick.rb_points = self.calc_offensive_points(rb, scoring)
            else:
                players = Player.objects.filter(name=pick.rb)
                weekly_points = []
                for player in players:
                    try:
                        week = player.week.get(year=self.year, week=self.week)
                        weekly_points.append(self.calc_offensive_points(week, scoring))
                    except PlayerWeek.DoesNotExist:
                        continue
                if weekly_points:
                    pick.rb_points = max(weekly_points)
                else:
                    pick.rb_points = 0
            pick.save()

        except Player.DoesNotExist:
            print(f"Could not get player.  {pick.user.username}, {pick.league.name}, week {self.week}")

        except PlayerWeek.DoesNotExist:
            print(f"Could not get playerweek.  {pick.user.username}, {pick.league.name}, week {self.week}")


        try:
            if pick.wr_id:
                wr = Player.objects.get(nfl_id=pick.wr_id).week.get(year=self.year, week=self.week)
                pick.wr_points = self.calc_offensive_points(wr, scoring)
            else:
                players = Player.objects.filter(name=pick.wr)
                weekly_points = []
                for player in players:
                    try:
                        week = player.week.get(year=self.year, week=self.week)
                        weekly_points.append(self.calc_offensive_points(week, scoring))
                    except PlayerWeek.DoesNotExist:
                        continue
                if weekly_points:
                    pick.wr_points = max(weekly_points)
                else:
                    pick.wr_points = 0
            pick.save()

        except Player.DoesNotExist:
            print(f"Could not get player.  {pick.user.username}, {pick.league.name}, week {self.week}")

        except PlayerWeek.DoesNotExist:
            print(f"Could not get playerweek.  {pick.user.username}, {pick.league.name}, week {self.week}")


        try:
            if pick.te_id:
                te = Player.objects.get(nfl_id=pick.te_id).week.get(year=self.year, week=self.week)
                pick.te_points = self.calc_offensive_points(te, scoring)
            else:
                players = Player.objects.filter(name=pick.te)
                weekly_points = []
                for player in players:
                    try:
                        week = player.week.get(year=self.year, week=self.week)
                        weekly_points.append(self.calc_offensive_points(week, scoring))
                    except PlayerWeek.DoesNotExist:
                        continue
                if weekly_points:
                    pick.te_points = max(weekly_points)
                else:
                    pick.te_points = 0
            pick.save()


        except Player.DoesNotExist:
            print(f"Could not get player.  {pick.user.username}, {pick.league.name}, week {self.week}")

        except PlayerWeek.DoesNotExist:
            print(f"Could not get playerweek.  {pick.user.username}, {pick.league.name}, week {self.week}")


        pick.def_points = self.calc_defensive_points(pick.defense, scoring)

        pick.total_points = pick.qb_points + pick.rb_points + pick.wr_points + pick.te_points + pick.def_points
        pick.save()

    def update_points(self):
        """
        Used to update all pick objects with fantasy points
        """
        leagues = League.objects.all()
        for league in leagues:
            # Gets all the scoring values for the league
            league_fields = [field.name for field in league._meta.fields]
            scoring = {}
            bad_fields = ["name", "year", "password", "id"]
            for field in bad_fields:
                league_fields.remove(field)
            for field in league_fields:
                scoring[field] = getattr(league, field, 0)
            picks = Pick.objects.filter(league=league, year=self.year, week=self.week)
            """
            for key, value in scoring.items():
                print(f"{key}, {value}")
            """
            for pick in picks:
                self.calc_fantasy_points(pick, scoring)



    def create_players(self):
        players_updated = 0
        players_created = 0
        for player in self.players:

            fantasy_points = self.player_fantasy_points(player)
            two_point_conversions = player.receiving_twoptm + player.rushing_twoptm + player.passing_twoptm

            obj, created = Player.objects.update_or_create(
                nfl_id = player.playerid,
                defaults = {
                    "name": str(getattr(player, "name", "NA")),
                    "position": str(getattr(player.player, "position", "NA")),
                    "team": str(getattr(player, "team", "NA")),
                    }
                )
            if created:
                players_created += 1
            else:
                players_updated += 1

        print(f"Players created: {players_created}\nPlayers updated: {players_updated}")


    def insert_players(self):

        for player in self.players:

            two_point_conversions = (
                player.receiving_twoptm +
                player.rushing_twoptm +
                player.passing_twoptm
                )

            obj, created = PlayerWeek.objects.update_or_create(
                player = Player.objects.get(nfl_id=player.playerid),
                year = self.year,
                week = self.week,
                defaults={
                    "passing_yds": getattr(player, "passing_yds", 0),
                    "passing_tds": getattr(player, "passing_tds", 0),
                    "passing_ints": getattr(player, "passing_ints", 0),
                    "rushing_yds": getattr(player, "rushing_yds", 0),
                    "rushing_tds": getattr(player, "rushing_tds", 0),
                    "receiving_yds": getattr(player, "receiving_yds", 0),
                    "receiving_tds": getattr(player, "receiving_tds", 0),
                    "kick_ret_tds": getattr(player, "kick_ret_tds", 0),
                    "two_point_conversions": two_point_conversions,
                    "fumbles_lost": getattr(player, "fumbles_lost", 0),
                    "fumbles_rec_tds": getattr(player, "fumbles_rec_tds", 0),
                    }
                )


    def get_defense(self):

        for game in self.games:

            obj, created = Defense.objects.get_or_create(
                team=game.away
                )

            obj, created = Defense.objects.get_or_create(
                team=game.home
                )

    def get_defense_week(self):

        for game in self.games:

            game_data = Counter()

            game_data["home_points_allowed"] = game.score_away
            game_data["away_points_allowed"] = game.score_home


            for player in self.players.filter(team=game.away):
                game_data["away_sacks"] += player.defense_sk
                game_data["away_ints"] += player.defense_int
                game_data["away_safeties"] += player.defense_safe
                game_data["away_fumble_recs"] += player.fumbles_trcv
                game_data["away_defense_tds"] += player.defense_tds
                game_data["away_xtra_pt_blocks"] += player.defense_xpblk
                game_data["away_kickret_tds"] += player.kickret_tds
                game_data["away_puntret_tds"] += player.puntret_tds

            for player in self.players.filter(team=game.home):
                game_data["home_sacks"] += player.defense_sk
                game_data["home_ints"] += player.defense_int
                game_data["home_safeties"] += player.defense_safe
                game_data["home_fumble_recs"] += player.fumbles_trcv
                game_data["home_defense_tds"] += player.defense_tds
                game_data["home_xtra_pt_blocks"] += player.defense_xpblk
                game_data["home_kickret_tds"] += player.kickret_tds
                game_data["home_puntret_tds"] += player.puntret_tds

            obj, created = DefenseWeek.objects.update_or_create(
                    team = Defense.objects.get(team=game.away),
                    week = self.week,
                    year = self.year,
                    defaults = {
                        "points_allowed": game_data["away_points_allowed"],
                        "sacks": game_data["away_sacks"],
                        "interceptions": game_data["away_ints"],
                        "safeties": game_data["away_safeties"],
                        "fumble_recoveries":  game_data["away_fumble_recs"],
                        "defensive_touchdowns": game_data["away_defense_tds"],
                        "extra_point_blocks": game_data["away_xtra_pt_blocks"],
                        "kick_return_touchdowns": game_data["away_kickret_tds"],
                        "punt_return_touchdowns": game_data["away_puntret_tds"],
                    }
                )

            obj, created = DefenseWeek.objects.update_or_create(
                    team = Defense.objects.get(team=game.home),
                    week = self.week,
                    year = self.year,
                    defaults = {
                        "points_allowed": game_data["home_points_allowed"],
                        "sacks": game_data["home_sacks"],
                        "interceptions": game_data["home_ints"],
                        "safeties": game_data["home_safeties"],
                        "fumble_recoveries":  game_data["home_fumble_recs"],
                        "defensive_touchdowns": game_data["home_defense_tds"],
                        "extra_point_blocks": game_data["home_xtra_pt_blocks"],
                        "kick_return_touchdowns": game_data["home_kickret_tds"],
                        "punt_return_touchdowns": game_data["home_puntret_tds"],
                    }
                )


    def insert_weekly_stats(self):
        """
        Deprecated, use create_players() and insert_players() instead
        """

        for player in self.players:

            fantasy_points = self.player_fantasy_points(player)
            two_point_conversions = player.receiving_twoptm + player.rushing_twoptm + player.passing_twoptm
            try:
                player_position = player.player.pos
            except:
                player_position = str(getattr(player, "pos", "NA"))

            data = ({"name": str(getattr(player, "name", "")),
                    "year": self.year,
                    "week": self.week,
                    "position": player_position,
                    "fantasy_points": fantasy_points,
                    "passing_yds": getattr(player, "passing_yds", 0),
                    "passing_tds": getattr(player, "passing_tds", 0),
                    "passing_int": getattr(player, "passing_ints", 0),
                    "rushing_yds": getattr(player, "rushing_yds", 0),
                    "rushing_tds": getattr(player, "rushing_tds", 0),
                    "receiving_yds": getattr(player, "receiving_yds", 0),
                    "receiving_tds": getattr(player, "receiving_tds", 0),
                    "kick_ret_tds": getattr(player, "kick_ret_tds", 0),
                    "two_point_conversions": two_point_conversions,
                    "fumbles_lost": getattr(player, "fumbles_lost", 0),
                    "fumbles_rec_tds": getattr(player, "fumbles_rec_tds", 0)
                    })

            my_insert = text("""INSERT INTO FFL_player(name, year, week, position, fantasy_points, passing_yds, passing_tds, passing_int, rushing_yds, rushing_tds, receiving_yds, receiving_tds, kickret_tds, two_point_conversions, fumbles_lost, fumbles_rec_tds)
                    VALUES (:name, :year, :week, :position, :fantasy_points, :passing_yds, :passing_tds, :passing_int, :rushing_yds, :rushing_tds, :receiving_yds, :receiving_tds, :kick_ret_tds, :two_point_conversions, :fumbles_lost, :fumbles_rec_tds)""")
            self.connection.execute(my_insert, **data)


    def get_defense_scores(self):
        """
        Deprecated, use get_defense_week instead
        """
        for game in self.games:
            home_team = game.home
            away_team = game.away

            home_points = 0
            away_points = 0

            home_points_allowed = game.score_away
            away_points_allowed = game.score_home

            if home_points_allowed == 0:
                home_points += 10
            elif home_points_allowed < 7:
                home_points += 7
            elif home_points_allowed < 14:
                home_points += 4
            elif home_points_allowed < 21:
                home_points += 1
            elif home_points_allowed < 28:
                home_points += 0
            elif home_points_allowed < 35:
                home_points -= 1
            else:
                home_points -= 4

            if away_points_allowed == 0:
                away_points += 10
            elif away_points_allowed > 0 and away_points_allowed < 7:
                away_points += 7
            elif away_points_allowed > 6 and away_points_allowed < 14:
                away_points += 4
            elif away_points_allowed > 13 and away_points_allowed < 21:
                away_points += 1
            elif away_points_allowed > 20 and away_points_allowed < 28:
                away_points -= 0
            elif away_points_allowed > 27 and away_points_allowed < 35:
                away_points -= 1
            else:
                away_points -= 4

            home_sacks, home_ints, home_safeties, home_fumble_recs, home_defense_tds, home_xtra_pt_blocks, home_kickret_tds, home_puntret_tds = (0,0,0,0,0,0,0,0)
            away_sacks, away_ints, away_safeties, away_fumble_recs, away_defense_tds, away_xtra_pt_blocks, away_kickret_tds, away_puntret_tds = (0,0,0,0,0,0,0,0)

            for player in self.players.filter(team=home_team):
                home_points += (player.defense_sk * NFL_Updater.DEFENSE_SACK_POINTS +             # defensive sacks
                                player.defense_int * NFL_Updater.DEFENSE_INT_POINTS +        # defensive interceptions
                                player.defense_safe * NFL_Updater.DEFENSE_SAFETY_POINTS +       # defensive safeties
                                player.fumbles_trcv * NFL_Updater.DEFENSE_FUMBLE_REC_POINTS +       # defense fumble recoveries
                                player.defense_tds * NFL_Updater.DEFENSE_TOUCHDOWN_POINTS +        # defense touchdowns
                                player.defense_xpblk * NFL_Updater.DEFENSE_EXTRA_POINT_BLOCK_POINTS +      # defense extra point blocks
                                player.kickret_tds * NFL_Updater.DEFENSE_KICK_RET_TD_POINTS +        # kick return touchdowns
                                player.puntret_tds * NFL_Updater.DEFENSE_PUNT_RETURN_TD_POINTS)         # punt return touchdowns

                home_sacks += player.defense_sk
                home_ints += player.defense_int
                home_safeties += player.defense_safe
                home_fumble_recs += player.fumbles_trcv
                home_defense_tds += player.defense_tds
                home_xtra_pt_blocks += player.defense_xpblk
                home_kickret_tds += player.kickret_tds
                home_puntret_tds += player.puntret_tds

            for player in self.players.filter(team=away_team):
                away_points += (player.defense_sk * NFL_Updater.DEFENSE_SACK_POINTS+
                                player.defense_int * NFL_Updater.DEFENSE_INT_POINTS +
                                player.defense_safe * NFL_Updater.DEFENSE_SAFETY_POINTS +
                                player.fumbles_trcv * NFL_Updater.DEFENSE_FUMBLE_REC_POINTS +
                                player.defense_tds * NFL_Updater.DEFENSE_TOUCHDOWN_POINTS +
                                player.defense_xpblk * NFL_Updater.DFENSE_EXTRA_POINT_BLOCK_POINTS +
                                player.kickret_tds * NFL_Updater.DEFENSE_KICK_RET_TD_POINTS +
                                player.puntret_tds * NFL_Updater.DEFENSE_PUNT_RETURN_TD_POINTS)

                away_sacks += player.defense_sk
                away_ints += player.defense_int
                away_safeties += player.defense_safe
                away_fumble_recs += player.fumbles_trcv
                away_defense_tds += player.defense_tds
                away_xtra_pt_blocks += player.defense_xpblk
                away_kickret_tds += player.kickret_tds
                away_puntret_tds += player.puntret_tds

            home_params = ({
                "team": home_team,
                "week": self.week,
                "year": self.year,
                "points_allowed": game.score_home,
                "sacks": home_sacks,
                "fantasy_points": home_points
                })
            away_params = ({
                "team": away_team,
                "week": self.week,
                "year": self.year,
                "points_allowed": game.score_away,
                "fantasy_points": away_points
                })


            my_insert = text("""INSERT INTO FFL_defense (team, week, year, points_allowed, fantasy_points)
                                VALUES (:team, :week, :year, :points_allowed, :fantasy_points)""")

            self.connection.execute(my_insert, **home_params)
            self.connection.execute(my_insert, **away_params)



    def get_all_stats(self):
        """
        Deprecated.
        """

        delete_params = ({
                "week": self.week,
                "year": self.year
                })
        delete_players = text("DELETE FROM FFL_player WHERE week=:week AND year=:year")
        delete_defenses = text("DELETE FROM FFL_defense WHERE week=:week AND year=:year")

        self.connection.execute(delete_players, **delete_params)
        self.connection.execute(delete_defenses, **delete_params)

        self.insert_week_stats()
        self.get_defense_scores()
        return

    def player_fantasy_points(self, player):
        """
        Deprecated.
        """
        fantasy_points = (
                            (player.passing_yds*.04) +
                            (player.passing_tds*4) -
                            (player.passing_int) +
                            (player.rushing_yds*.1) +
                            (player.rushing_tds*6) +
                            (player.receiving_yds*.1) +
                            (player.kickret_tds*6) +
                            (player.receiving_tds*6) +
                            ((player.receiving_twoptm + player.rushing_twoptm + player.passing_twoptm)*2) -
                            (player.fumbles_lost*2) +
                            (player.fumbles_rec_tds*6)
                            )

        return fantasy_points

    def new_week(self, year, week):
        self.week = week
        self.year = year
        self.games = nflgame.games(self.year, week=self.week)
        self.players = nflgame.combine_max_stats(self.games)


    def insert_player(self):
        """
        Deprecated.

        Creates the sql query to put a new player into the db, if they aren't already there.
        Ignores the query if it already exists.
        """
        insert_player = text("""INSERT IGNORE INTO FFL_player (nfl_id, name, position, team)
                                VALUES (:nfl_id, :name, :position, :team)
                                ON DUPLICATE KEY UPDATE
                                name = :name,
                                position = :position,
                                team = :team
                                """
                                #IF NOT EXISTS
                                #(SELECT null FROM ffl_player WHERE nfl_id = :nfl_id)
                                )
        return insert_player

    def insert_qb(self):
        """
        Deprecated
        """
        insert_qb = text("""UPDATE FFL_player, FFL_pick
                                SET FFL_pick.qb_points=(
                                    SELECT IFNULL(MAX(p.fantasy_points), 0) FROM (
                                        SELECT * FROM FFL_player) as p WHERE
                                            FFL_pick.qb=p.name AND FFL_pick.week=p.week AND FFL_pick.year=p.year)""")
        return insert_qb

    def insert_rb(self):
        """
        Deprecated
        """
        insert_rb = text("""UPDATE FFL_player, FFL_pick
                                SET FFL_pick.rb_points=(
                                    SELECT IFNULL(MAX(p.fantasy_points), 0) FROM (
                                        SELECT * FROM FFL_player) as p WHERE
                                            FFL_pick.rb=p.name AND FFL_pick.week=p.week AND FFL_pick.year=p.year)""")
        return insert_rb

    def insert_wr(self):
        """
        Deprecated
        """
        insert_wr = text("""UPDATE FFL_player, FFL_pick
                                SET FFL_pick.wr_points=(
                                    SELECT IFNULL(MAX(p.fantasy_points), 0) FROM (
                                        SELECT * FROM FFL_player) as p WHERE
                                            FFL_pick.wr=p.name AND FFL_pick.week=p.week AND FFL_pick.year=p.year)""")
        return insert_wr

    def insert_te(self):
        """
        Deprecated
        """
        insert_te = text("""UPDATE FFL_player, FFL_pick
                                SET FFL_pick.te_points=(
                                    SELECT IFNULL(MAX(p.fantasy_points), 0) FROM (
                                        SELECT * FROM FFL_player) as p WHERE
                                            FFL_pick.te=p.name AND FFL_pick.week=p.week AND FFL_pick.year=p.year)""")
        return insert_te

    def insert_defense(self):
        """
        Deprecated
        """
        insert_defense = text("""UPDATE FFL_pick, FFL_defense
                                        SET FFL_pick.def_points=FFL_defense.fantasy_points WHERE
                                        FFL_pick.defense=FFL_defense.team AND FFL_defense.week=FFL_pick.week AND FFL_defense.year=FFL_pick.year""")

        return insert_defense

    def update_total(self):
        """
        Deprecated
        """
        update_total = text("""UPDATE FFL_pick
                                SET total_points=(qb_points + rb_points + wr_points + te_points + def_points)""")
        return update_total

    def update_picks(self):
        """
        Deprecated
        """
        self.connection.execute(self.insert_qb())
        self.connection.execute(self.insert_rb())
        self.connection.execute(self.insert_wr())
        self.connection.execute(self.insert_te())
        self.connection.execute(self.insert_defense())
        self.connection.execute(self.update_total())

    def update_all(self):
        """
        Deprecated
        """
        self.get_all_stats()
        self.update_picks()
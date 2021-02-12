import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { retrieveLeagues } from "../../actions/ffl";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  card: {
    "&:hover": {
      backgroundColor: "rgba(10,10,10,.15)"
    }
  }
}));

const LeagueIndex = props => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { leagues, leagueLoaded } = useSelector(state => state.ffl);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(retrieveLeagues(user.username));
  }, []);

  const cardLinks = (
    <Grid container>
      {leagues.map((league, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Card className={classes.card}>
            <Typography
              variant="h3"
              component={Link}
              className={classes.link}
              to={{ pathname: `/${league.id}`, state: { name: league.name } }}
              style={{ textDecoration: "none" }}
            >
              {league.name}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const guestLinks = <h1>Log in!</h1>;

  return (
    <Fragment>
      {leagues.length > 0 ? <h3>Choose a league</h3> : <h3>Join a league</h3>}
      {isAuthenticated ? cardLinks : guestLinks}
    </Fragment>
  );
};

LeagueIndex.propTypes = {
  leagues: PropTypes.array,
  leagueLoaded: PropTypes.bool
};

export default LeagueIndex;

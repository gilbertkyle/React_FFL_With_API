import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const LeagueRoute = ({ component: Component, auth, leagues, ...rest }) => (
  // this route component checks the users leagues, and if they aren't in the selected one,
  // it sends them back to the home page

  <Route
    {...rest}
    render={props => {
      let leagueID = props.match.params.id;
      for (var i = 0; i < leagues.length; i++) {
        if (leagues[i].id == leagueID) {
          return <Component {...props} />;
        }
      }
      return <Redirect to="/" />;
    }}
  />
);

const mapStateToProps = state => ({
  leagues: state.ffl.leagues,
  auth: state.auth
});

export default connect(mapStateToProps)(LeagueRoute);

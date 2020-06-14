import React, { Component, Fragment } from "react";
import { Link, Switch, Route } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { retrieveLeagues } from "../../actions/league";
import { connect } from "react-redux";
import { createMessage } from "../../actions/messages";
import { Home } from "./Home";
//import mainImage from "../../../static/frontend/49ers.jpg";

export class LeagueIndex extends Component {
  static proptypes = {
    retrieveLeagues: PropTypes.func.isRequired,
    leagues: PropTypes.array,
    leagueLoaded: PropTypes.bool
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.leagueLoaded) {
      this.props.retrieveLeagues(this.props.user.username);
    }
  }

  componentDidUpdate(prevProps) {}

  render() {
    //console.log(mainImage);
    const { isAuthenticated } = this.props.auth;
    let myLeagues = [];
    if (this.props.leagues.leagues !== null) {
      myLeagues = this.props.leagues.leagues;
    }
    const authLinks = (
      <Fragment>
        <ul>
          {myLeagues.map((league, index) => (
            <h1 key={index}>
              <Link key={league.id} to={`/${league.id}`}>
                {league.name}
              </Link>
            </h1>
          ))}
        </ul>
      </Fragment>
    );
    const guestLinks = <h1>Log in!</h1>;
    return <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  leagues: state.leagues,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createMessage, retrieveLeagues }
)(LeagueIndex);

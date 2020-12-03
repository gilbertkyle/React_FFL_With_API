import React, { Component, Fragment } from "react";
import { Link, Switch, Route } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { retrieveLeagues } from "../../actions/league";
import { connect } from "react-redux";
import { createMessage } from "../../actions/messages";
import { Home } from "./Home";
import FootballNavbar from "../layout/FootballNavbar";
import { Col, Row, Card } from "react-bootstrap";

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

  render() {
    const { isAuthenticated } = this.props.auth;
    let myLeagues = [];
    if (this.props.leagues !== null) {
      myLeagues = this.props.leagues;
    }

    const authLinks = (
      <Fragment>
        <ul>
          {myLeagues.map((league, index) => (
            <h3 key={index}>
              <Link key={league.id} to={`/${league.id}`}>
                {league.name}
              </Link>
            </h3>
          ))}
        </ul>
      </Fragment>
    );

    const cardLinks = (
      <Fragment>
        <Row>
          {myLeagues.map((league, index) => (
            <Col xs={12} md={6} key={index}>
              <Card>
                <Link to={`/${league.id}`}>
                  <Card.Body>
                    <Card.Title>{league.name}</Card.Title>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Fragment>
    );

    const guestLinks = <h1>Log in!</h1>;
    return (
      <Fragment>
        {myLeagues.length > 0 ? <h3>Choose a league</h3> : <h3>Join a league</h3>}
        {isAuthenticated ? cardLinks : guestLinks}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  leagues: state.ffl.leagues,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createMessage, retrieveLeagues }
)(LeagueIndex);

import React, { Component } from "react";
import axios from "axios";
import { Picks } from "./Picks";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { retrievePicks, retrieveMyPicks } from "../../actions/league";
import { Link } from "react-router-dom";
import PickForm from "./Picks";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagueName: null,
      leagueID: this.props.match.params.id
    };
  }

  static propTypes = {
    retrievePicks: PropTypes.func.isRequired,
    retrieveMyPicks: PropTypes.func.isRequired
  };

  componentDidMount() {
    fetch(`/api/league/retrieve/${this.props.match.params.id}`)
      .then(res => {
        return res.json();
      })
      .then(myJson => {
        this.setState({ leagueName: myJson.name });
      });
    this.props.retrievePicks(this.props.match.params.id, this.props.week);
    this.props.retrieveMyPicks(
      this.props.match.params.id,
      this.props.user.username
    );
  }

  render() {
    return (
      <div>
        <Link to={`/${this.props.match.params.id}/picks`}>Weekly Detail</Link>
        <h1>{this.state.leagueName}</h1>
        <Picks {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  week: state.leagues.week,
  picks: state.leagues.picks,
  myPicks: state.leagues.myPicks
});

export default connect(
  mapStateToProps,
  { retrievePicks, retrieveMyPicks }
)(Home);

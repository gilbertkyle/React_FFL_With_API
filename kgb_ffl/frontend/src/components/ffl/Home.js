import React, { Component } from "react";
import axios from "axios";
import { Picks } from "./Picks";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { retrievePicks, retrieveMyPicks } from "../../actions/league";
import { Link } from "react-router-dom";
import PickForm from "./Picks";
import { PICK_RELOAD } from "../../actions/types";

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
    this.props.retrieveMyPicks(this.props.match.params.id, this.props.user.username);
    if (this.props.pickSubmitted) {
      this.props.reloadPicks();
    }
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
  week: state.ffl.week,
  picks: state.ffl.picks,
  myPicks: state.ffl.myPicks,
  pickSubmitted: state.ffl.pickSubmitted
});

const mapDispatchToProps = dispatch => ({
  retrievePicks: (id, week) => dispatch(retrievePicks(id, week)),
  retrieveMyPicks: (id, username) => dispatch(retrieveMyPicks(id, username)),
  reloadPicks: () => dispatch({ type: PICK_RELOAD })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

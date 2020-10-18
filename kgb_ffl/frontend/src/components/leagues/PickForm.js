import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createMessage } from "../../actions/messages";
import { updatePick } from "../../actions/league";
import { Redirect, withRouter } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { withAlert } from "react-alert";
import axios from "axios";

export class PickForm extends Component {
  // singular parts of state are the chosen picks
  // plural parts of state are used for autocomplete
  state = {
    qb: {},
    rb: {},
    wr: {},
    te: {},
    defense: {},
    qbs: [],
    rbs: [],
    wrs: [],
    tes: [],
    defenses: []
  };

  static propTypes = {
    updatePick: PropTypes.func.isRequired
  };

  onSubmit = e => {
    e.preventDefault();
    const { qb, rb, wr, te, defense } = this.state;
    const picks = {
      qb,
      rb,
      wr,
      te,
      defense
    };

    // check for repeat picks in this league
    const myPicks = this.props.picks;
    for (var i = 0; i < myPicks.length; i++) {
      if (myPicks[i].qb_id == qb.id) {
        this.props.createMessage({ qbTaken: `You have already picked ${qb.name} this season` });
        return;
      }
      if (myPicks[i].rb_id == rb.id) {
        this.props.createMessage({ rbTaken: `You have already picked ${rb.name} this season` });
        return;
      }
      if (myPicks[i].wr_id == wr.id) {
        this.props.createMessage({ wrTaken: `You have already picked ${wr.name} this season` });
        return;
      }
      if (myPicks[i].te_id == te.id) {
        this.props.createMessage({ teTaken: `You have already picked ${te.name} this season` });
        return;
      }
      if (myPicks[i].defense_id == defense.id) {
        this.props.createMessage({
          defenseTaken: `You have already picked ${defense.name} this season`
        });
        return;
      }
    }

    const pickId = this.props.picks.filter(pick => pick.week == this.props.week)[0].id;
    this.props.updatePick(pickId, picks);
  };

  onChange = e => this.setState({ [e.target.name]: value });

  componentDidMount() {
    // seeding for the autocomplete
    axios
      .get("api/players")
      .then(res => {
        return res.data;
      })
      .then(myJson => {
        let qbs = myJson.filter(player => player.position == "QB");
        let rbs = myJson.filter(player => player.position == "RB");
        let wrs = myJson.filter(player => player.position == "WR");
        let tes = myJson.filter(player => player.position == "TE");
        let defenses = myJson.filter(player => player.position == "Def");

        this.setState({
          qbs,
          rbs,
          wrs,
          tes,
          defenses
        });
      });
  }

  optionLabel = option => {
    return `${option.name} - ${option.team.toUpperCase()}`;
  };

  render() {
    if (this.props.pickSubmitted) {
      // Redirects user to the league home when a pick is submitted
      return <Redirect to={`/${this.props.match.params.id}`} />;
    }
    const { qb, rb, wr, te, defense } = this.state;
    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <Autocomplete
            id="combo-box-qb"
            onChange={(e, value) => this.setState({ qb: value })}
            options={this.state.qbs}
            getOptionLabel={this.optionLabel}
            style={{ width: 300, margin: 30 }}
            maxSearchResults={5}
            renderInput={params => (
              <TextField {...params} label="Quarterback" variant="outlined" name="qb" />
            )}
          />
          <Autocomplete
            id="combo-box-rb"
            onChange={(e, value) => this.setState({ rb: value })}
            options={this.state.rbs}
            getOptionLabel={this.optionLabel}
            style={{ width: 300, margin: 30 }}
            renderInput={params => (
              <TextField {...params} label="Running Back" variant="outlined" />
            )}
          />
          <Autocomplete
            id="combo-box-wr"
            onChange={(e, value) => this.setState({ wr: value })}
            options={this.state.wrs}
            getOptionLabel={this.optionLabel}
            style={{ width: 300, margin: 30 }}
            renderInput={params => (
              <TextField {...params} label="Wide Receiver" variant="outlined" />
            )}
          />
          <Autocomplete
            id="combo-box-te"
            onChange={(e, value) => this.setState({ te: value })}
            options={this.state.tes}
            getOptionLabel={this.optionLabel}
            style={{ width: 300, margin: 30 }}
            renderInput={params => <TextField {...params} label="Tight End" variant="outlined" />}
          />
          <Autocomplete
            id="combo-box-defense"
            onChange={(e, value) => this.setState({ defense: value })}
            options={this.state.defenses}
            getOptionLabel={option => option.name}
            style={{ width: 300, margin: 30 }}
            renderInput={params => <TextField {...params} label="Defense" variant="outlined" />}
          />
          <Button type="submit" variant="contained">
            Submit Picks
          </Button>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  picks: state.leagues.myPicks,
  pickSubmitted: state.leagues.pickSubmitted
});

const mapDispatchToProps = dispatch => ({
  createMessage: message => dispatch(createMessage(message)),
  updatePick: (pickId, picks) => dispatch(updatePick(pickId, picks))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PickForm));

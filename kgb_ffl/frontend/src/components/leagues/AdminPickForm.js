import React, { Component, Fragment } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField, Button, Select, InputLabel, MenuItem } from "@material-ui/core";
import { connect } from "react-redux";
import { updatePick } from "../../actions/league";
import axios from "axios";

export class AdminPickForm extends Component {
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

    const pickId = this.props.picks.filter(pick => pick.week == this.props.week)[0].id;
    this.props.updatePick(pickId, picks);
  };

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
        console.log(this.state);
      });
  }

  onChange = e => this.setState({ pickId: e.target.value });

  optionLabel = option => {
    return `${option.name} - ${option.team.toUpperCase()}`;
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <Autocomplete
            id="combo-box-qb"
            onChange={(e, value) => this.setState({ qb: value })}
            options={this.state.qbs}
            getOptionLabel={this.optionLabel}
            style={{ width: 300, margin: 30 }}
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
  picks: state.admin.picks
});

export default connect(
  mapStateToProps,
  { updatePick }
)(AdminPickForm);

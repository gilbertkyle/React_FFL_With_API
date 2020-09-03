import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createMessage } from "../../actions/messages";
import { updatePick } from "../../actions/league";
import { Redirect, withRouter } from "react-router-dom";

export class PickForm extends Component {
  state = {
    qb: "",
    rb: "",
    wr: "",
    te: "",
    defense: ""
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

    const pickId = this.props.picks.filter(pick => pick.week == this.props.week)[0].id;
    //const pickId = this.props.picks.filter(pick => pick.week == 17)[0].id;
    this.props.updatePick(pickId, picks);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    console.log(this.props.match);
    if (this.props.pickSubmitted) {
      return <Redirect to={`/${this.props.match.params.id}`} />;
    }
    const { qb, rb, wr, te, defense } = this.state;
    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <legend></legend>
            <div className="form-group">
              <label htmlFor="qbInput">Quarterback: </label>
              <input
                type="text"
                value={qb}
                onChange={this.onChange}
                name="qb"
                id="qbInput"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="rbInput">Running Back: </label>
              <input
                type="text"
                value={rb}
                onChange={this.onChange}
                name="rb"
                id="rbInput"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="wrInput">Wide Receiver: </label>
              <input
                type="text"
                value={wr}
                onChange={this.onChange}
                name="wr"
                id="wrInput"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="teInput">Tight End: </label>
              <input
                type="text"
                value={te}
                onChange={this.onChange}
                name="te"
                id="teInput"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="defense">Defense: </label>
              <input
                type="text"
                value={defense}
                onChange={this.onChange}
                name="defense"
                id="defenseInput"
                className="form-control"
              />
            </div>

            <button type="submit">Submit</button>
          </fieldset>
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

export default connect(
  mapStateToProps,
  { createMessage, updatePick }
)(withRouter(PickForm));

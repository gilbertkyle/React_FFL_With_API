import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createMessage } from "../../actions/messages";
import { joinLeague } from "../../actions/league";

export class JoinLeague extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      leaguesUpdated: props.leaguesUpdated
    };
  }

  static propTypes = {
    joinLeague: PropTypes.func.isRequired
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, password } = this.state;
    const user_id = this.props.user.id;
    this.props.joinLeague(name, password, user_id);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.leaguesUpdated !== this.props.leaguesUpdated) {
      this.props.history.push("/");
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, password } = this.state;
    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="leagueNameInput">League Name</label>
            <input
              className="form-control"
              id="leagueNameInput"
              aria-describedby="emailHelp"
              onChange={this.onChange}
              name="name"
              value={name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="leaguePassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="leaguePassword"
              name="password"
              onChange={this.onChange}
              value={password}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  leaguesUpdated: state.ffl.leaguesUpdated
});

export default connect(
  mapStateToProps,
  { createMessage, joinLeague }
)(JoinLeague);

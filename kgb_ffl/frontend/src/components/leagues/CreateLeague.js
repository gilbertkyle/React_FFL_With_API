import React, { Component, Fragment } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { createMessage } from "../../actions/messages";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerLeague } from "../../actions/league";
import { Redirect } from "react-router-dom";

export class CreateLeague extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      password2: "",
      leaguesUpdated: props.leagueCreated
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.leaguesUpdated !== this.props.leaguesUpdated) {
      this.props.history.push("/");
    }
  }

  static propTypes = {
    registerLeague: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, password, password2 } = this.state;
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
    } else {
      const user_id = this.props.user.id;
      const newLeague = {
        name,
        password,
        user_id
      };

      this.props.registerLeague(newLeague);
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, password, password2 } = this.state;
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
          <div className="form-group">
            <label htmlFor="leaguePassword2">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="leaguePassword2"
              name="password2"
              onChange={this.onChange}
              value={password2}
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    leaguesUpdated: state.leagues.leaguesUpdated
  };
};

export default connect(
  mapStateToProps,
  { createMessage, registerLeague }
)(CreateLeague);

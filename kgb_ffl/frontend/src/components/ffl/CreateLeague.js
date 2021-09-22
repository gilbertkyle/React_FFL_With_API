import React, { Component, Fragment, useState } from "react";
import { createMessage } from "../../actions/messages";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { registerLeague } from "../../actions/ffl";
import { TextField, Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  header: {
    paddingTop: "1rem",
  },
  input: {
    width: "40%",
    margin: "1rem",
  },
  button: {
    color: theme.palette.common.black,
  },
  checkbox: {
    marginLeft: "1rem",
  },
}));

const CreateLeague = props => {
  // set local state variables
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  // get state variables
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { leaguesUpdated } = useSelector(state => state.ffl);

  // get dispatch
  const dispatch = useDispatch();

  // get styles
  const classes = useStyles();

  // form submission
  const handleSubmit = e => {
    if (!name || !password) return;
    if (password !== password2) {
      dispatch(createMessage({ passwordNotMatch: "Passwords do not match" }));
      return;
    }
    const newLeague = {
      name: name,
      password: password,
    };
    dispatch(registerLeague(newLeague));
  };

  const handleChange = e => {
    setIsPrivate(e.target.checked);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={classes.header}>Create a New League</h2>
      <div className={classes.formRow}>
        <TextField
          className={classes.input}
          label="League Name"
          variant="outlined"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          className={classes.input}
          label="Password"
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
        <div>
          <TextField
            className={classes.input}
            label="Confirm Password"
            variant="outlined"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            type="password"
          />
        </div>
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={isPrivate}
              onChange={handleChange}
              label="Private League"
              className={classes.checkbox}
            ></Checkbox>
          }
          label="Private League"
        ></FormControlLabel>
      </div>
      <Button className={classes.button} type="submit" variant="contained">
        Create League
      </Button>
    </form>
  );
};

export default CreateLeague;

/*
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
    leaguesUpdated: state.ffl.leaguesUpdated
  };
};

export default connect(
  mapStateToProps,
  { createMessage, registerLeague }
)(CreateLeague);
*/

import React, { Component, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  form: {
    "& > *": {
      margin: "1rem"
    }
  },
  card: {
    margin: "auto",
    marginTop: "5rem",
    border: "1px solid lightgray",
    "& > h2": {
      color: "blue"
    }
  },
  title: {
    textAlign: "center",
    margin: "2rem 0rem"
  }
}));

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(createMessage({ passwordNotMatch: "Passwords do not match" }));
    } else {
      const newUser = {
        username,
        email,
        password
      };
      dispatch(register(newUser));
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container>
      <Grid container item md={6} className={classes.card}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Grid item xs={12}>
              <h2 className={classes.title}>Register</h2>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="username"
                value={username}
                variant="outlined"
                fullWidth
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="email"
                type="email"
                value={email}
                variant="outlined"
                fullWidth
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="password"
                type="password"
                value={password}
                variant="outlined"
                fullWidth
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm password"
                type="password"
                value={password2}
                variant="outlined"
                fullWidth
                onChange={e => setPassword2(e.target.value)}
              />
            </Grid>
            <Button variant="contained" type="submit" color="primary">
              Register
            </Button>
            <Grid item xs={12}>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Register;

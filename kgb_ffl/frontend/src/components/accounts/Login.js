import React, { Component, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { TextField, Button, Grid, makeStyles } from "@material-ui/core";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      margin: "1rem",
    },
  },
  card: {
    margin: "auto",
    marginTop: "5rem",
    border: "1px solid lightgray",
    "& > h2": {
      color: "blue",
    },
  },
  title: {
    textAlign: "center",
    margin: "2rem 0rem",
  },
}));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container>
      <Grid container item md={6} className={classes.card}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Grid item x={12}>
              <h2 className={classes.title}>Login</h2>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
            <Grid item xs={12}>
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
              <small>
                <Link to="/account/password_recovery">Forgot your password?</Link>
              </small>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;

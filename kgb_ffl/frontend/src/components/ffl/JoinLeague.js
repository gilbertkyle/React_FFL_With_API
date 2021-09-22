import React, { Component, Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import { createMessage } from "../../actions/messages";
import { joinLeague } from "../../actions/ffl";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";

const JoinLeague = props => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // useSelector stuff
  const { leaguesUpdated } = useSelector(state => state.ffl);
  const { user, isAuthenticated } = useSelector(state => state.auth);

  // Dispatch
  const dispatch = useDispatch();

  // History
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(joinLeague(name, password));
    console.log({
      name,
      password,
    });
  };

  useEffect(() => {
    if (leaguesUpdated) history.push("/");
  }, [leaguesUpdated]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <TextField label="Name" variant="outlined" />
        <label htmlFor="leagueNameInput">League Name</label>
        <input
          className="form-control"
          id="leagueNameInput"
          aria-describedby="emailHelp"
          onChange={e => setName(e.target.value)}
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
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default JoinLeague;

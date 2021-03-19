import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { retrievePicks, retrieveMyPicks } from "../../actions/ffl";
import { Link } from "react-router-dom";
import { PickTable } from "./PickTable";
import { PICK_RELOAD } from "../../actions/types";
import { Typography } from "@material-ui/core";
import PickForm from "./PickForm";

const Home = props => {
  const { name } = props.location.state;
  const { id } = props.match.params;
  const { week, picks, myPicks, pickSubmitted, leagues } = useSelector(state => state.ffl);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const reloadPicks = () => dispatch({ type: PICK_RELOAD });

  const currentLeague = leagues.filter(league => league.id == id)[0];
  let isCommish = false;

  // check if current user is in admins array
  currentLeague.admins.map(admin => {
    if (admin.id == user.pk) {
      isCommish = true;
      return;
    }
  });

  useEffect(() => {
    dispatch(retrievePicks(id, week));
    dispatch(retrieveMyPicks(id, user.username));
  }, []);

  useEffect(() => {
    reloadPicks();
  }, [pickSubmitted]);

  return (
    <div>
      <Link to={`/${id}/picks`}>Weekly Detail</Link>
      {isCommish ? <Link to={`/admin/${id}`}>Commish</Link> : ""}
      <Typography variant="h2">{name}</Typography>
      <PickTable picks={myPicks} />
      <PickForm />
    </div>
  );
};

export default Home;

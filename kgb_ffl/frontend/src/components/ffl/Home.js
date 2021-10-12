import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { retrievePicks, retrieveMyPicks } from "../../actions/ffl";
import { Link } from "react-router-dom";
import { PickTable } from "./PickTable";
import { PICK_RELOAD } from "../../actions/types";
import { Typography } from "@material-ui/core";
import axios from "axios";
import styled from "styled-components";

const Home = props => {
  const [name, setName] = useState(props.location.state?.name || "none");
  const { id } = props.match.params;
  const { week, picks, myPicks, pickSubmitted, leagues } = useSelector(state => state.ffl);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const reloadPicks = () => dispatch({ type: PICK_RELOAD });

  // check if current user is in admins array
  const currentLeague = leagues.filter(league => league.id == id)[0];
  let isCommish = false;
  currentLeague.admins.map(admin => {
    if (admin.id == user.pk) {
      isCommish = true;
      return;
    }
  });

  useEffect(() => {
    /*
    const getLeague = async () => {
      const response = await axios.get(`/api/league/retrieve/${id}`);
      setName(response.data.name);
    };
    getLeague();
    */
    dispatch(retrievePicks(id, week));
    dispatch(retrieveMyPicks(id, user.username));
  }, []);

  useEffect(() => {
    reloadPicks();
  }, [pickSubmitted]);

  return (
    <div>
      <Title>
        <Typography variant="h2" style={{ marginTop: ".5rem" }}>
          {name}
        </Typography>
      </Title>
      <hr />
      <Controls>
        <Link to={`/${id}/picks`}>Weekly Detail</Link>
        {isCommish ? <Link to={`/admin/${id}`}>Commish</Link> : ""}
      </Controls>
      <PickTable picks={myPicks} />
    </div>
  );
};

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-around;
  a:hover {
    text-decoration: none;
  }
`;

export default Home;

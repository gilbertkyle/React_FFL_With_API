import React, { Fragment, useState, useEffect } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import axios from "axios";
import { getPlayers } from "../../actions/players";
import { useDispatch, useSelector } from "react-redux";

export const PlayerSearch = (props) => {
  const [players, setPlayers] = useState([]);

  const search = queryString.parse(props.location.search);

  useEffect(() => {
    const initSearch = async () => {
      const response = await axios.get("/api/players", { params: search });
      setPlayers(response.data);
    };
    initSearch();
  }, []);

  useEffect(() => {
    const reSearch = async () => {
      const response = await axios.get("/api/players", { params: search });
      setPlayers(response.data);
    };
    reSearch();
  }, [props.location.search]);

  return (
    <Fragment>
      <h4>Search Players</h4>
      {players.map((player) => (
        <p>{player.name}</p>
      ))}
    </Fragment>
  );
};

export default PlayerSearch;

const PlayerDisplay = ({ player }) => {
  return <p key={player.id}>{player.name}</p>;
};

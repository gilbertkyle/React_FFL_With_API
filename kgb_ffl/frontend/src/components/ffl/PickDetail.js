import React, { Component, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PickForm from "./PickForm";
import { ButtonGroup, Button, Table } from "@material-ui/core";
import { PickTable } from "./PickTable";

const PickDetail = props => {
  const { week, picks } = useSelector(state => state.ffl);
  const [selectedWeek, setSelectedWeek] = useState(week);
  const leagueId = props.match.params.id;
  console.log(picks);
  console.log(leagueId);

  const leaguePicks = picks.filter(pick => pick.week == selectedWeek && pick.league.league == leagueId);

  const handleClick = e => {
    setSelectedWeek(e.target.innerText);
  };

  const pickForm = <PickForm key={week} week={week} />;
  const table = <PickTable picks={leaguePicks} />;
  const buttonGroup = (
    <ButtonGroup variant="text">
      {Array.from(new Array(week), (x, i) => i + 1).map((arrayWeek, index) => (
        <Button onClick={handleClick} key={index}>
          {arrayWeek}
        </Button>
      ))}
    </ButtonGroup>
  );
  return (
    <>
      {buttonGroup}
      {selectedWeek == week ? pickForm : table}
    </>
  );
};

export default PickDetail;

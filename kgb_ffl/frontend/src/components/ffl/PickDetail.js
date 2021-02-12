import React, { Component, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import PickForm from "./PickForm";
//import { Table, ButtonGroup } from "react-bootstrap";
import { ButtonGroup, Button, Table } from "@material-ui/core";
import { PickTable } from "./PickTable";
import LeagueTable from "./LeagueTable";

const PickDetail = props => {
  const { week, picks } = useSelector(state => state.ffl);
  const [selectedWeek, setSelectedWeek] = useState(week);

  const leaguePicks = picks.filter(pick => pick.week == selectedWeek);

  const handleClick = e => {
    setSelectedWeek(e.target.innerText);
  };

  const pickForm = <PickForm key={week} week={week} />;
  const table = <LeagueTable picks={leaguePicks} />;
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

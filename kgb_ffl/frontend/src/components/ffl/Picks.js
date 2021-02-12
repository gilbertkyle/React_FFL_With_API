import React, { Component } from "react";
import { PickTable } from "./PickTable";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    overflow: "auto"
  },
  head: {
    backgroundColor: "#1a53ff",
    "& > *": {
      color: theme.palette.common.white,
      fontWeight: "bold"
    }
  },
  rows: {
    "&:nth-child(odd)": {
      backgroundColor: "rgb(235, 235, 235)"
    }
  }
}));

export const Picks = props => {
  const classes = useStyles();

  let myPicks = [];
  if (props.myPicks) {
    myPicks = props.myPicks;
  }

  return <PickTable picks={myPicks} />;
};

import React, { Component } from "react";
import { Jumbotron as Jumbo } from "react-bootstrap";
import { Container, Grid } from "@material-ui/core";
import styled from "styled-components";
import FootballNavbar from "./FootballNavbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  jumbotron: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "200px",
    zIndex: "-1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    [theme.breakpoints.down("md")]: {
      // shrinks to height of FootballNavbar component
      height: "64px"
    }
  },
  container: {
    padding: "0px"
  }
}));

export const Jumbotron = () => {
  const classes = useStyles();
  return (
    <div className={classes.jumbotron}>
      <Container className={classes.container}>
        <FootballNavbar />
      </Container>
    </div>
  );
};

export default Jumbotron;

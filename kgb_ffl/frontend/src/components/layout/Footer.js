import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Container } from "react-bootstrap";

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: "#373a3c",
    width: "100%",
    height: "8vh",
    height: "100%"
  },
  info: {
    textAlign: "center",
    margin: "auto"
  },
  list: {
    listStyle: "none",
    textAlign: "center"
  }
}));
export const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Grid container style={{ maxWidth: "1140px", margin: "auto" }}>
        <div className={classes.info}>
          <figure>
            <figcaption style={{ color: "white", marginLeft: "40px" }}>Contact</figcaption>
            <ul className={classes.list}>
              <a href="mailto:gilbertkyle@yahoo.com">Email</a>

              <li>
                <a href="https://github.com/gilbertkyle/React_FFL_With_API" target="_blank">
                  <span>Want to Contribute? Check out the Github!</span>
                </a>
              </li>
            </ul>
          </figure>
        </div>
      </Grid>
    </div>
  );
};

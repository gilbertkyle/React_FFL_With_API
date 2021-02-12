import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { Toolbar, Button, Menu, MenuItem, Grid, TextField } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  toolbar: {
    backgroundColor: theme.palette.common.white,
    border: "1px solid black",
    borderRadius: "5px 5px 0px 0px"
  },
  leagueButton: {
    "&:focus": {
      outline: "none"
    }
  },
  center: {
    margin: "auto 0px"
  },
  searchButton: {
    marginTop: theme.spacing(1),
    boxShadow: "0px 1px 1px 1px rgba(0,0,0,0.25)",
    transitionDuration: "0.15s",
    "&:active": {
      boxShadow: "0px 0px 0px 0px"
    }
  },
  adminButton: {
    "&:focus": {
      outline: "none"
    }
  },
  endIcon: {
    marginLeft: "0px"
  }
}));

export const FootballNavbar = props => {
  const [leagueMenuAnchor, setLeagueMenuAnchor] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const isAdmin = useSelector(state => state.auth.isCommissioner);

  const classes = useStyles();

  const handleClick = event => {
    setLeagueMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setLeagueMenuAnchor(null);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!playerName) return;
    props.history.push(`/search?player=${playerName}`);
  };

  const adminButton = (
    <Button component={Link} to={"/admin"} className={classes.adminButton}>
      Admin
    </Button>
  );

  return (
    <Toolbar className={classes.toolbar}>
      <Grid container justify="space-between">
        <Grid item className={classes.center}>
          <Button
            color="inherit"
            onClick={handleClick}
            aria-controls="simple-menu"
            aria-haspopup={true}
            className={classes.leagueButton}
            classes={{ endIcon: classes.endIcon }}
            endIcon={<ArrowDropDownIcon />}
          >
            League Menu
          </Button>
          {props.isAdmin ? adminButton : <Fragment />}
        </Grid>
        <Menu
          id="league-menu"
          disableScrollLock
          keepMounted
          open={Boolean(leagueMenuAnchor)}
          onClose={handleClose}
          anchorEl={leagueMenuAnchor}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          {/* setLeagueMenuAchor is called again to the menu goes away */}
          <MenuItem component={Link} to={"/league/join"} onClick={() => setLeagueMenuAnchor(null)}>
            Join a League
          </MenuItem>
          <MenuItem
            component={Link}
            to={"/league/create"}
            onClick={() => setLeagueMenuAnchor(null)}
          >
            Create a league
          </MenuItem>
        </Menu>

        <Grid item>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField label="Search Player" onChange={e => setPlayerName(e.target.value)} />
            <Button color="inherit" type="submit" className={classes.searchButton}>
              Search
            </Button>
          </form>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

const mapStateToProps = state => ({
  isAdmin: state.auth.isCommissioner
});

export default connect(mapStateToProps)(withRouter(FootballNavbar));

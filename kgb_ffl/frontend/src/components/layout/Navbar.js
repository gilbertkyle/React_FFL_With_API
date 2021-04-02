import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  ButtonGroup,
  Menu,
  MenuItem
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  navLinks: {
    listStyle: "none",
    display: "flex",
    justifyContent: "space-between",
    margin: "auto 0px auto auto"
  },
  brand: {
    "&:hover": {
      textDecoration: "none",
      color: "white"
    },
    color: "white",
    whiteSpace: "nowrap",
    textDecoration: "none"
  },
  profileButton: {
    "&:focus": {
      outline: "none"
    }
  },
  appBar: {
    [theme.breakpoints.down("md")]: {
      height: "5rem"
    }
  }
}));

const Navbar = props => {
  const user = useSelector(state => state.auth.user);
  const [anchorElement, setAnchorElement] = React.useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = event => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const authLinks = (
    <Fragment>
      <Button
        aria-controls="simple-menu"
        aria-haspopup={true}
        onClick={handleClick}
        className={classes.profileButton}
        color="inherit"
        startIcon={<AccountBoxIcon />}
      >
        {user ? `${user.username}` : ""}
      </Button>
      <Menu
        id="profile-menu"
        disableScrollLock={true}
        open={Boolean(anchorElement)}
        keepMounted
        onClose={handleClose}
        anchorEl={anchorElement}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem>
          Profile - <em>Not implemented</em>
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.logout();
            setAnchorElement(null);
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <ButtonGroup variant="text" color="inherit" aria-label="navbar button group">
        <Button component={Link} to={"/login"} color="inherit" className={classes.profileButton}>
          Log in
        </Button>
        <Button component={Link} to={"/register"} color="inherit" className={classes.profileButton}>
          Register
        </Button>
      </ButtonGroup>
    </Fragment>
  );

  return (
    <AppBar position="static" className={classes.appBar}>
      <Container>
        <Toolbar>
          <Typography variant="h6" className={classes.brand} component={Link} to={"/"}>
            KGB FFL
          </Typography>
          <ul className={classes.navLinks}>{user ? authLinks : guestLinks}</ul>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(
  null,
  { logout }
)(Navbar);

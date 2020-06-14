import React, { Component, Fragment } from "react";
import { Navbar, NavbarBrand, NavLink } from "react-bootstrap";

export class NavigationBar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.NavbarBrand href="/"></Navbar.NavbarBrand>
      </Navbar>
    );
  }
}

export default NavigationBar;

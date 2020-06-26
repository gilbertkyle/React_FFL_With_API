import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavDropdown, Form, FormControl, Button, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  * {
    z-index: 10;
  }

  .navbar {
    border-radius: 5px 5px 0px 0px;
  }
`;

export class FootballNavbar extends Component {
  render() {
    return (
      <Styles>
        <Navbar bg="light" variant="light" fluid>
          <Navbar.Brand href="#league"> Football</Navbar.Brand>
          <NavDropdown title="My League" id="basic-nav-dropdown">
            <LinkContainer to="/league">
              <NavDropdown.Item>My League</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/league/create">
              <NavDropdown.Item>Create a league</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/league/join">
              <NavDropdown.Item>Join a league</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar>
      </Styles>
    );
  }
}

export default FootballNavbar;

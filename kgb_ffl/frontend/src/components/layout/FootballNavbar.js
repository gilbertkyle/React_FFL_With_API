import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavDropdown, Form, FormControl, Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export class FootballNavbar extends Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#league"> Football League info here</Navbar.Brand>
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
        </Container>
      </Navbar>
    );
  }
}

export default FootballNavbar;

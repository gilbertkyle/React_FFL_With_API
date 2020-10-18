import React, { Component, Fragment } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Nav,
  NavItem
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";
import { connect } from "react-redux";

const Styles = styled.div`
  * {
    z-index: 10;
  }

  .navbar {
    border-radius: 5px 5px 0px 0px;
  }
`;

export class FootballNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { player } = this.state;
    this.props.history.push(`/search?player=${player}`);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { player } = this.state;
    const { isCommissioner } = this.props;

    const commissionerLinks = (
      <Nav.Link as={Link} to="/admin">
        Admin
      </Nav.Link>
    );

    return (
      <Styles>
        <Navbar bg="light" variant="light" expand="lg">
          <Navbar.Brand href="#"> Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="League" id="basic-nav-dropdown">
                <LinkContainer to="/league/create">
                  <NavDropdown.Item>Create a league</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/league/join">
                  <NavDropdown.Item>Join a league</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              {isCommissioner ? commissionerLinks : <Fragment />}
            </Nav>
            <Form inline onSubmit={this.onSubmit}>
              <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={this.onChange}
                value={player}
                name="player"
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
    );
  }
}

const mapStateToProps = state => ({
  isCommissioner: state.auth.isCommissioner
});

export default connect(mapStateToProps)(withRouter(FootballNavbar));

import React, { Component } from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import styled from "styled-components";
import FootballNavbar from "./FootballNavbar";

const Styles = styled.div`
  .jumbo {
    height: 200px;
    position: relative;
    z-index: 2;
    background: rgba(0, 0, 0, 0.4);
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
  }

  .container {
    width: 100%;
    padding: 0px;
  }

  .navbar {
    position: absolute;
    bottom: 0;
    border: 1px solid #000;
    width: 100%;
  }
`;

export class Jumbotron extends Component {
  render() {
    return (
      <Styles>
        <Jumbo className="jumbo">
          <div className="overlay container">
            <p>Hello</p>
            <Container>
              <FootballNavbar />
            </Container>
          </div>
        </Jumbo>
      </Styles>
    );
  }
}

export default Jumbotron;

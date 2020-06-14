import React, { Component } from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
//import mainImage from "../../../static/frontend/49ers.jpg";
import styled from "styled-components";

const Styles = styled.div`
  .jumbo {
    background: url(${"../../../static/frontend/pats_cowboys.jpg"}) no-repeat fixed bottom;
    background-size: hover;
    height: 200px;
    position: relative;
    z-index: -2;
  }

  .overlay {
    background-color: #000;
    opacity: 0.2;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
  .overlay h1,
  .overlay p {
    color: #fff;
  }
`;

export class Jumbotron extends Component {
  render() {
    return (
      <Styles>
        <Jumbo fluid className="jumbo">
          <div className="overlay">
            <Container>
              <h1>Welcome</h1>
              <p>Play Fantasy Football</p>
            </Container>
          </div>
        </Jumbo>
      </Styles>
    );
  }
}

export default Jumbotron;

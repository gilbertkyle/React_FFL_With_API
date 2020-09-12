import React, { Component } from "react";
import queryString from "query-string";
import axios from "axios";

export class SearchPlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: queryString.parse(props.location.search).player
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <p>Search: </p>
        <p>{this.state.player}</p>
      </div>
    );
  }
}

export default SearchPlayerContainer;

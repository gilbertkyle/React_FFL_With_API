import React, { Component, Fragment } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import axios from "axios";

export class PlayerSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
  }
  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    if (queryParams) {
      axios.get("api/players", { params: queryParams }).then(response => {
        this.setState({
          players: [...response.data]
        });
      });
    }
  }

  render() {
    const { players } = this.state;

    return (
      <Fragment>
        <h4>Search Players</h4>
        {players.map((player, index) => {
          return (
            <Link
              to={{
                pathname: `/search/${player.id}`,
                state: {
                  player: player
                }
              }}
            >
              <p>{player.name}</p>
            </Link>
          );
        })}
      </Fragment>
    );
  }
}

export default PlayerSearch;

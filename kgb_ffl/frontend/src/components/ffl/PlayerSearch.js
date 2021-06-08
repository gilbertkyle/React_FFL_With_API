import React, { Fragment, useState, useEffect } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import axios from "axios";
import { getPlayers } from "../../actions/players";
import { useDispatch, useSelector } from "react-redux";

export const PlayerSearch = (props) => {
  //const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState("");
  const dispatch = useDispatch();
  const players = useSelector((state) => state.ffl.players);

  const search = queryString.parse(props.location.search);

  useEffect(() => {
    //dispatch(getPlayers(search));
  }, []);

  useEffect(() => {
    const currentPlayer = search.player;
    if (currentPlayer != player) {
      setPlayer(currentPlayer);
    }
  });

  return (
    <Fragment key={player}>
      <h4>Search Players</h4>
      {players &&
        players.map((player, index) => {
          return <PlayerDisplay player={player} />;
        })}
    </Fragment>
  );
};

export default PlayerSearch;

const PlayerDisplay = ({ player }) => {
  return <p key={player.id}>{player.name}</p>;
};
/*
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
*/

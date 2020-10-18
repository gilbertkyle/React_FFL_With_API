import React, { Component, Fragment } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";

export class PlayerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null
    };
  }

  componentDidMount() {
    if (!this.props.location.state) {
      const playerId = this.props.match.params.playerid;

      axios.get(`api/players/${playerId}`).then(response => {
        this.setState({
          player: response.data
        });
      });
    } else {
      this.setState({
        player: this.props.location.state.player
      });
    }
  }

  render() {
    const { player } = this.state;
    const { current_year } = this.props;
    if (!player) {
      return <p>sorry</p>;
    }
    const weeks = player.weeks.filter(week => week.year == current_year);
    return (
      <Fragment>
        <h4>{player.name}</h4>
        <Table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Week</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, index) => {
              return (
                <tr key={index}>
                  <td>{week.year}</td>
                  <td>{week.week}</td>
                  <td>{week.points}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  current_year: state.leagues.year
});

export default connect(mapStateToProps)(PlayerDetail);

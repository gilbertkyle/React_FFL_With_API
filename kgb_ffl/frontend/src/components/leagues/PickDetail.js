import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import leagues from "../../reducers/leagues";
import PickForm from "./PickForm";
import WeekDetail from "./WeekDetail";

export class PickDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      week: props.week
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    let week = e.target.innerText;
    this.setState({
      week: week
    });
  }

  componentDidUpdate(prevProps) {}

  render() {
    let weeks = [];
    for (let i = 1; i < 18; i++) {
      weeks.push(i);
    }
    let leaguePicks = [];
    if (this.props.picks) {
      leaguePicks = this.props.picks.filter(
        pick => pick.week == this.state.week
      );
    }

    const pickForm = <PickForm key={this.state.week} week={this.state.week} />;
    const otherStuff = (
      <Fragment>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>User</th>
              <th>Week</th>
              <th>Quarterback</th>
              <th>QB Points</th>
              <th>Running Back</th>
              <th>RB Points</th>
              <th>Wide Reciever</th>
              <th>WR Points</th>
              <th>Tight End</th>
              <th>TE Points</th>
              <th>Defense</th>
              <th>Defense Points</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {leaguePicks.map((pick, index) => (
              <tr key={index}>
                <td>{pick.user.username}</td>
                <td>{pick.week}</td>
                <td>{pick.qb}</td>
                <td>{pick.qb_points}</td>
                <td>{pick.rb}</td>
                <td>{pick.rb_points}</td>
                <td>{pick.wr}</td>
                <td>{pick.wr_points}</td>
                <td>{pick.te}</td>
                <td>{pick.te_points}</td>
                <td>{pick.defense}</td>
                <td>{pick.defense_points}</td>
                <td>{pick.total_points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );

    return (
      <div>
        <div className="btn-group" style={{ alignContent: "center" }}>
          {weeks.map((week, index) => (
            <button
              key={index}
              className="btn btn-outline-secondary"
              onClick={this.handleClick.bind(this)}
            >
              {week}
            </button>
          ))}
        </div>
        <h1>Week: {this.state.week}</h1>
        {this.state.week == this.props.week ? pickForm : otherStuff}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  week: state.leagues.week,
  picks: state.leagues.picks
});

export default connect(mapStateToProps)(PickDetail);

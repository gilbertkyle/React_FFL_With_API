import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

export class WeekDetail extends Component {
  state = {
    week: this.props.week
  };
  static getDerivedStateFromProps(props, state) {
    if (props.week !== state.week) {
      return { week: props.week };
    }
    return null;
  }
  render() {
    let leaguePicks = [];
    if (this.props.picks) {
      leaguePicks = this.props.picks.filter(
        pick => pick.week === this.props.week
      );
    }
    return (
      <Fragment key={this.props.week}>
        <p key={this.props.week}>{this.props.week}</p>
        <table>
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
  }
}

const mapStateToProps = state => ({
  // week: state.leagues.week,
  user: state.auth.user,
  picks: state.leagues.picks
});

export default connect(mapStateToProps)(WeekDetail);

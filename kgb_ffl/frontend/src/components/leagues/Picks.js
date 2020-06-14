import React, { Component } from "react";
import { connect } from "react-redux";
import { retrievePicks } from "../../actions/league";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { PickForm } from "./PickForm";

export class Picks extends Component {
  componentDidMount() {}

  render() {
    let myPicks = [];
    if (this.props.myPicks) {
      myPicks = this.props.myPicks;
    }

    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
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
        {myPicks.map((pick, index) => (
          <tbody key={index}>
            <tr>
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
              <td>{pick.def_points}</td>
            </tr>
          </tbody>
        ))}
      </table>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { retrievePicks }
)(Picks);

import React, { Component } from "react";
import { connect } from "react-redux";
import { retrievePicks } from "../../actions/league";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { PickForm } from "./PickForm";
import { Table } from "react-bootstrap";

export class Picks extends Component {
  componentDidMount() {}

  render() {
    let myPicks = [];
    if (this.props.myPicks) {
      myPicks = this.props.myPicks;
    }

    return (
      <Table responsive striped bordered hover size="sm">
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
            <th>Total Points </th>
          </tr>
        </thead>
        <tbody>
          {myPicks.map((pick, index) => (
            <tr key={index}>
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
              <td>{pick.total_points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
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

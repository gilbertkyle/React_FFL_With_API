import React, { Component } from "react";
import { retrievePicks } from "../../actions/league";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Paper
} from "@material-ui/core";
import { PickTable } from "./PickTable";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    overflow: "auto"
  },
  head: {
    backgroundColor: "#1a53ff",
    "& > *": {
      color: theme.palette.common.white,
      fontWeight: "bold"
    }
  },
  rows: {
    "&:nth-child(odd)": {
      backgroundColor: "rgb(235, 235, 235)"
    }
  }
}));

export const Picks = props => {
  const classes = useStyles();

  let myPicks = [];
  if (props.myPicks) {
    myPicks = props.myPicks;
  }

  return <PickTable picks={myPicks} />;
};

//export default Picks;

/*
export class Picks extends Component {
  componentDidMount() {}

  render() {
    let myPicks = [];
    if (this.props.myPicks) {
      myPicks = this.props.myPicks;
    }

    return (
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Week</TableCell>
            <TableCell>Quarterback</TableCell>
            <TableCell>QB Points</TableCell>
            <TableCell>Running Back</TableCell>
            <TableCell>RB Points</TableCell>
            <TableCell>Wide Reciever</TableCell>
            <TableCell>WR Points</TableCell>
            <TableCell>Tight End</TableCell>
            <TableCell>TE Points</TableCell>
            <TableCell>Defense</TableCell>
            <TableCell>Defense Points</TableCell>
            <TableCell>Total Points </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myPicks.map((pick, index) => (
            <TableRow key={index}>
              <TableCell>{pick.week}</TableCell>
              <TableCell>{pick.qb}</TableCell>
              <TableCell>{pick.qb_points}</TableCell>
              <TableCell>{pick.rb}</TableCell>
              <TableCell>{pick.rb_points}</TableCell>
              <TableCell>{pick.wr}</TableCell>
              <TableCell>{pick.wr_points}</TableCell>
              <TableCell>{pick.te}</TableCell>
              <TableCell>{pick.te_points}</TableCell>
              <TableCell>{pick.defense}</TableCell>
              <TableCell>{pick.def_points}</TableCell>
              <TableCell align="right">{pick.total_points.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
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
*/

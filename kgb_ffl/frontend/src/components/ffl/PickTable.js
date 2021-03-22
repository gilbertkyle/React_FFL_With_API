import React from "react";
import {
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableBody
} from "@material-ui/core";

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
    height: "2rem",
    "&:nth-child(odd)": {
      backgroundColor: "rgb(235, 235, 235)"
    }
  },
  importantCell: {
    fontWeight: "bold"
  },
  cell: {
    padding: ".5rem"
  }
}));

export const PickTable = ({ picks = [] }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table padding="none" size="small">
        <TableHead>
          <TableRow className={classes.head}>
            <TableCell className={classes.cell}>Week</TableCell>
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
            <TableCell align="right">Total Points </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {picks.map((pick, index) => (
            <TableRow hover key={index} className={classes.rows}>
              <TableCell className={classes.importantCell}>{pick.week}</TableCell>
              <TableCell className={classes.cell}>{pick.qb}</TableCell>
              <TableCell>{pick.qb_points}</TableCell>
              <TableCell>{pick.rb}</TableCell>
              <TableCell>{pick.rb_points}</TableCell>
              <TableCell>{pick.wr}</TableCell>
              <TableCell>{pick.wr_points}</TableCell>
              <TableCell>{pick.te}</TableCell>
              <TableCell>{pick.te_points}</TableCell>
              <TableCell>{pick.defense}</TableCell>
              <TableCell>{pick.def_points}</TableCell>
              <TableCell align="right" className={classes.importantCell}>
                {pick.total_points.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

const LeagueTable = ({ picks = [] }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
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
            <TableCell>Total Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {picks.map((pick, index) => (
            <TableRow key={index}>
              <TableCell>{pick.user.username}</TableCell>
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
              <TableCell>{pick.total_points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeagueTable;

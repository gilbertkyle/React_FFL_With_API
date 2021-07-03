import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Button,
} from "@material-ui/core";

const Invitations = () => {
  const { invitations } = useSelector((state) => state.ffl);
  const dispatch = useDispatch();

  const handleAccept = (id) => {
    console.log(`accepted ${id}`);
    //dispatch(acceptInvite(id));
  };

  const handleDecline = (id) => {
    console.log(`declined ${id}`);
    //dispatch(deleteInvitation(id));
  };

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Sender</TableCell>
            <TableCell>League</TableCell>
            <TableCell>Body</TableCell>
            <TableCell>Accept</TableCell>
            <TableCell>Decline</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invitations.map((invitation, index) => (
            <TableRow key={index}>
              <TableCell>{invitation.sender.username}</TableCell>
              <TableCell>{invitation.league.name}</TableCell>
              <TableCell>{invitation.body}</TableCell>
              <TableCell>
                <Button onClick={() => handleAccept(invitation.league.id)}>Accept</Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleDecline(invitation.league.id)}>Decline</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Invitations;

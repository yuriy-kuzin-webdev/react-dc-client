import React, { useContext } from "react";
import DcContext from "../contexts/dc-context";
import { useAuth } from "../contexts/AuthContext";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import RestoreIcon from "@material-ui/icons/Restore";
import BlockIcon from "@material-ui/icons/Block";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  tableCenter: {
    width: "75%",
    margin: "20px auto",
  },
}));

export default function Appointments() {
  const context = useContext(DcContext);
  const { currentUser } = useAuth();
  const history = useHistory();
  const classes = useStyles();
  const client = context.clients.find((c) => c.email === currentUser.email);
  if (!client) {
    history.replace("/account");
  }

  function getDentist(id) {
    return context.dentists.find((dent) => dent.id === id);
  }
  function handleRestoreClick(row){
      context.updAppointment({...row, status:'pending'})
  }
  function handleCancelClick(row){
    context.updAppointment({...row, status:'canceled'})
  }
  return (
    <TableContainer component={Paper} className={classes.tableCenter}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Clinic</TableCell>
            <TableCell align="right">Dentist</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {context.appointments
            .filter((a) => a.clientId === client.id)
            .map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {new Date(row.date).toLocaleDateString("en-Us", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell align="right">
                  {getDentist(row.dentistId).clinicName}
                </TableCell>
                <TableCell align="right">
                  {getDentist(row.dentistId).name}
                </TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={()=>{handleRestoreClick(row)}}
                  >
                    <RestoreIcon />
                  </IconButton>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={()=>{handleCancelClick(row)}}
                  >
                    <BlockIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

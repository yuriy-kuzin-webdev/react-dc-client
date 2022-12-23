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
import { CardMedia } from "@material-ui/core";
import Bg from "../img/bg.jpg";
const dateLocales = ["en-Us", "ru-Ru", "uk-UA"];
const useStyles = makeStyles((theme) => ({
  tableCenter: {
    width: "75%",
    margin: "20px auto",
  },
  bg: {
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
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
    return null;
  }

  function getDentistName(id) {
    const dentist = context.dentists.find((dent) => dent.id === id);
    const propName = ["name", "nameRu", "nameUa"][context.languageCode];
    return dentist[propName];
  }
  function getClinicName(id) {
    try {
      const clinic = context.clinics.find((cl) => cl.id === id);
      const propName = ["title", "titleRu", "titleUa"][context.languageCode];
      return clinic[propName];
    } catch (error) {
      return "N/A"
    }
  }
  function getStatusName(statusCode) {
    const statusLocales = [
      ["Pending", "Confirmed", "Canceled"],
      ["Ожидает рассмотрения", "Подтверждено", "Отменено"],
      ["Очікує на розгляд", "Підтверджено", "Скасовано"],
    ];
    return statusLocales[context.languageCode][statusCode];
  }
  function handleRestoreClick(row) {
    context.updAppointment({ ...row, status: 0 });
  }
  function handleCancelClick(row) {
    context.updAppointment({ ...row, status: 2 });
  }
  return (
    <CardMedia
      image={Bg}
      className={classes.bg}
      style={{ minHeight: "100vh", paddingTop: "20px" }}
    >
      <TableContainer component={Paper} className={classes.tableCenter}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{["Date","Дата","Дата"][context.languageCode]}</TableCell>
              <TableCell align="right">
                {["Clinic", "Клиника", "Клiнiка"][context.languageCode]}
              </TableCell>
              <TableCell align="right">
                {["Dentist", "Стоматолог", "Стоматолог"][context.languageCode]}
              </TableCell>
              <TableCell align="right">
                {["Status", "Статус", "Статус"][context.languageCode]}
              </TableCell>
              <TableCell align="right">
                {["Actions", "Действия", "Дії"][context.languageCode]}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {context.appointments
              .filter((a) => a.clientId === client.id)
              .map((row) => (
                <TableRow
                  style={{
                    backgroundColor: ["#9ACD32", "#90EE90", "#FFB6C1"][
                      row.status
                    ],
                  }}
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {new Date(row.date).toLocaleDateString(dateLocales[context.languageCode], {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell align="right">
                    {getClinicName(row.clinicId)}
                  </TableCell>
                  <TableCell align="right">
                    {getDentistName(row.dentistId)}
                  </TableCell>
                  <TableCell align="right">
                    {getStatusName(row.status)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={() => {
                        handleRestoreClick(row);
                      }}
                    >
                      <RestoreIcon />
                    </IconButton>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={() => {
                        handleCancelClick(row);
                      }}
                    >
                      <BlockIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardMedia>
  );
}

import React, { useContext } from "react";
import { useAuth } from "../contexts/AuthContext";
import DcContext from "../contexts/dc-context";

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
  appointments: {
    cursor: "pointer",
  },
}));

export default function NavBar() {
  const context = useContext(DcContext);
  const { currentUser } = useAuth();
  const history = useHistory();
  const classes = useStyles();
  function handleLanguageChange(e) {
    context.setLanguageCode(e.target.value);
  }
  function handleAccountClick() {
    currentUser ? history.push("/account") : history.push("/login");
  }
  function handleTitleClick() {
    history.push("/");
  }
  function handleClinicsClick() {
    history.replace("/clinics");
  }
  function handleDentistsClick() {
    history.replace("/dentists");
  }
  function handleAppointmentsClick() {
    history.replace("/appointments");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{backgroundColor: '#87CEEB'}}>
          <Typography
            variant="h6"
            style={{marginRight: '40px'}}
            onClick={handleTitleClick}
          >
            {["Dental Platform","Стоматологическая платформа","Cтоматологічна платформа"][context.languageCode]}
          </Typography>
          <Typography
            variant="h6"
            style={{marginRight: '20px'}}
            onClick={handleClinicsClick}
          >
            {["Clinics","Стоматологии","Клiнiки"][context.languageCode]}
          </Typography>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={handleDentistsClick}
          >
            {["Dentists","Стоматологи","Стоматологи"][context.languageCode]}
          </Typography>
          {currentUser && (
            <Typography
              className={classes.appointments}
              onClick={handleAppointmentsClick}
            >
              {
                ["My Appointments", "Мои заявки", "Мої заявки"][
                  context.languageCode
                ]
              }
            </Typography>
          )}
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAccountClick}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <NativeSelect
            defaultValue={context.languageCode}
            onChange={handleLanguageChange}
          >
            <option value={0}>English</option>
            <option value={1}>Российский</option>
            <option value={2}>Українська</option>
          </NativeSelect>
        </Toolbar>
      </AppBar>
    </div>
  );
}

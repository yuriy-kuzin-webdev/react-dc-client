import React, { useContext, useState } from "react";
import Dentist from "./Dentist";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Paper, Button } from "@material-ui/core";
import DcContext from "../contexts/dc-context";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { CardMedia } from "@material-ui/core";
import Bg from "../img/bg.jpg";
import Review from "./Review";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  bg: {
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  },
}));
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const options = { year: "numeric", month: "long", day: "numeric" };

export default function Appointment() {
  const context = useContext(DcContext);
  const { currentUser } = useAuth();
  const [isAppointmentsShow, setIsAppointmentsShow] = useState(true);

  const user =
    currentUser && context.clients.find((c) => c.email === currentUser.email);

  function handleAppointmentClick() {
    setIsAppointmentsShow(true);
  }

  function handleReviewsClick() {
    setIsAppointmentsShow(false);
  }
  const history = useHistory();
  const classes = useStyles();
  function generateDays() {
    // eslint-disable-next-line
    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };

    function getDates(startDate, stopDate) {
      startDate.setHours(0, 0, 0, 0);
      var dateArray = [];
      var currentDate = startDate;
      while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
      }
      return dateArray;
    }
    return getDates(new Date(), new Date().addDays(30));
  }
  const dates = generateDays();
  function handleDateClick(date) {
    if (currentUser) {
      const client = context.clients.find((c) => c.email === currentUser.email);
      if (client) {
        context.addAppointment({
          dentistId: context.selectedDentist.id,
          clinicId: context.selectedDentist.clinicId,
          date: date.toISOString(),
          clientId: client.id,
          status: 0,
        });
        history.replace("/appointments");
      } else {
        history.replace("/account");
      }
    } else {
      history.replace("/signup");
    }
  }
  function renderDatesRow(datesRow) {
    return (
      <Box m={2} className={classes.root}>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {datesRow.map((day) => {
            return (
              <Grid item xs={1} key={day.toLocaleDateString("en-US", options)}>
                <Button
                  onClick={() => {
                    handleDateClick(day);
                  }}
                  variant="contained"
                  color="primary"
                >
                  {day.toLocaleDateString("en-US", options)}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  }
  function renderAppointments() {
    return (
      <>
        <Box m={2} className={classes.root}>
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {dates.slice(0, 7).map((day) => {
              return (
                <Grid
                  item
                  xs={1}
                  key={"h" + day.toLocaleDateString("en-US", options)}
                >
                  <Paper className={classes.paper}>{days[day.getDay()]}</Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        {renderDatesRow(dates.slice(0, 7))}
        {renderDatesRow(dates.slice(7, 14))}
        {renderDatesRow(dates.slice(14, 21))}
        {renderDatesRow(dates.slice(21, 28))}
      </>
    );
  }
  function renderReviews() {
    return (
      <Box m={2} className={classes.root}>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {context.dentistReviews
            .filter((review) => review.dentistId === context.selectedDentist.id)
            .map((rev) => {
              return <Review key={rev.id} review={rev} dentist />;
            })}
        </Grid>
      </Box>
    );
  }
  return (
    <CardMedia
      image={Bg}
      className={classes.bg}
      style={{ minHeight: "100vh", paddingTop: "20px" }}
    >
      <div className={classes.root}>
        <Box m={2} className={classes.root}>
          <Grid
            container
            className={classes.grid}
            spacing={2}
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Temporatory dentist */}
            <Dentist
              dentist={context.selectedDentist}
              withButtons
              onAppointmentClick={handleAppointmentClick}
              onReviewsClick={handleReviewsClick}
            />
          </Grid>
        </Box>
        {isAppointmentsShow ? renderAppointments() : renderReviews()}
      </div>
    </CardMedia>
  );
}

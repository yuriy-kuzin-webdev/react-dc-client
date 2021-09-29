import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import DcContext from "../contexts/dc-context";
import { useContext } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    height: 200,
    width: 200,
    backgroundSize: "contain",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function Clinic({ clinic }) {
  const context = useContext(DcContext);
  const classes = useStyles();
  const history = useHistory();
  function handleClinicClick() {
    context.selectClinic(clinic);
    history.push("/dentists");
  }
  return (
    <Grid
      item
      xs={10}
      sm={10}
      md={8}
      lg={8}
      component={Box}
      m={2}
      className={classes.root}
    >
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={clinic.image ? clinic.image : "/cl_anon.jpg"}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {clinic.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {clinic.district}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {clinic.address}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {clinic.phone}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <Button size="small" color="primary" onClick={handleClinicClick}>
              Make an appointment
            </Button>
          </div>
        </div>
      </Card>
    </Grid>
  );
}

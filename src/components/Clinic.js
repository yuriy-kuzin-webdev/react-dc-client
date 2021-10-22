import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

import DcContext from "../contexts/dc-context";
import { useContext } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    cursor: "pointer",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    minWidth: 200,
    height: 200,
    width: 200,
    backgroundSize: "contain",
  },
  controls: {
    display: "flex",
    alignItems: "flex-start",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function Clinic({
  clinic,
  withButtons,
  onDentistClick,
  onReviewsClick,
}) {
  const context = useContext(DcContext);
  const classes = useStyles();
  const history = useHistory();
  function handleClinicClick() {
    context.selectClinic(clinic);
    history.push("/dentists");
  }
  function getClinicInfo(clinicId) {
    const info = context.clinicInformations.find(
      (cl) => cl.clinicId === clinic.id
    );
    return info[
      ["description", "descriptionRu", "descriptionUa"][context.languageCode]
    ];
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
      <Card className={classes.root} onClick={handleClinicClick}>
        <CardMedia
          className={classes.cover}
          image={clinic.image ? clinic.image : "/cl_anon.jpg"}
          style={{ margin: "10px" }}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {clinic[["title", "titleRu", "titleUa"][context.languageCode]]}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {getClinicInfo(clinic.id)}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {
                clinic[
                  ["address", "addressRu", "addressUa"][context.languageCode]
                ]
              }
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {clinic.phone}
            </Typography>
          </CardContent>
          {withButtons && (
            <div className={classes.controls}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={2} lg={2}>
                  <FormControl className={classes.width}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#87CEEB", height: '20px' }}
                      onClick={onDentistClick}
                    >
                      {["Dentists", "Стоматологи", "Стоматологи"][context.languageCode]}
                    </Button>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={2} lg={2}>
                  <FormControl className={classes.width}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#87CEEB", height: '20px' }}
                      onClick={onReviewsClick}
                    >
                      {["Reviews", "Отзывы", "Вiдгуки"][context.languageCode]}
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </Card>
    </Grid>
  );
}

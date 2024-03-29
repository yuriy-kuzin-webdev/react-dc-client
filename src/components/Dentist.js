import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import DcContext from "../contexts/dc-context";

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

export default function Dentist({ dentist, withButtons, onAppointmentClick, onReviewsClick }) {

  const context = useContext(DcContext);
  const classes = useStyles();
  const history = useHistory();
  function handleDentistClick() {
    context.selectDentist(dentist)
    history.replace("/appointment");
  }
  function getDentistInfo(dentistId) {
    try {
      const info = context.dentistInformations.find(
        (dent) => dent.dentistId === dentist.id
      );
      return info[
        ["description", "descriptionRu", "descriptionUa"][context.languageCode]
      ];
    } catch (error) {
      history.replace("/");
    }
  }
  function getClinicName() {
    try {
      const clinic = context.clinics.find(c => c.id === dentist.clinicId);
      return clinic[["title","titleRu","titleUa"][context.languageCode]];
    } catch (error) {
      history.replace("/");
    } 
  }
  function getDentistType() {
    try {
      return [["Dentist","Стоматолог","Стоматолог"],["Surgeon","Хирург","Хiрург"]][dentist.type - 1][context.languageCode]  
    } catch (error) {
      history.replace("/");
    } 
  }
  while(!dentist){}
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
      <Card className={classes.root} onClick={handleDentistClick}>
      <CardMedia
          className={classes.cover}
          image={dentist.image ? dentist.image : "/de_anon.jpg"}
          style={{ margin: "10px" }}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="subtitle1" color="textSecondary">
              {getDentistType()}
            </Typography>
            <Typography component="h5" variant="h5">
              {dentist[["name","nameRu","nameUa"][context.languageCode]]}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {getClinicName()}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {getDentistInfo(dentist.id)}
            </Typography>
          </CardContent>
          {withButtons && (
            <div className={classes.controls}>
              <Grid container spacing={2}>
                <Grid item >
                  <FormControl className={classes.width}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#87CEEB", height: '20px', flexGrow: 1 }}
                      onClick={onAppointmentClick}
                    >
                      {["Appointment", "Запись", "Записатися"][context.languageCode]}
                    </Button>
                  </FormControl>
                </Grid>
                <Grid item >
                  <FormControl className={classes.width}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#87CEEB", height: '20px'}}
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

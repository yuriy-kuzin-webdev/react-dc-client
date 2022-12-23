import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Card, CardHeader, CardMedia } from "@material-ui/core";
import DcContext from "../contexts/dc-context";

const useStyles = makeStyles((theme) => ({
  width: {
    width: "100%",
  },
  grid: {
    padding: theme.spacing(10),
    flexGrow: 1,
  },
  card: {
    cursor: "pointer",
    margin: theme.spacing(2),
    backgroundColor: "#87CEEB",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function ContentCards() {
  const context = useContext(DcContext);
  const history = useHistory();
  function handleDentistCardClick() {
    history.push("/dentists");
  }
  function handleClinicCardClick() {
    history.push("/clinics");
  }
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={10}
      className={classes.grid}
      justifyContent="center"
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={3}
        lg={3}
        component={Card}
        className={classes.card}
        onClick={handleDentistCardClick}
        style={{ padding: "10px" }}
      >
        <CardHeader
          title={["Dentist","Стоматолог","Стоматолог"][context.languageCode]}
          subheader={["Choose and make an appointment with the dentists near you","Выберите и запишитесь на прием к ближайшему к вам стоматологу","Виберіть та запишіться на прийом до стоматологів поблизу вас"][context.languageCode]}
          style={{ backgroundColor: "white" }}
        />
        <CardMedia
          className={classes.media}
          image="/dentist.png"
          style={{ backgroundColor: "white", backgroundPosition: "unset" }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={3}
        lg={3}
        component={Card}
        className={classes.card}
        onClick={handleClinicCardClick}
        style={{ padding: "10px" }}
      >
        <CardHeader
          title={["Clinics","Стоматологии","Стоматології"][context.languageCode]}
          subheader={["Find a dental facility with a convenient location","Найдите стоматологическое учреждение с удобным расположением","Знайдіть стоматологічний заклад із зручним місцем розташування"][context.languageCode]}
          style={{
            backgroundColor: "white",
            minHeight: "136px",
            alignItems: "flex-start",
          }}
        />
        <CardMedia
          className={classes.media}
          image="/clinic.png"
          style={{ backgroundColor: "white" }}
        />
      </Grid>
    </Grid>
  );
}

import React, {useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography } from "@material-ui/core";
import Clinic from "./Clinic";
import { CardMedia } from "@material-ui/core";
import Bg from "../img/bg.jpg";

import DcContext from "../contexts/dc-context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bg: {
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  },
}));

export default function Clinics() {
  const classes = useStyles();
  const context = useContext(DcContext);

  return (
    <CardMedia image={Bg} className={classes.bg}>
    <div className={classes.root}>
      <Box m={2}>
        <Typography component="h1" variant="h5" align="center">
          {["Clinics in your city","Стоматологии в вашем городе","Стоматології вашого мiста "][context.languageCode]}
        </Typography>
      </Box>
      <Box m={2} className={classes.root}>
        <Grid
          container
          className={classes.grid}
          spacing={2}
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          {context.clinics.map((clinic) => {
            return <Clinic key={clinic.id} clinic={clinic} />;
          })}
        </Grid>
      </Box>
    </div>
    </CardMedia>
  );
}

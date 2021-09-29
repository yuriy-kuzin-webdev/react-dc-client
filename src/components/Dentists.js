import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography } from "@material-ui/core";
import Dentist from "./Dentist";
import Clinic from "./Clinic";

import DcContext from "../contexts/dc-context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Dentists() {
  const classes = useStyles();
  const context = useContext(DcContext);

  return (
    <div className={classes.root}>
      <Box m={2} className={classes.root}>
        {context.selectedClinic && context.selectedClinic.id ? (
          <Grid
            container
            className={classes.grid}
            spacing={2}
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Clinic clinic={context.selectedClinic} />
          </Grid>
        ) : (
          <Typography component="h1" variant="h5" align="center">
            "Dentists in your city"
          </Typography>
        )}
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
          {context.selectedClinic && context.selectedClinic.id
            ? context.dentists.filter(
                (dentist) => dentist.clinicId === context.selectedClinic.id
              ).map((dentist) => {
                return <Dentist key={dentist.id} dentist={dentist} />;
              })
            : context.dentists.map((dentist) => {
                return <Dentist key={dentist.id} dentist={dentist} />;
              })}
        </Grid>
      </Box>
    </div>
  );
}

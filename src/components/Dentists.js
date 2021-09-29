import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography } from "@material-ui/core";
import Dentist from "./Dentist";

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
      {/* provider selected clinic && display it */}
      <Box m={2}>
        <Typography component="h1" variant="h5" align="center">
          Dentists in your city
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
          {context.dentists.map((dentist) => {
            return <Dentist key={dentist.id} dentist={dentist} />;
          })}
        </Grid>
      </Box>
    </div>
  );
}

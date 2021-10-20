import React from "react";
import SearchBoxToolBar from "./SearchBoxToolBar";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import ContentCards from "./ContentCards";
import { CardMedia } from "@material-ui/core";
import Bg from "../img/bg.jpg";

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  bg: {
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    height: '100vh',
  },
}));

export default function Content() {
  //M-UI single line
  const classes = useStyles();

  return (
    <CardMedia image={Bg} className={classes.bg}>
      <Container maxWidth="lg" className={classes.content}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h3">
            Find dentist or clinic online
          </Typography>
          <Typography component="p" variant="subtitle1" color="textSecondary">
            make an appointment at a convenient time
          </Typography>
          <SearchBoxToolBar />
          <ContentCards />
        </div>
      </Container>
    </CardMedia>
  );
}

import React, { useContext } from "react";
import SearchBoxToolBar from "./SearchBoxToolBar";
import DcContext from "../contexts/dc-context";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import ContentCards from "./ContentCards";
import { CardMedia } from "@material-ui/core";
import Bg from "../img/bg.jpg";
import Helper from "./Helper";

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
  },
}));

export default function Content() {
  const context = useContext(DcContext);
  //M-UI single line
  const classes = useStyles();

  return (
    <CardMedia image={Bg} className={classes.bg} style={{minHeight: '100vh'}}>
      <Container maxWidth="lg" className={classes.content}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h3">
            {["Find dentist or clinic online","Найдите стоматолога или клинику онлайн","Знайдіть стоматолога або клініку в Інтернеті"][context.languageCode]}
          </Typography>
          <Typography component="p" variant="subtitle1" color="textSecondary">
            {["make an appointment at a convenient time","записаться на прием в удобное время","записатися на прийом у зручний час"][context.languageCode]}
          </Typography>
          <SearchBoxToolBar />
          <ContentCards />
          <Helper/>
        </div>
      </Container>
    </CardMedia>
  );
}

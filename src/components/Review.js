import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DcContext from "../contexts/dc-context";
import FormControl from "@material-ui/core/FormControl";
import { useAuth } from "../contexts/AuthContext";

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
    width: 200,
    height: 200,
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
  width: {
    width: "100%",
  },
}));

export default function Review({ review }) {
  const context = useContext(DcContext);
  const { currentUser } = useAuth();
  const user = currentUser && context.clients.find((c) => c.email === currentUser.email);
  const isOwner = user && user.id === review.clientId;

  const classes = useStyles();
  function getPostOwner(id) {
    return context.clients.find((client) => client.id === id).name;
  }
  return (
    <Grid
      item
      xs={10}
      sm={10}
      md={7}
      lg={7}
      component={Box}
      m={2}
      className={classes.root}
    >
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="subtitle1" color="textSecondary">
              {["Rate", "Оценка", "Оцiнка"][context.languageCode]}{" "}
              {"" + review.rate + "/5"}
            </Typography>
            <Typography component="h5" variant="h5">
              {review.message}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {getPostOwner(review.clientId)}
            </Typography>
          </CardContent>
          {isOwner && (
            <div className={classes.controls}>
              <Grid container spacing={2}>
                <Grid>
                  <FormControl className={classes.width}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#87CEEB", height: "20px", margin: '5px' }}
                    >
                      {
                        ["Edit", "Редактировать", "Редагувати"][
                          context.languageCode
                        ]
                      }
                    </Button>
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl className={classes.width}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#87CEEB", height: "20px", margin: '5px' }}
                    >
                      {["Delete", "Удалить", "Видалити"][context.languageCode]}
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

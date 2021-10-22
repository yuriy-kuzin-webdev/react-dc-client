import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import React, { useContext, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import DcContext from "../contexts/dc-context";

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

export default function ReviewForm({ onPost, review }) {
  const classes = useStyles();
  const context = useContext(DcContext);
  const rateRef = useRef();
  const messageRef = useRef();
  const rate = review && review.rate;
  const message = review && review.message;
  const id = review && review.id;
  function onSubmitPost() {
    let data = {
      rate: parseInt(rateRef.current.value),
      message: messageRef.current.value,
    };
    if (id) {
      data.id = id;
    }
    onPost(data);
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
      <Card className={classes.root} style={{ flexGrow: 1 }}>
        <div className={classes.details} style={{ flexGrow: 1 }}>
          <CardContent className={classes.content} style={{ flexGrow: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="rate"
              label={["Rate", "Оценка", "Оцiнка"][context.languageCode]}
              name="rate"
              autoFocus
              inputRef={rateRef}
              defaultValue={rate}
            />
            <TextField
              style={{ display: "flex", flexGrow: 1 }}
              placeholder={
                [
                  "Leave a review text here",
                  "Оставьте здесь свое сообщение",
                  "Залиште тут свiй вiдгук",
                ][context.languageCode]
              }
              multiline
              minRows={4}
              maxRows={6}
              inputRef={messageRef}
              defaultValue={message}
            />
          </CardContent>
          <div className={classes.controls}>
            <Grid container spacing={2}>
              <Grid>
                <FormControl className={classes.width}>
                  <Button
                    onClick={onSubmitPost}
                    variant="contained"
                    style={{
                      backgroundColor: "#87CEEB",
                      height: "20px",
                      margin: "5px",
                    }}
                  >
                    {
                      ["Post", "Оставить отзыв", "Залишити вiдгук"][
                        context.languageCode
                      ]
                    }
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </div>
      </Card>
    </Grid>
  );
}

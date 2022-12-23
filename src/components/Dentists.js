import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography } from "@material-ui/core";
import Dentist from "./Dentist";
import Clinic from "./Clinic";
import { CardMedia } from "@material-ui/core";
import Bg from "../img/bg.jpg";

import DcContext from "../contexts/dc-context";
import Review from "./Review";
import { useAuth } from "../contexts/AuthContext";
import ReviewForm from "./ReviewForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  bg: {
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  },
}));

export default function Dentists() {
  const classes = useStyles();
  const context = useContext(DcContext);
  const [isDentistsShow, setIsDentistsShow] = useState(true);
  const { currentUser } = useAuth();
  const user =
    currentUser && context.clients.find((c) => c.email === currentUser.email);
  function canUserCreatePost() {
    if (user && context.selectedClinic) {
      const currentClinicReviews = context.clinicReviews.filter(
        (review) => review.clinicId === context.selectedClinic.id
      );
      return !currentClinicReviews.some(
        (review) => review.clientId === user.id
      );
    } else {
      return false;
    }
  }
  function dentistClickHandler() {
    setIsDentistsShow(true);
  }

  function reviewsClickHandler() {
    setIsDentistsShow(false);
  }
  function handleCreatePost(review) {
    context.addClinicReview({...review,clientId : user.id, clinicId: context.selectedClinic.id});
  }
  function handleEditPost(review) {
    context.updClinicReview({...review, clientId : user.id, clinicId : context.selectedClinic.id});
  }
  function handleDeletePost(review) {
    context.delClinicReview(review.id)
  }

  return (
    <CardMedia image={Bg} className={classes.bg} style={{ minHeight: "100vh" }}>
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
              <Clinic
                clinic={context.selectedClinic}
                withButtons
                onDentistClick={dentistClickHandler}
                onReviewsClick={reviewsClickHandler}
              />
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
            {isDentistsShow
              ? context.selectedClinic && context.selectedClinic.id
                ? context.dentists
                    .filter(
                      (dentist) =>
                        dentist.clinicId === context.selectedClinic.id
                    )
                    .map((dentist) => {
                      return <Dentist key={dentist.id} dentist={dentist} />;
                    })
                : context.dentists.map((dentist) => {
                    return <Dentist key={dentist.id} dentist={dentist} />;
                  })
              : context.clinicReviews
                  .filter(
                    (review) => review.clinicId === context.selectedClinic.id
                  )
                  .map((rev) => {
                    return <Review key={rev.id} review={rev} onEdit={handleEditPost} onDelete={handleDeletePost}/>;
                  })}
                  {!isDentistsShow && canUserCreatePost() && <ReviewForm onPost={handleCreatePost}/>}
          </Grid>
        </Box>
      </div>
    </CardMedia>
  );
}

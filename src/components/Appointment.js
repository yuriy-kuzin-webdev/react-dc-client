import React from 'react'
import { FAKE_DENTISTS } from './Dentists'
import Dentist from './Dentist'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid, Paper, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}))
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const options = { year: 'numeric', month: 'long', day: 'numeric' };

export default function Appointment() {
    const classes = useStyles()
    function generateDays() {
        // eslint-disable-next-line
        Date.prototype.addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }

        function getDates(startDate, stopDate) {
            var dateArray = []
            var currentDate = startDate;
            while (currentDate <= stopDate) {
                dateArray.push(new Date(currentDate));
                currentDate = currentDate.addDays(1);
            }
            return dateArray;
        }
        return getDates(new Date(), new Date().addDays(30))
    }
    const dates = generateDays()
    return (
        <div className={classes.root}>
            <Box m={2} className={classes.root}>
                <Grid container className={classes.grid} spacing={2} direction="column" justifyContent="space-between" alignItems="center">
                    {/* Temporatory dentist */}
                    <Dentist dentist={FAKE_DENTISTS[1]} />
                </Grid>
            </Box>
            <Box m={2} className={classes.root}>
                <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                    {dates.slice(0, 7).map(day => {
                        return (
                            <Grid item xs={1}>
                                <Paper className={classes.paper}>{days[day.getDay()]}</Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
            <Box m={2} className={classes.root}>
                <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                    {dates.slice(0, 7).map(day => {
                        return (
                            <Grid item xs={1}>
                                <Button variant="contained" color="primary">{day.toLocaleDateString("en-US", options)}</Button>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
            <Box m={2} className={classes.root}>
                <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                    {dates.slice(7, 14).map(day => {
                        return (
                            <Grid item xs={1}>
                                <Button variant="contained" color="primary">{day.toLocaleDateString("en-US", options)}</Button>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
            <Box m={2} className={classes.root}>
                <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                    {dates.slice(14, 21).map(day => {
                        return (
                            <Grid item xs={1}>
                                <Button variant="contained" color="primary">{day.toLocaleDateString("en-US", options)}</Button>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
            <Box m={2} className={classes.root}>
                <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                    {dates.slice(21, 28).map(day => {
                        return (
                            <Grid item xs={1}>
                                <Button variant="contained" color="primary">{day.toLocaleDateString("en-US", options)}</Button>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </div>
    )
}

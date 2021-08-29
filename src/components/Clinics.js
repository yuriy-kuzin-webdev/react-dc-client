import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid, Typography } from '@material-ui/core';
import Clinic from './Clinic';

const FAKE_CLINICS = [
    {
        id: 1,
        title: "Dental Union",
        district: "Kyivskyi",
        address: "Pushkins'ka str,30",
        phone: "+380577143418"
    },
    {
        id: 2,
        title: "Dental Clinic Blesk",
        district: "Kyivskyi",
        address: "Molochna str,20",
        phone: "+380577324420"
    },
    {
        id: 3,
        title: "Z3",
        district: "Kyivskyi",
        address: "Malomyasnytska St, 9/11",
        phone: "+380504014011"
    },
]

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
}))

export default function Clinics() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Box m={2}>
                <Typography component="h1" variant="h5" align="center">Clinics in your city</Typography>
            </Box>
            <Box m={2} className={classes.root}>
                <Grid container className={classes.grid} spacing={2} direction="column" justifyContent="space-between" alignItems="center">
                    {FAKE_CLINICS.map(clinic => {
                        return <Clinic key={clinic.id} clinic={clinic} />
                    })}
                </Grid>
            </Box>
        </div>
    )
}

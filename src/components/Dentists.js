import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid, Typography } from '@material-ui/core';
import Dentist from './Dentist';

export const FAKE_DENTISTS = [
    {
        id: 1,
        type: "Dentist",
        name: "Hanna Olegovna Ryinkovska",
        clinic_id: 1,
        clinic_name: "Dental Union",
    },
    {
        id: 2,
        type: "Dentist",
        name: "Katerina Olegovna Ryinkovska",
        clinic_id: 1,
        clinic_name: "Dental Union",
    },
    {
        id: 3,
        type: "Dentist",
        name: "Victoria Borisovna Grebenyuk",
        clinic_id: 1,
        clinic_name: "Dental Union",
    },
    {
        id: 4,
        type: "Dentist",
        name: "Jane Von Doe",
        clinic_id: 2,
        clinic_name: "Dental Clinic Blesk",
    },
    {
        id: 5,
        type: "Dentist",
        name: "Annbelle Von Doe",
        clinic_id: 2,
        clinic_name: "Dental Clinic Blesk",
    },    
    {
        id: 6,
        type: "Dentist",
        name: "Olivia Von Doe",
        clinic_id: 2,
        clinic_name: "Dental Clinic Blesk",
    },
    {
        id: 7,
        type: "Dentist",
        name: "Helen Obero Silva",
        clinic_id: 3,
        clinic_name: "Z3",
    },
    {
        id: 8,
        type: "Dentist",
        name: "Meina Obero Silva",
        clinic_id: 3,
        clinic_name: "Z3",
    },
]

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
}))

export default function Dentists() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            {/* provider selected clinic && display it */}
            <Box m={2}>
                <Typography component="h1" variant="h5" align="center">Dentists in your city</Typography>
            </Box>
            <Box m={2} className={classes.root}>
                <Grid container className={classes.grid} spacing={2} direction="column" justifyContent="space-between" alignItems="center">
                    {FAKE_DENTISTS.map(dentist => {
                        return <Dentist key={dentist.id} dentist={dentist} />
                    })}
                </Grid>
            </Box>
        </div>
    )
}

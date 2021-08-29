import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Card, CardHeader, CardMedia } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    width: {
        width: '100%'
    },
    grid: {
        padding: theme.spacing(10),
        flexGrow: 1
    },
    card: {
        cursor: 'pointer',
        margin: theme.spacing(2)
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}))

export default function ContentCards() {
    const history = useHistory()
    function handleDentistCardClick(){
        history.push('/dentists')
    }
    function handleClinicCardClick(){
        history.push('/clinics')
    }
    const classes = useStyles()
    return (
        <Grid container spacing={10} className={classes.grid} justifyContent='center'>
            <Grid item xs={12} sm={12} md={3} lg={3} component={Card} className={classes.card} onClick={handleDentistCardClick}>
                <CardHeader title="Dentist" subheader="Choose and make an appointment with the dentists near you" />
                <CardMedia className={classes.media} image='/dentist.png'/>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} component={Card} className={classes.card} onClick={handleClinicCardClick}>
                <CardHeader title="Clinics" subheader="Find a dental facility with a convenient location" />
                <CardMedia className={classes.media} image='/clinic.jpg'/>
            </Grid>
        </Grid>
    )
}

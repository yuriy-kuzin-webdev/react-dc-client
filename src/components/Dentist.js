import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 200,
        height: 200,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}))

export default function Dentist({ dentist }) {
    const classes = useStyles()
    const history = useHistory()
    function handleDentistClick(dentist) {
        //Set the selected dentist to provider
        console.log(JSON.stringify(dentist))
        history.push('/appointment')
    }
    return (

        <Grid item xs={10} sm={10} md={8} lg={8} component={Box} m={2} className={classes.root}>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.cover}
                    image="/de_anon.jpg"
                    title="Live from space album cover"
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="subtitle1" color="textSecondary">{dentist.type}</Typography>
                        <Typography component="h5" variant="h5">{dentist.name}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">{dentist.clinic_name}</Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <Button size="small" color="primary" onClick={()=> handleDentistClick(dentist)}>Make an appointment</Button>
                    </div>
                </div>
            </Card>
        </Grid>

    )
}

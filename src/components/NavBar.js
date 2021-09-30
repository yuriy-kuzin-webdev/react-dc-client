import React from 'react';
import { useAuth } from '../contexts/AuthContext'


import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        cursor: 'pointer'
    },
    appointments: {
        cursor: 'pointer'
    }
}));

export default function NavBar() {
    const { currentUser } = useAuth()
    const history = useHistory()
    const classes = useStyles();
    function handleAccountClick() {
        currentUser ? history.push('/account') : history.push('/login')
    }
    function handleTitleClick() {
        history.push('/')
    }
    function handleAppointmentsClick() {
        history.replace('/appointments');
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} onClick={handleTitleClick}>Find the best dentist in your city</Typography>
                    {currentUser && <Typography className={classes.appointments} onClick={handleAppointmentsClick}>My Appointments</Typography>}
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleAccountClick}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
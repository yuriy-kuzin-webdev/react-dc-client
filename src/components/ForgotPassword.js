import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

//M-UI start
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
//M-UI end

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    //M-UI single line
    const classes = useStyles();

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        } catch (error) {
            setError('Failed to reset password')
        }
        setLoading(false)
    }

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Password Reset</Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        inputRef={emailRef}
                    />
                    {error &&
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <strong>{error}</strong>
                        </Alert>
                    }
                    {message &&
                        <Alert severity="success">
                            <AlertTitle>Success!</AlertTitle>
                            <strong>{message}</strong>
                        </Alert>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={loading}
                    >Reset Password</Button>
                </form>
                <Box mt={1}>
                    Already have an account ? <Link to="/login">Log In</Link>
                </Box>
                <Box mt={1}>
                    Need an account ? <Link to="/signup">Sign Up</Link>
                </Box>
            </div>
        </Container>
    )
}

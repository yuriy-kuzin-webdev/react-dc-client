import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
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

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    //M-UI single line
    const classes = useStyles();

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/account')
        } catch (error) {
            setError('Failed to log in')
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
                <Typography component="h1" variant="h5">Log In</Typography>
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputRef={passwordRef}
                    />
                    {error &&
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <strong>{error}</strong>
                        </Alert>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={loading}
                    >Log In</Button>
                </form>
                <Box mt={1}>
                    <Link to="/forgot-password">Forgot Password</Link>
                </Box>
                <Box mt={1}>
                Need an account ? <Link to="/signup">Sign Up</Link>
                </Box>
            </div>
        </Container>
        // <form onSubmit={handleSubmit}>
        //     <p>Log In</p>
        //     {error && <p>{error}</p>}
        //     <p><input type="email" id="email" ref={emailRef} required /></p>
        //     <p><input type="password" id="password" ref={passwordRef} required /></p>
        //     <p><button type="submit" disabled={loading}>Log In</button></p>
        //     <p><Link to="/forgot-password">Forgot Password ?</Link></p>
        //     <p>Need an account ? <Link to="/signup">Sign up</Link></p>
        // </form>
    )
}

import React, { useRef, useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DcContext from "../contexts/dc-context";

//M-UI start
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
//M-UI end

export default function Signup() {
  const context = useContext(DcContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  //M-UI single line
  const classes = useStyles();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/account");
    } catch (error) {
      console.log(error);
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {["Sign Up","Регистрация","Реєстрацiя"][context.languageCode]}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={["Email address","Электронная почта","Електронна пошта"][context.languageCode]}
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
            label={["Password","Пароль","Пароль"][context.languageCode]}
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Repeat Password"
            label={["Repeat password","Повторите пароль","Повторіть Пароль"][context.languageCode]}
            type="password"
            id="password-confirm"
            autoComplete="Repeat Password"
            inputRef={passwordConfirmRef}
          />
          {error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <strong>{error}</strong>
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            {["Sign Up","Зарегистрироваться","Зареєструватись"][context.languageCode]}
          </Button>
        </form>
        <Box mt={1}>
          {["Already have an account","Уже есть аккаунт","Вже є аккаунт"][context.languageCode]} ? <Link to="/login">{["Log In","Вход","Вхiд"][context.languageCode]}</Link>
        </Box>
      </div>
    </Container>
  );
}

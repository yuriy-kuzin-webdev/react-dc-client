import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DcContext from "../contexts/dc-context";
import { useContext } from "react";

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

export default function Account() {
  const context = useContext(DcContext);
  const nameRef = useRef();
  const phoneRef = useRef();
  const [loading, setLoading] = useState(false);
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  const client = context.clients.find((c) => c.email === currentUser.email);
  const clientName = client && client.name;
  const clientPhone = client && client.phone;

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/");
    } catch (error) {
      setError("Failed to logout");
    }
  }

  //M-UI single line
  const classes = useStyles();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      if (client) {
        client.name = nameRef.current.value;
        client.phone = phoneRef.current.value;
        context.updClient(client);
      } else {
        context.addClient({
          name: nameRef.current.value,
          email: currentUser.email,
          phone: phoneRef.current.value,
        });
      }
    } catch (error) {
      console.log(error);
      setError("Failed to update an account");
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
          {["Profile info","Персональная информация","Персональна інформація"][context.languageCode]}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={["Full Name","Полное имя","Повне ім'я"][context.languageCode]}
            inputRef={nameRef}
            defaultValue={clientName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={["Contact phone","Контактный телефон","Контактний телефон"][context.languageCode]}
            inputRef={phoneRef}
            defaultValue={clientPhone}
          />
          <TextField
            variant="outlined"
            margin="normal"
            disabled
            fullWidth
            label={["Email","Электронная почта","Електронна пошта"][context.languageCode]}
            defaultValue={currentUser.email}
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
            {["Update info","Обновить информацию","Поновити Iнформацiю"][context.languageCode]}
          </Button>
        </form>
        <Box mt={1}>
          <Button
            onClick={handleLogout}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            {["Log out","Выйти","Вийти"][context.languageCode]}
          </Button>
        </Box>
      </div>
    </Container>
  );
}

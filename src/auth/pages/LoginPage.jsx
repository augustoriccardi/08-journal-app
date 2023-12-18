import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Link,
  Alert,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth";

const formData = {
  email: "",
  password: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe de tener una @"],
  password: [
    (value) => value.length >= 6,
    "El password debe de tener más de 6 letras",
  ],
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    email,
    password,
    onInputChange,
    emailValid,
    passwordValid,
    isFormValid,
  } = useForm(formData, formValidations);

  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    // console.log("onGoogleSignIn");
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              onChange={onInputChange}
              value={email}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              onChange={onInputChange}
              value={password}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            ></TextField>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              disabled={isCheckingAuthentication}
              type="submit"
              variant="contained"
              fullWidth
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              disabled={isCheckingAuthentication}
              onClick={onGoogleSignIn}
              variant="contained"
              fullWidth
            >
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>

      <Grid container direction="row" justifyContent="end">
        <Link component={RouterLink} color="inherit" to="/auth/register">
          Crear una cuenta
        </Link>
      </Grid>
    </AuthLayout>
  );
};

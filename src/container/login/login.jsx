import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";

import { useAuth } from "../../hooks";
import { regexConfig } from '../../constants/regex';

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [usernameMessageError, setUsernameMessageError] = useState(null);
  const [passwordMessageError, setPasswordMessageError] = useState(null);

  const validateUsernameRequired = (value) => {
    if (!value || value.length === 0) {
      setUsernameMessageError("El correo es obligatorio");
      setUsernameError(true);
    } else {
      setUsernameMessageError("");
      setUsernameError(false);
    }
  };

  const emailValidation = (value) => {
    const regex = regexConfig.emailFormat;
    if (!regex.test(value)) {
      setUsernameMessageError("El correo no es válido");
      setUsernameError(true);
    } else {
      setUsernameMessageError("");
      setUsernameError(false);
    }
  }

  const validatePasswordRequired = (value) => {
    if (!value || value.length === 0) {
      setPasswordMessageError("La contraseña es obligatoria");
      setPasswordError(true);
    } else {
      setPasswordMessageError("");
      setPasswordError(false);
    }
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
    validateUsernameRequired(value);
    emailValidation(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    validatePasswordRequired(value);
  };

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();

    auth.signin({ username, password }, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        sx={{
          "& > :not(style)": { m: 1, width: "500px" },
          display: "flex",
          flexDirection: "column",
          border: "1px solid #d8d8d8",
          borderRadius: "8px",
          padding: "24px",
        }}
      >
        <TextField
          id="username"
          name="username"
          label="Correo"
          variant="outlined"
          helperText={usernameMessageError}
          error={usernameError}
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          id="password"
          name="password"
          label="Contraseña"
          variant="outlined"
          type="password"
          helperText={passwordMessageError}
          error={passwordError}
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          type="submit"
          variant="outlined"
          disabled={
            passwordError === null ||
            passwordError ||
            usernameError === null ||
            usernameError
          }
        >
          Iniciar sesión
        </Button>
      </Box>
    </Container>
  );
}

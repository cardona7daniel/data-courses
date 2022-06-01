import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { regexConfig } from '../../constants/regex';

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export function RegisterPage() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [roleError, setRoleError] = useState(null);
  const [usernameMessageError, setUsernameMessageError] = useState(null);
  const [passwordMessageError, setPasswordMessageError] = useState(null);
  const [confirmPasswordMessageError, setConfirmPasswordMessageError] =
    useState(null);
  const [roleMessageError, setRoleMessageError] = useState(null);

  const roleChange = (event) => {
    const value = event.target.value;
    setRole(value);
    validateRoleRequired(value);
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

  const validateRoleRequired = (value) => {
    if (!value || value.length === 0) {
      setRoleMessageError("Debe seleccionar un rol");
      setRoleError(true);
    } else {
      setRoleMessageError("");
      setRoleError(false);
    }
  };

  const validateUsernameRequired = (value) => {
    if (!value || value.length === 0) {
      setUsernameMessageError("El correo es obligatorio");
      setUsernameError(true);
    } else {
      setUsernameMessageError("");
      setUsernameError(false);
    }
  };

  const validatePasswordRequired = (value) => {
    if (!value || value.length === 0) {
      setPasswordMessageError("La contraseña es obligatoria");
      setPasswordError(true);
    } else {
      setPasswordMessageError("");
      setPasswordError(false);
    }
  };

  const validateConfirmPasswordRequired = (value) => {
    if (!value || value.length === 0) {
      setConfirmPasswordMessageError("La contraseña es obligatoria");
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordMessageError("");
      setConfirmPasswordError(false);
    }
  };

  const validateMatchPassword = (value, lastPass) => {
    if (value !== lastPass) {
      setConfirmPasswordMessageError("Las contraseñas no coinciden");
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordMessageError("");
      setConfirmPasswordError(false);
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

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
    validateConfirmPasswordRequired(value);
    validateMatchPassword(value, password);
  };

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/login");
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
          required
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
          required
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
        <TextField
          required
          id="confirm_password"
          name="confirm_password"
          label="Confirmar contraseña"
          variant="outlined"
          type="password"
          helperText={confirmPasswordMessageError}
          error={confirmPasswordError}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <FormControl required error={roleError}>
          <InputLabel id="role-label">Rol</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            label="Rol"
            value={role}
            onChange={roleChange}
          >
            <MenuItem value="">
              <em>Ninguno</em>
            </MenuItem>
            <MenuItem value="ADMIN">Administrador</MenuItem>
            <MenuItem value="TEACHER">Profesor</MenuItem>
            <MenuItem value="STUDENT">Estudiante</MenuItem>
          </Select>
          <FormHelperText>{roleMessageError}</FormHelperText>
        </FormControl>
        <Button
          type="submit"
          variant="outlined"
          disabled={
            passwordError === null ||
            passwordError ||
            usernameError === null ||
            usernameError ||
            confirmPasswordError === null ||
            confirmPasswordError ||
            roleError === null ||
            roleError
          }
        >
          Registrarse
        </Button>
      </Box>
    </Container>
  );
}

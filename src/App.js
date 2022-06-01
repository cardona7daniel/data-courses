import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { AuthProvider } from "./hooks";
import { themeConfig } from "./config/theme.config";
import { RouterController } from "./container/router";

const theme = createTheme(themeConfig);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterController />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

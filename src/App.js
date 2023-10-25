import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import { AuthContextProvider } from "./config/auth";
import Login from "./pages/login";
import Home from "./pages/home";
import Meeting from "./pages/meeting";

import theme from "./config/theme";

const meetingId = "kabcdef";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route index element={<Home />} />
            <Route
              path="/meeting/:meetingId"
              element={<Meeting meetingId={meetingId} />}
            />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;

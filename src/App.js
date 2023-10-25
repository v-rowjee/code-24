import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Home from './pages/home';
import Meeting from './pages/meeting';
import { ThemeProvider } from '@mui/material';
import theme from './config/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route index element={<Home />} />
          <Route path="/meeting/:meetingId" element={<Meeting />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

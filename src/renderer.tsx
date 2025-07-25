import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import InstructionsScreen from './screens/InstructionsScreen';
import Round1Screen from './screens/Round1Screen';
import Round2Screen from './screens/Round2Screen';
import { useThemeConfig } from './utils/useThemeConfig';

function App() {
  const themeConfig = useThemeConfig();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = React.useCallback(() => {
    setLoggedIn(false);
    navigate('/login');
  }, [navigate]);

  const muiTheme = React.useMemo(() => createTheme({
    ...themeConfig,
    palette: {
      ...themeConfig.palette,
      mode: darkMode ? 'dark' : 'light',
    },
  }), [themeConfig, darkMode]);

  const handleToggleDarkMode = () => setDarkMode((d) => !d);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={
          <LoginScreen onLogin={() => {
            setLoggedIn(true);
            navigate('/');
          }} />
        } />
        <Route path="/" element={loggedIn ? <HomeScreen onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} /> : <Navigate to="/login" />} />
        <Route path="/instructions/:round" element={loggedIn ? <InstructionsScreen onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} /> : <Navigate to="/login" />} />
        <Route path="/round1" element={loggedIn ? <Round1Screen onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} /> : <Navigate to="/login" />} />
        <Route path="/round2" element={loggedIn ? <Round2Screen onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} /> : <Navigate to="/login" />} />
      </Routes>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Router>
    <App />
  </Router>
);

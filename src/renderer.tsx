import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import InstructionsScreen from './screens/InstructionsScreen';
import Round1Screen from './screens/Round1Screen';
import Round2Screen from './screens/Round2Screen';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
    },
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = React.useCallback(() => {
    setLoggedIn(false);
    navigate('/login');
  }, [navigate]);

  const handleToggleDarkMode = () => setDarkMode((d) => !d);

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Routes>
        <Route path="/login" element={
          <LoginScreen onLogin={() => {
            setLoggedIn(true);
            navigate('/');
          }} darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />
        } />
        <Route path="/" element={loggedIn ? <HomeScreen onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} /> : <Navigate to="/login" />} />
        <Route path="/instructions/:round" element={loggedIn ? <InstructionsScreen onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} /> : <Navigate to="/login" />} />
        <Route path="/round1" element={loggedIn ? <Round1Screen onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} /> : <Navigate to="/login" />} />
        <Route path="/round2" element={loggedIn ? <Round2Screen onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} /> : <Navigate to="/login" />} />
      </Routes>
    </ChakraProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Router>
    <App />
  </Router>
);

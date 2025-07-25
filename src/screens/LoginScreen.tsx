import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Divider, Fade, useTheme } from '@mui/material';
import ConventionAppBar from '../components/ConventionAppBar';

const PASSCODE = '1234'; // Easy to customize

export default function LoginScreen({ onLogin, darkMode, onToggleDarkMode }: { onLogin: () => void, darkMode: boolean, onToggleDarkMode: () => void }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const theme = useTheme();

  const handleLogin = () => {
    if (input === PASSCODE) {
      setError('');
      onLogin();
    } else {
      setError('Incorrect passcode');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const bgGradient = theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #23272f 0%, #2d3748 100%)'
    : 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)';
  const paperBg = theme.palette.mode === 'dark' ? '#23272f' : '#fff';

  return (
    <Box sx={{ minHeight: '100vh', background: bgGradient }}>
      <ConventionAppBar showLogout={false} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" sx={{ p: 4 }}>
        <Fade in={true} timeout={600}>
          <Paper sx={{ p: 8, width: '100%', maxWidth: 440, minHeight: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 5, boxShadow: 8, mt: 10, background: paperBg }}>
            <Typography variant="h2" mb={2} align="center" sx={{ fontWeight: 800, color: 'primary.main', letterSpacing: 1 }}>
              Welcome
            </Typography>
            <Typography variant="h6" mb={6} align="center" sx={{ color: 'text.secondary', fontWeight: 400 }}>
              Enter the passcode to access the event
            </Typography>
            <Divider sx={{ width: '100%', mb: 6 }} />
            <Box sx={{ width: '100%', maxWidth: 340 }}>
              <TextField
                fullWidth
                label="Passcode"
                type="password"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                error={!!error}
                helperText={error}
                sx={{ mb: 4 }}
                inputProps={{
                  style: { fontSize: 24, textAlign: 'center' }
                }}
                InputLabelProps={{
                  style: { fontSize: 18 }
                }}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleLogin}
                sx={{
                  fontSize: 24,
                  py: 2,
                  borderRadius: 3,
                  boxShadow: 6,
                  background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)',
                  color: '#fff',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'scale(1.04)',
                    boxShadow: 12,
                    background: 'linear-gradient(90deg, #7c3aed 0%, #2563eb 100%)',
                  }
                }}
              >
                Login
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Box>
    </Box>
  );
}

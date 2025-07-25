import React from 'react';
import { Box, Button, Typography, Stack, Paper, Divider, Fade, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ConventionAppBar from '../components/ConventionAppBar';

console.log('HomeScreen rendered');

export default function HomeScreen({ onLogout, darkMode, onToggleDarkMode }: { onLogout: () => void, darkMode: boolean, onToggleDarkMode: () => void }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const bgGradient = theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #23272f 0%, #2d3748 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #e3f0ff 100%)';
  const paperBg = theme.palette.mode === 'dark' ? '#23272f' : '#fff';
  return (
    <Box sx={{ minHeight: '100vh', background: bgGradient }}>
      <ConventionAppBar showLogout={true} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" sx={{ p: 4 }}>
        <Fade in={true} timeout={600}>
          <Paper sx={{ p: 8, width: '100%', maxWidth: 800, minHeight: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 5, boxShadow: 8, mt: 8, background: paperBg }}>
            <Typography variant="h1" mb={2} align="center" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Quiz Master Home
            </Typography>
            <Typography variant="h5" mb={6} align="center" sx={{ color: 'text.secondary', fontWeight: 400 }}>
              Select a round to begin
            </Typography>
            <Divider sx={{ width: '100%', mb: 6 }} />
            <Stack spacing={4} width="100%" maxWidth={500}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  fontSize: 32,
                  py: 3,
                  px: 4,
                  borderRadius: 3,
                  boxShadow: 4,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.04)',
                    boxShadow: 8
                  }
                }}
                onClick={() => navigate('/instructions/round1')}
              >
                Start Round 1
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                  fontSize: 32,
                  py: 3,
                  px: 4,
                  borderRadius: 3,
                  boxShadow: 4,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.04)',
                    boxShadow: 8
                  }
                }}
                onClick={() => navigate('/instructions/round2')}
              >
                Start Round 2
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                sx={{
                  fontSize: 24,
                  py: 2,
                  px: 4,
                  borderRadius: 3,
                  mt: 4,
                  boxShadow: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.04)',
                    boxShadow: 8
                  }
                }}
                onClick={onLogout}
              >
                Logout
              </Button>
            </Stack>
          </Paper>
        </Fade>
      </Box>
    </Box>
  );
}

import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, Container } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useBranding } from '../utils/useBranding';

export default function ConventionAppBar({ showHome, showLogout, onLogout, onHome, darkMode, onToggleDarkMode }: {
  showHome?: boolean;
  showLogout?: boolean;
  onLogout?: () => void;
  onHome?: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}) {
  const { conventionName } = useBranding();
  return (
    <AppBar position="fixed" color="primary" elevation={2}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
            <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36, mr: 1 }}>
              <EmojiEventsIcon fontSize="medium" />
            </Avatar>
            <Typography variant="h6" color="inherit" noWrap sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
              {conventionName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {showHome && (
              <IconButton color="inherit" onClick={onHome} size="large">
                <HomeIcon />
              </IconButton>
            )}
            {showLogout && (
              <IconButton color="inherit" onClick={onLogout} size="large">
                <LogoutIcon />
              </IconButton>
            )}
            {onToggleDarkMode && (
              <IconButton color="inherit" onClick={onToggleDarkMode} size="large">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

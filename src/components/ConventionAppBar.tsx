import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar } from '@mui/material';
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
    <AppBar position="fixed" elevation={0} sx={{
      background: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)',
      borderBottom: '1px solid #e0e0e0',
      zIndex: 1201
    }}>
      <Toolbar sx={{ justifyContent: 'center', position: 'relative', minHeight: 72 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
            <EmojiEventsIcon fontSize="large" />
          </Avatar>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 800, letterSpacing: 1, fontSize: { xs: 18, md: 28 } }}>
            {conventionName}
          </Typography>
        </Box>
        <Box sx={{ position: 'absolute', right: 0, top: 0, height: '100%', display: 'flex', alignItems: 'center' }}>
          {showHome && (
            <IconButton color="primary" onClick={onHome} size="large" sx={{ mr: 1 }}>
              <HomeIcon fontSize="inherit" />
            </IconButton>
          )}
          {showLogout && (
            <IconButton color="primary" onClick={onLogout} size="large">
              <LogoutIcon fontSize="inherit" />
            </IconButton>
          )}
          {onToggleDarkMode && (
            <IconButton color="primary" onClick={onToggleDarkMode} size="large" sx={{ ml: 1 }}>
              {darkMode ? <Brightness7Icon fontSize="inherit" /> : <Brightness4Icon fontSize="inherit" />}
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

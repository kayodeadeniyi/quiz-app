import React, { useState } from 'react';
import { Box, Button, Paper, Typography, Divider, Fade, useTheme } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useBranding } from '../utils/useBranding';
import instructionsRound1 from '../config/instructions-round1.md';
import instructionsRound2 from '../config/instructions-round2.md';
import ConventionAppBar from '../components/ConventionAppBar';

const roundToContent: Record<string, string> = {
  round1: instructionsRound1,
  round2: instructionsRound2,
};

export default function InstructionsScreen({ onLogout, darkMode, onToggleDarkMode }: { onLogout: () => void, darkMode: boolean, onToggleDarkMode: () => void }) {
  const { round } = useParams();
  const navigate = useNavigate();
  const content = round ? roundToContent[round] : '';
  const [fadeIn, setFadeIn] = useState(true);
  const theme = useTheme();
  React.useEffect(() => {
    setFadeIn(false);
    const t = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(t);
  }, [round]);

  const bgGradient = theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #23272f 0%, #2d3748 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #e3f0ff 100%)';
  const paperBg = theme.palette.mode === 'dark' ? '#23272f' : '#fff';

  return (
    <Box sx={{ minHeight: '100vh', background: bgGradient }}>
      <ConventionAppBar showHome showLogout onLogout={onLogout} onHome={() => navigate('/')} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" sx={{ p: 4 }}>
        <Fade in={fadeIn} timeout={600}>
          <Paper sx={{ p: 8, width: '100%', maxWidth: 1200, minHeight: 500, borderRadius: 5, boxShadow: 8, mt: 8, background: paperBg }}>
            <Divider sx={{ mb: 4 }} />
            <Box sx={{
              fontSize: 28,
              mb: 6,
              lineHeight: 1.6,
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                color: 'primary.main',
                fontWeight: 600,
                mb: 2
              },
              '& p': {
                mb: 2
              },
              '& ul, & ol': {
                pl: 4
              },
              '& li': {
                mb: 1
              }
            }}>
              <ReactMarkdown>{content}</ReactMarkdown>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  mt: 3,
                  fontSize: 28,
                  px: 8,
                  py: 3,
                  minWidth: 300,
                  borderRadius: 3,
                  boxShadow: 6,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.04)',
                    boxShadow: 12
                  }
                }}
                onClick={() => navigate(round === 'round1' ? '/round1' : '/round2')}
              >
                Start {round === 'round1' ? 'Round 1' : 'Round 2'}
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Box>
    </Box>
  );
}

import React, { useEffect, useState, useCallback } from 'react';
import { Box, Button, Typography, Paper, Stack, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../utils/useSound';
import ConventionAppBar from '../components/ConventionAppBar';
import questionsData from '../config/questions-round1.json';

interface Question {
  question: string;
  options: Record<string, string>;
  answer: string;
}

export default function Round1Screen({ onLogout, darkMode, onToggleDarkMode }: { onLogout: () => void, darkMode: boolean, onToggleDarkMode: () => void }) {
  const [current, setCurrent] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const playSound = useSound();
  const navigate = useNavigate();

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (showSummary) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line
  }, [current, showSummary]);

  const next = useCallback(() => {
    if (current < questionsData.length - 1) {
      setCurrent(c => c + 1);
      playSound('next.mp3');
    } else {
      setShowSummary(true);
      playSound('next.mp3');
    }
  }, [current, playSound]);

  const prev = useCallback(() => {
    if (current > 0) {
      setCurrent(c => c - 1);
    }
  }, [current]);

  // Animation state
  const [fadeIn, setFadeIn] = useState(true);
  useEffect(() => {
    setFadeIn(false);
    const t = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(t);
  }, [current, showSummary]);

  if (!questionsData.length) {
    return <Typography>Loading questions...</Typography>;
  }

  if (showSummary) {
    return (
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e3f0ff 100%)' }}>
        <ConventionAppBar showHome showLogout onLogout={onLogout} onHome={() => navigate('/')} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" sx={{ p: 2 }}>
          <Fade in={fadeIn} timeout={600}>
            <Paper sx={{ p: 6, width: '100%', maxWidth: 1400, minHeight: 600, borderRadius: 5, boxShadow: 8, mt: 8 }}>
              <Typography variant="h2" mb={6} align="center" sx={{ fontWeight: 700, color: 'primary.main' }}>Round 1 Summary</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))', gap: 4 }}>
                {questionsData.map((q, i) => (
                  <Fade in={fadeIn} timeout={600} key={i} style={{ transitionDelay: `${i * 40}ms` }}>
                    <Box sx={{
                      p: 4,
                      border: '2px solid #e0e0e0',
                      borderRadius: 3,
                      backgroundColor: '#fafafa',
                      boxShadow: 2,
                      transition: 'box-shadow 0.3s',
                      '&:hover': { boxShadow: 8 }
                    }}>
                      <Typography variant="h4" mb={2} sx={{ fontWeight: 600, color: 'primary.main' }}>
                        <b>Q{i + 1}:</b> {q.question}
                      </Typography>
                      <Typography variant="h5" color="success.main" sx={{ fontWeight: 700 }}>
                        Answer: <b>{q.answer.toUpperCase()}</b> - {q.options[q.answer as keyof typeof q.options]}
                      </Typography>
                    </Box>
                  </Fade>
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ fontSize: 24, px: 6, py: 2, borderRadius: 3, boxShadow: 6, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.04)', boxShadow: 12 } }}
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Box>
      </Box>
    );
  }

  const q = questionsData[current];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e3f0ff 100%)' }}>
      <ConventionAppBar showHome showLogout onLogout={onLogout} onHome={() => navigate('/')} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" sx={{ p: { xs: 1, md: 2 } }}>
        <Fade in={fadeIn} timeout={600}>
          <Paper sx={{ p: { xs: 2, md: 6 }, width: '100%', maxWidth: 1400, minHeight: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 5, boxShadow: 8, mt: 8 }}>
            <Typography variant="h3" mb={2} align="center" sx={{ fontWeight: 600, color: 'primary.main', fontSize: { xs: 24, md: 36 } }}>
              Question {current + 1} of {questionsData.length}
            </Typography>
            <Typography variant="h1" mb={4} align="center" sx={{ fontWeight: 700, fontSize: { xs: 28, md: 56 }, lineHeight: 1.2 }}>
              {q.question}
            </Typography>
            <Stack spacing={3} sx={{ width: '100%', maxWidth: 1000 }}>
              {Object.entries(q.options).map(([key, value], idx) => (
                <Fade in={fadeIn} timeout={600} key={key} style={{ transitionDelay: `${idx * 40}ms` }}>
                  <Box sx={{
                    p: { xs: 2, md: 4 },
                    border: '3px solid #e0e0e0',
                    borderRadius: 3,
                    backgroundColor: '#fafafa',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: 2,
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: '#f0f8ff',
                      transform: 'translateY(-2px) scale(1.03)',
                      boxShadow: 8
                    }
                  }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, fontSize: { xs: 20, md: 32 } }}>
                      <b style={{ color: '#1976d2' }}>{key.toUpperCase()}.</b> {value}
                    </Typography>
                  </Box>
                </Fade>
              ))}
            </Stack>
            <Stack direction="row" spacing={6} mt={6} justifyContent="center">
              <Button
                onClick={prev}
                disabled={current === 0}
                size="large"
                variant="outlined"
                sx={{ fontSize: 24, px: 4, py: 1, minWidth: 120, borderRadius: 3, boxShadow: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.04)', boxShadow: 8 } }}
              >
                Previous
              </Button>
              <Button
                onClick={next}
                variant="contained"
                size="large"
                sx={{ fontSize: 24, px: 4, py: 1, minWidth: 120, borderRadius: 3, boxShadow: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.04)', boxShadow: 8 } }}
              >
                {current === questionsData.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Stack>
          </Paper>
        </Fade>
      </Box>
    </Box>
  );
}

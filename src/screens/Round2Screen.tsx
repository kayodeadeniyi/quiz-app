import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper, Stack, Fade, useTheme } from '@mui/material';
import { useSound } from '../utils/useSound';
import ConventionAppBar from '../components/ConventionAppBar';
import { useNavigate } from 'react-router-dom';
import questionsData from '../config/questions-round2.json';

interface Question {
  id: number;
  category: string;
  question: string;
  options: Record<string, string>;
  answer: string;
}

export default function Round2Screen({ onLogout, darkMode, onToggleDarkMode }: { onLogout: () => void, darkMode: boolean, onToggleDarkMode: () => void }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selected, setSelected] = useState<Question | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answered, setAnswered] = useState<Set<number>>(new Set());
  const playSound = useSound();
  const [fadeIn, setFadeIn] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setQuestions(questionsData);
  }, []);

  useEffect(() => {
    setFadeIn(false);
    const t = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(t);
  }, [selected]);

  const handleSelect = (q: Question) => {
    setSelected(q);
    setShowAnswer(false);
    playSound('select.mp3');
  };

  const handleReveal = () => {
    setShowAnswer(true);
    setAnswered(prev => new Set(prev).add(selected!.id));
    playSound('reveal.mp3');
  };

  const handleBack = () => {
    setSelected(null);
    setShowAnswer(false);
  };

  if (!questions.length) {
    return <Typography>Loading questions...</Typography>;
  }

  const bgGradient = theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #23272f 0%, #2d3748 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #e3f0ff 100%)';
  const paperBg = theme.palette.mode === 'dark' ? '#23272f' : '#fff';

  if (selected) {
    return (
      <Box sx={{ minHeight: '100vh', background: bgGradient }}>
        <ConventionAppBar showHome showLogout onLogout={onLogout} onHome={() => navigate('/')} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" sx={{ p: { xs: 1, md: 2 } }}>
          <Fade in={fadeIn} timeout={600}>
            <Paper sx={{ p: { xs: 2, md: 6 }, width: '100%', maxWidth: 1400, minHeight: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 5, boxShadow: 8, mt: 8, background: paperBg }}>
              <Typography variant="h3" mb={2} align="center" sx={{ fontWeight: 600, color: 'primary.main', fontSize: { xs: 24, md: 36 } }}>
                Question {selected.id}
              </Typography>
              <Typography variant="h1" mb={4} align="center" sx={{ fontWeight: 700, fontSize: { xs: 28, md: 56 }, lineHeight: 1.2 }}>
                {selected.question}
              </Typography>
              <Stack spacing={3} sx={{ width: '100%', maxWidth: 1000 }}>
                {Object.entries(selected.options).map(([key, value], idx) => (
                  <Fade in={fadeIn} timeout={600} key={key} style={{ transitionDelay: `${idx * 40}ms` }}>
                    <Box sx={{
                      p: { xs: 2, md: 4 },
                      border: '3px solid #e0e0e0',
                      borderRadius: 3,
                      backgroundColor: theme.palette.mode === 'dark' ? '#23272f' : '#fafafa',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      boxShadow: 2,
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: theme.palette.mode === 'dark' ? '#2d3748' : '#f0f8ff',
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
              {!showAnswer ? (
                <Button variant="contained" color="primary" sx={{ mt: 4, fontSize: 24, px: 4, py: 2, minWidth: 200, borderRadius: 3, boxShadow: 6, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.04)', boxShadow: 12 } }} onClick={handleReveal}>
                  Reveal Answer
                </Button>
              ) : (
                <Typography mt={3} color="success.main" variant="h5" align="center">
                  Correct Answer: <b>{selected.answer.toUpperCase()}</b> - {selected.options[selected.answer as keyof typeof selected.options]}
                </Typography>
              )}
              <Button sx={{ mt: 4, fontSize: 20, minWidth: 200, borderRadius: 3, boxShadow: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.04)', boxShadow: 8 } }} onClick={handleBack}>Back to Board</Button>
            </Paper>
          </Fade>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: bgGradient }}>
      <ConventionAppBar showHome showLogout onLogout={onLogout} onHome={() => navigate('/')} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" sx={{ p: { xs: 2, md: 4 } }}>
        <Fade in={fadeIn} timeout={600}>
          <Box sx={{ width: '100%', maxWidth: 1800, p: { xs: 1, md: 4 } }}>
            <Typography variant="h4" mb={3} align="center">Round 2: Question Board</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 2, width: '100%', p: { xs: 1, md: 3 } }}>
              {questions.map((q, idx) => (
                <Fade in={fadeIn} timeout={600} key={q.id} style={{ transitionDelay: `${idx * 10}ms` }}>
                  <Button
                    variant="contained"
                    color={answered.has(q.id) ? 'success' : 'primary'}
                    disabled={answered.has(q.id)}
                    fullWidth
                    sx={{ height: 80, fontSize: 36, fontWeight: 700, borderRadius: 3, boxShadow: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.04)', boxShadow: 8 } }}
                    onClick={() => handleSelect(q)}
                  >
                    {q.id}
                  </Button>
                </Fade>
              ))}
            </Box>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
}

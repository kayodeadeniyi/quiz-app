import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Container,
  Heading,
  useColorModeValue,
  Progress,
  Badge,
  Divider,
  SimpleGrid
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import questionsData from '../config/questions-round1.json';
import { useSound } from '../utils/useSound';
import Confetti from 'react-confetti';
import QuizAppBar from '../components/QuizAppBar';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const PASSCODE = '1234';

export default function Round1Screen({ onLogout, darkMode, onToggleDarkMode }: {
  onLogout: () => void,
  darkMode: boolean,
  onToggleDarkMode: () => void
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [confetti, setConfetti] = useState(false);
  const [confettiRecycle, setConfettiRecycle] = useState(true);
  const navigate = useNavigate();
  const playSound = useSound();

  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50)',
    'linear(to-br, gray.900, blue.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  const currentQuestion = questionsData[currentQuestionIndex];

  useEffect(() => {
    if (autoAdvance && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (autoAdvance && timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, autoAdvance]);

  const handleNextQuestion = () => {
    playSound('next');
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(10);
    } else {
      setShowSummary(true);
      setConfetti(true);
    }
  };

  const handlePreviousQuestion = () => {
    playSound('next');
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimeLeft(10);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      handleNextQuestion();
    } else if (e.key === 'ArrowLeft') {
      handlePreviousQuestion();
    } else if (e.key === ' ') {
      e.preventDefault();
      setAutoAdvance(!autoAdvance);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestionIndex, autoAdvance]);

  // Confetti should stop after a few seconds
  useEffect(() => {
    if (confetti) {
      setConfettiRecycle(true);
      const t = setTimeout(() => {
        setConfettiRecycle(false);
        setTimeout(() => setConfetti(false), 2000); // allow last pieces to finish falling
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [confetti]);

  if (showSummary) {
    return (
      <Box
        minH="100vh"
        bgGradient={bgGradient}
        py={20}
        px={4}
        position="relative"
      >
        <QuizAppBar showHome={true} showLogout={true} onHome={() => navigate('/')} onLogout={onLogout} title="Round 1 Summary" />
        {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={400} recycle={confettiRecycle} />}
        <Container maxW="container.2xl" pt={16} pb={10} px={0} minH="80vh" display="flex" alignItems="center" justifyContent="center">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            bg={cardBg}
            borderRadius="2xl"
            p={{ base: 8, md: 16 }}
            boxShadow="2xl"
            w="full"
            minH="80vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <VStack spacing={8}>
              <Heading
                size="2xl"
                bgGradient="linear(to-r, blue.500, purple.500)"
                bgClip="text"
                fontWeight="extrabold"
                textAlign="center"
              >
                Round 1 Complete! 🎉
              </Heading>

              <Text fontSize="xl" color={textColor} textAlign="center">
                Here are the correct answers:
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={16} w="full">
                {questionsData.map((q, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    w="full"
                    p={12}
                    bg={useColorModeValue('gray.50', 'gray.700')}
                    borderRadius="xl"
                    borderWidth="1px"
                    minH="72"
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                  >
                    <VStack align="start" spacing={3}>
                      <HStack>
                        <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
                          Q{index + 1}
                        </Badge>
                        <Text fontWeight="bold" fontSize="lg" color={textColor}>
                          {q.question}
                        </Text>
                      </HStack>
                      <VStack align="stretch" spacing={6} mt={6}>
                        {Object.entries(q.options).map(([key, value]) => (
                          <Box
                            key={key}
                            p={8}
                            borderRadius="md"
                            bg={q.answer === key ? 'green.100' : 'transparent'}
                            borderWidth={q.answer === key ? '2px' : '1px'}
                            borderColor={q.answer === key ? 'green.400' : 'gray.200'}
                            fontWeight={q.answer === key ? 'bold' : 'normal'}
                            fontSize="2xl"
                            display="flex"
                            alignItems="center"
                            minH="20"
                          >
                            <Box as="span" fontWeight="bold" mr={6} fontSize="2xl">
                              {key.toUpperCase()}
                            </Box>
                            <Box flex="1">{value}</Box>
                            {q.answer === key && (
                              <Box as="span" color="green.600" fontWeight="bold" ml={6} fontSize="2xl">
                                ✓ Correct
                              </Box>
                            )}
                          </Box>
                        ))}
                      </VStack>
                    </VStack>
                  </MotionBox>
                ))}
              </SimpleGrid>

              <MotionButton
                size="lg"
                colorScheme="blue"
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🏠 Back to Home
              </MotionButton>
            </VStack>
          </MotionBox>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      py={20}
      px={4}
      position="relative"
    >
      <QuizAppBar showHome={true} showLogout={true} onHome={() => navigate('/')} onLogout={onLogout} title={`Round 1 - Question ${currentQuestionIndex + 1}`} />
      <Container maxW="container.xl" pt={10}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          bg={cardBg}
          borderRadius="2xl"
          p={12}
          boxShadow="2xl"
        >
          <VStack spacing={8}>
            <HStack justify="space-between" w="full">
              <Heading
                size="xl"
                bgGradient="linear(to-r, blue.500, purple.500)"
                bgClip="text"
                fontWeight="extrabold"
              >
                Round 1 - Question {currentQuestionIndex + 1} of {questionsData.length}
              </Heading>

              <HStack spacing={4}>
                <Badge
                  colorScheme={autoAdvance ? 'green' : 'gray'}
                  fontSize="md"
                  px={3}
                  py={1}
                >
                  {autoAdvance ? 'Auto Advance ON' : 'Auto Advance OFF'}
                </Badge>
                {autoAdvance && (
                  <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
                    {timeLeft}s
                  </Badge>
                )}
              </HStack>
            </HStack>

            <Progress
              value={(timeLeft / 10) * 100}
              colorScheme="blue"
              size="lg"
              borderRadius="full"
              w="full"
            />

            <Divider />

            <Box w="full">
              <Text fontSize="3xl" fontWeight="bold" color={textColor} mb={8} textAlign="center">
                {currentQuestion.question}
              </Text>

              <SimpleGrid columns={1} spacing={4}>
                {Object.entries(currentQuestion.options).map(([key, value]) => (
                  <MotionBox
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    p={6}
                    bg={useColorModeValue('gray.50', 'gray.700')}
                    borderRadius="xl"
                    borderWidth="2px"
                    borderColor="transparent"
                    cursor="pointer"
                    _hover={{
                      borderColor: 'blue.300',
                      bg: useColorModeValue('blue.50', 'blue.900')
                    }}
                  >
                    <HStack>
                      <Badge colorScheme="blue" fontSize="lg" px={4} py={2}>
                        {key.toUpperCase()}
                      </Badge>
                      <Text fontSize="xl" color={textColor} fontWeight="medium">
                        {value}
                      </Text>
                    </HStack>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </Box>

            <HStack spacing={6} pt={4}>
              <MotionButton
                size="lg"
                colorScheme="gray"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Previous
              </MotionButton>

              <MotionButton
                size="lg"
                colorScheme="blue"
                onClick={() => setAutoAdvance(!autoAdvance)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {autoAdvance ? '⏸️ Pause' : '▶️ Auto Advance'}
              </MotionButton>

              <MotionButton
                size="lg"
                colorScheme="green"
                onClick={handleNextQuestion}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next →
              </MotionButton>
            </HStack>

            <Text fontSize="sm" color={textColor} opacity={0.7} textAlign="center">
              Use arrow keys to navigate • Space to toggle auto advance
            </Text>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
}

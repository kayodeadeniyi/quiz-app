import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Container,
  Heading,
  useColorModeValue,
  SimpleGrid,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import questionsData from '../config/questions-round2.json';
import { useSound } from '../utils/useSound';
import QuizAppBar from '../components/QuizAppBar';
import Confetti from 'react-confetti';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export default function Round2Screen({ onLogout, darkMode, onToggleDarkMode }: {
  onLogout: () => void,
  darkMode: boolean,
  onToggleDarkMode: () => void
}) {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [lockedAnswer, setLockedAnswer] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [confettiRecycle, setConfettiRecycle] = useState(true);
  const navigate = useNavigate();
  const playSound = useSound();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50)',
    'linear(to-br, gray.900, blue.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  const handleQuestionSelect = (index: number) => {
    setSelectedQuestion(index);
    setShowAnswer(false);
    setLockedAnswer(null);
    setSelectedAnswer(null);
    onOpen();
    playSound('select');
  };

  const handleSelectAnswer = (key: string) => {
    if (!showAnswer) {
      setSelectedAnswer(key);
      playSound('select');
    }
  };

  const handleRevealAnswer = () => {
    setShowAnswer(true);
    setLockedAnswer(selectedAnswer);
    if (selectedQuestion !== null) {
      setAnsweredQuestions(prev => new Set([...prev, selectedQuestion]));
    }
    if (selectedAnswer && currentQuestion && selectedAnswer === currentQuestion.answer) {
      setConfettiRecycle(true);
      setConfetti(true);
      setTimeout(() => {
        setConfettiRecycle(false);
        setTimeout(() => setConfetti(false), 2000);
      }, 4000);
    }
    playSound('reveal');
  };

  const handleCloseModal = () => {
    onClose();
    setSelectedQuestion(null);
    setShowAnswer(false);
    setLockedAnswer(null);
    setSelectedAnswer(null);
    setConfetti(false);
  };

  const currentQuestion = selectedQuestion !== null ? questionsData[selectedQuestion] : null;

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      py={20}
      px={4}
      position="relative"
    >
      <QuizAppBar showHome={true} showLogout={true} onHome={() => navigate('/')} onLogout={onLogout} title="Round 2 - Question Board" />
      <Container maxW="container.xl" pt={24}>
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
            <Box textAlign="center">
              <Heading
                size="2xl"
                bgGradient="linear(to-r, blue.500, purple.500)"
                bgClip="text"
                fontWeight="extrabold"
                mb={4}
              >
                Round 2 - Question Board
              </Heading>
              <Text fontSize="xl" color={textColor} opacity={0.8}>
                Select a question number to begin
              </Text>
            </Box>

            <SimpleGrid columns={[2, 3, 4, 5, 6]} spacing={4} w="full">
              {questionsData.map((_, index) => (
                <MotionButton
                  key={index}
                  size="lg"
                  h="20"
                  fontSize="2xl"
                  fontWeight="bold"
                  colorScheme={answeredQuestions.has(index) ? 'green' : 'blue'}
                  variant={answeredQuestions.has(index) ? 'solid' : 'outline'}
                  onClick={() => handleQuestionSelect(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={answeredQuestions.has(index)}
                >
                  {answeredQuestions.has(index) ? '✓' : index + 1}
                </MotionButton>
              ))}
            </SimpleGrid>

            <HStack spacing={6} pt={4}>
              <MotionButton
                size="lg"
                colorScheme="gray"
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🏠 Back to Home
              </MotionButton>
            </HStack>
          </VStack>
        </MotionBox>
      </Container>

      <Modal isOpen={isOpen} onClose={handleCloseModal} size="6xl" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="2xl" p={0} minH="85vh" display="flex" justifyContent="center" maxW="6xl">
          <ModalHeader p={0} bgGradient="linear(to-r, blue.500, purple.500)" borderTopRadius="2xl">
            <Box px={12} py={8}>
              <Heading size="2xl" color="white" fontWeight="extrabold">
                Question {selectedQuestion !== null ? selectedQuestion + 1 : ''}
              </Heading>
            </Box>
          </ModalHeader>
          <ModalCloseButton size="lg" color="white" top={3} right={3} />
          <ModalBody pb={16} px={16} pt={10} display="flex" flexDirection="column" justifyContent="center" flex="1" minH="60vh">
            {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={300} recycle={confettiRecycle} />}
            {currentQuestion && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <VStack spacing={12} align="stretch" minH="40vh">
                  <Box bg={useColorModeValue('blue.50', 'blue.900')} borderRadius="xl" px={10} py={8} mb={4}>
                    <Text fontSize="3xl" fontWeight="bold" color={useColorModeValue('blue.800', 'blue.100')}
                      textAlign="center">
                      {currentQuestion.question}
                    </Text>
                  </Box>

                  <SimpleGrid columns={1} spacing={6}>
                    {Object.entries(currentQuestion.options).map(([key, value]) => {
                      const isSelected = selectedAnswer === key && !showAnswer;
                      const isLocked = lockedAnswer === key && showAnswer;
                      const isCorrect = showAnswer && key === currentQuestion.answer;
                      const isIncorrect = showAnswer && lockedAnswer === key && lockedAnswer !== currentQuestion.answer;
                      return (
                        <HStack
                          key={key}
                          p={5}
                          bg={isCorrect ? 'green.100' : isLocked ? 'purple.100' : isSelected ? 'purple.50' : useColorModeValue('gray.50', 'gray.700')}
                          borderRadius="lg"
                          borderWidth="2px"
                          borderColor={isCorrect ? 'green.500' : isLocked ? 'purple.500' : isSelected ? 'purple.400' : 'gray.200'}
                          boxShadow={isCorrect ? 'lg' : undefined}
                          position="relative"
                          transition="all 0.2s"
                          cursor={!showAnswer ? 'pointer' : 'default'}
                          onClick={() => handleSelectAnswer(key)}
                        >
                          <Badge
                            colorScheme={isCorrect ? 'green' : isLocked ? 'purple' : isSelected ? 'purple' : 'blue'}
                            fontSize="xl"
                            px={4}
                            py={2}
                          >
                            {key.toUpperCase()}
                          </Badge>
                          <Text fontSize="xl" color={textColor} fontWeight="medium">
                            {value}
                          </Text>
                          {isCorrect && (
                            <Badge colorScheme="green" ml="auto" fontSize="lg" px={4} py={2}>
                              ✓ Correct
                            </Badge>
                          )}
                          {isIncorrect && (
                            <Badge colorScheme="red" ml="auto" fontSize="lg" px={4} py={2}>
                              ❌ Incorrect
                            </Badge>
                          )}
                          {isSelected && !showAnswer && (
                            <Badge colorScheme="purple" ml="auto" fontSize="md" px={3} py={1}>
                              Selected
                            </Badge>
                          )}

                        </HStack>
                      );
                    })}
                  </SimpleGrid>

                  <HStack justify="center" pt={4}>
                    {!showAnswer ? (
                      <MotionButton
                        size="lg"
                        colorScheme="purple"
                        fontSize="xl"
                        px={10}
                        py={6}
                        onClick={handleRevealAnswer}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        isDisabled={selectedAnswer === null}
                      >
                        🔍 Reveal Answer
                      </MotionButton>
                    ) : (
                      <MotionButton
                        size="lg"
                        colorScheme="blue"
                        fontSize="xl"
                        px={10}
                        py={6}
                        onClick={handleCloseModal}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ✅ Got it!
                      </MotionButton>
                    )}
                  </HStack>
                </VStack>
              </motion.div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

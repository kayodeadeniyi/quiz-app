import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  Container,
  Heading,
  useColorModeValue,
  Divider,
  Box as ChakraBox
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import instructionsRound1 from '../config/instructions-round1.md';
import instructionsRound2 from '../config/instructions-round2.md';
import QuizAppBar from '../components/QuizAppBar';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const roundToContent: Record<string, string> = {
  round1: instructionsRound1,
  round2: instructionsRound2,
};

export default function InstructionsScreen({ onLogout, darkMode, onToggleDarkMode }: {
  onLogout: () => void,
  darkMode: boolean,
  onToggleDarkMode: () => void
}) {
  const { round } = useParams();
  const navigate = useNavigate();
  const content = round ? roundToContent[round] : '';
  const [fadeIn, setFadeIn] = useState(true);

  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50)',
    'linear(to-br, gray.900, blue.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  React.useEffect(() => {
    setFadeIn(false);
    const t = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(t);
  }, [round]);

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      py={20}
      px={4}
      position="relative"
    >
      <QuizAppBar showHome={true} showLogout={true} onHome={() => navigate('/')} onLogout={onLogout} title={round === 'round1' ? 'Round 1 Instructions' : 'Round 2 Instructions'} />
      <Container maxW="container.xl" pt={24} pb={16}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          bg={cardBg}
          borderRadius="2xl"
          p={{ base: 10, md: 20 }}
          boxShadow="2xl"
          textAlign="center"
          maxW="5xl"
          mx="auto"
          position="relative"
          zIndex={1}
        >
          <VStack spacing={10} align="center">
            <Heading
              size="2xl"
              bgGradient="linear(to-r, blue.500, purple.500)"
              bgClip="text"
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              Instructions
            </Heading>
            <Divider />
            <Box w="full" textAlign="left" fontSize={{ base: 'xl', md: '2xl' }}>
              <ReactMarkdown>{content}</ReactMarkdown>
            </Box>

            <Box textAlign="center" pt={4}>
              <MotionButton
                size="lg"
                colorScheme="blue"
                h="16"
                fontSize="xl"
                fontWeight="bold"
                borderRadius="xl"
                boxShadow="lg"
                px={12}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(round === 'round1' ? '/round1' : '/round2')}
              >
                🚀 Start {round === 'round1' ? 'Round 1' : 'Round 2'}
              </MotionButton>
            </Box>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
}

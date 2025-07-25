import React from 'react';
import { Box, Button, Text, VStack, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import QuizAppBar from '../components/QuizAppBar';
import { useBranding } from '../utils/useBranding';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export default function HomeScreen({ onLogout, darkMode, onToggleDarkMode }: { onLogout: () => void, darkMode: boolean, onToggleDarkMode: () => void }) {
  const navigate = useNavigate();
  const { conventionName } = useBranding();
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50)',
    'linear(to-br, gray.900, blue.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      px={4}
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* Branding Accent Watermark */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex={0}
        pointerEvents="none"
        opacity={0.07}
        fontSize={{ base: '6xl', md: '9xl', xl: '10xl' }}
        fontWeight="extrabold"
        color={useColorModeValue('blue.200', 'blue.900')}
        textAlign="center"
        userSelect="none"
        whiteSpace="nowrap"
      >
        {conventionName}
      </Box>
      <QuizAppBar showHome={false} showLogout={true} onLogout={onLogout} title="Quiz Home" />
      <Container maxW="container.md" pt={24}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          bg={cardBg}
          borderRadius="2xl"
          p={12}
          boxShadow="2xl"
          textAlign="center"
          position="relative"
          zIndex={1}
        >
          <VStack spacing={8}>
            <MotionBox
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Heading
                size="2xl"
                bgGradient="linear(to-r, blue.500, purple.500)"
                bgClip="text"
                fontWeight="extrabold"
                letterSpacing="tight"
              >
                Home
              </Heading>
              <Text fontSize="xl" color={textColor} opacity={0.8} mt={2}>
                Ready to lead an amazing quiz experience!
              </Text>
            </MotionBox>

            <Text fontSize="xl" color={textColor} opacity={0.8}>
              Select a round to begin
            </Text>

            <VStack spacing={6} w="full" maxW="md">
              <MotionButton
                size="lg"
                colorScheme="blue"
                w="full"
                h="16"
                fontSize="xl"
                fontWeight="bold"
                borderRadius="xl"
                boxShadow="lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/instructions/round1')}
              >
                🎯 Start Round 1
              </MotionButton>

              <MotionButton
                size="lg"
                colorScheme="purple"
                w="full"
                h="16"
                fontSize="xl"
                fontWeight="bold"
                borderRadius="xl"
                boxShadow="lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/instructions/round2')}
              >
                🎲 Start Round 2
              </MotionButton>

              <MotionButton
                size="lg"
                variant="outline"
                colorScheme="gray"
                w="full"
                h="14"
                fontSize="lg"
                borderRadius="xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onLogout}
              >
                👋 Logout
              </MotionButton>
            </VStack>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
}

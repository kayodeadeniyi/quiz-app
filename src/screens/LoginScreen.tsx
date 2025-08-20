import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Container,
  Heading,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  IconButton,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useBranding } from '../utils/useBranding';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const PASSCODE = 'Peniel2025'; // Easy to customize

export default function LoginScreen({ onLogin, darkMode, onToggleDarkMode }: {
  onLogin: () => void,
  darkMode: boolean,
  onToggleDarkMode: () => void
}) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { conventionName } = useBranding();

  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50)',
    'linear(to-br, gray.900, blue.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  const handleLogin = () => {
    if (input === PASSCODE) {
      setError('');
      onLogin();
    } else {
      setError('Incorrect passcode');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      px={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="container.sm">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          bg={cardBg}
          borderRadius="2xl"
          p={12}
          boxShadow="2xl"
          textAlign="center"
        >
          <VStack spacing={10}>
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
                mb={2}
              >
                {conventionName}
              </Heading>
              <Text fontSize="2xl" color={textColor} fontWeight="bold" mb={2}>
                Welcome
              </Text>
              <Box h={2} />
              <Box w="60px" h="3px" bgGradient="linear(to-r, blue.400, purple.400)" borderRadius="full" mx="auto" mb={2} />
            </MotionBox>

            <Text fontSize="xl" color={textColor} opacity={0.8}>
              Enter the passcode to access the event
            </Text>

            <VStack spacing={6} w="full" maxW="md">
              <FormControl isInvalid={!!error}>
                <InputGroup size="lg">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter passcode"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    fontSize="xl"
                    textAlign="center"
                    borderRadius="xl"
                    borderWidth="2px"
                    _focus={{
                      borderColor: 'blue.500',
                      boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <IconButton
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      variant="ghost"
                    />
                  </InputRightElement>
                </InputGroup>
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
              </FormControl>

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
                onClick={handleLogin}
              >
                🔐 Login
              </MotionButton>
            </VStack>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
}

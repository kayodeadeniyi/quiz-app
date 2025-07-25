import React from 'react';
import { Flex, Box, IconButton, Heading, useColorModeValue, Tooltip, Text } from '@chakra-ui/react';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { useBranding } from '../utils/useBranding';

export default function QuizAppBar({
  showHome = true,
  showLogout = true,
  onHome,
  onLogout,
  title = '',
}: {
  showHome?: boolean;
  showLogout?: boolean;
  onHome?: () => void;
  onLogout?: () => void;
  title?: string;
}) {
  const bg = useColorModeValue('whiteAlpha.900', 'gray.900');
  const border = useColorModeValue('gray.200', 'gray.700');
  const { conventionName } = useBranding();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      position="fixed"
      top={0}
      left={0}
      w="100%"
      px={6}
      py={3}
      bg={bg}
      borderBottomWidth="1px"
      borderColor={border}
      zIndex={100}
      boxShadow="sm"
    >
      <Flex align="center" minW="80px">
        {showHome && (
          <Tooltip label="Home" hasArrow>
            <IconButton
              aria-label="Home"
              icon={<FiHome />}
              onClick={onHome}
              variant="ghost"
              size="lg"
              fontSize="2xl"
            />
          </Tooltip>
        )}
      </Flex>
      <Box flex="1" textAlign="center">
        <Heading
          size="md"
          bgGradient="linear(to-r, blue.500, purple.500)"
          bgClip="text"
          fontWeight="extrabold"
          letterSpacing="tight"
          mb={title ? 0 : 1}
        >
          {conventionName}
        </Heading>
        {title && (
          <Text fontSize="md" color={useColorModeValue('blue.700', 'blue.200')} fontWeight="semibold" mt={-1}>
            {title}
          </Text>
        )}
      </Box>
      <Flex align="center" minW="80px" justify="flex-end">
        {showLogout && (
          <Tooltip label="Logout" hasArrow>
            <IconButton
              aria-label="Logout"
              icon={<FiLogOut />}
              onClick={onLogout}
              variant="ghost"
              size="lg"
              fontSize="2xl"
            />
          </Tooltip>
        )}
      </Flex>
    </Flex>
  );
}

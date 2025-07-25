import { createTheme } from '@mui/material/styles';

export function useThemeConfig() {
  return createTheme({
    palette: {
      primary: {
        main: '#1976d2', // Google blue
      },
      secondary: {
        main: '#ff9800', // Google orange accent
      },
      background: {
        default: '#f5f5f5',
        paper: '#fff',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    shape: {
      borderRadius: 8, // Standard Material
    },
  });
}

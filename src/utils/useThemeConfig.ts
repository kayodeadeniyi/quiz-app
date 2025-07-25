import { useEffect, useState } from 'react';
import { createTheme, Theme } from '@mui/material';
import themeConfig from '../config/theme.json';

export function useThemeConfig(): Theme {
  const [theme, setTheme] = useState<Theme>(
    createTheme({
      palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#ff9800' },
        background: { default: '#f5f5f5' },
        text: { primary: '#222222' },
      },
    })
  );

  useEffect(() => {
    setTheme(
      createTheme({
        palette: {
          primary: { main: themeConfig.primaryColor },
          secondary: { main: themeConfig.secondaryColor },
          background: { default: themeConfig.backgroundColor },
          text: { primary: themeConfig.textColor },
        },
      })
    );
  }, []);

  return theme;
}

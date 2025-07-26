import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { components } from './components';

export const theme = createTheme({
  palette: {
    primary: {
      main: palette.primary,
      light: '#E07F3F',
      dark: palette.accent,
    },
    secondary: {
      main: palette.secondary,
      light: '#1a4d5e',
      dark: '#0a2a32',
    },
    background: {
      default: 'rgb(230, 206, 190)',
      paper: '#fffefc',
    },
    text: {
      primary: palette.secondary,
      secondary: '#555',
    },
  },
  typography,
  components,
});

export * from './palette';
export * from './typography';
export * from './breakpoints';
export * from './components';
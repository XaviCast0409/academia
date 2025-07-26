import { palette } from './palette';

export const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        fontFamily: "'Press Start 2P', cursive",
        textTransform: 'none' as const,
        borderRadius: 8,
        padding: '8px 16px',
        fontSize: '0.7rem',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      },
      contained: {
        backgroundColor: palette.primary,
        color: '#fff',
        boxShadow: '0 4px 8px rgba(224, 127, 63, 0.3)',
        '&:hover': {
          backgroundColor: palette.accent,
        },
      },
      outlined: {
        borderColor: palette.primary,
        color: palette.primary,
        borderWidth: 2,
        '&:hover': {
          borderColor: palette.accent,
          backgroundColor: 'rgba(224, 127, 63, 0.1)',
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          fontFamily: "'Press Start 2P', cursive",
          fontSize: '0.8rem',
          '& fieldset': {
            borderColor: palette.secondary,
            borderWidth: 2,
          },
          '&:hover fieldset': {
            borderColor: palette.primary,
          },
          '&.Mui-focused fieldset': {
            borderColor: palette.primary,
          },
        },
        '& .MuiInputLabel-root': {
          fontFamily: "'Press Start 2P', cursive",
          fontSize: '0.7rem',
          color: palette.secondary,
        },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        fontFamily: "'Press Start 2P', cursive",
        fontSize: '0.8rem',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.secondary,
          borderWidth: 2,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.primary,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.primary,
        },
      },
    },
  },
  MuiPagination: {
    styleOverrides: {
      root: {
        '& .MuiPaginationItem-root': {
          fontFamily: "'Press Start 2P', cursive",
          fontSize: '0.7rem',
          color: palette.secondary,
        },
        '& .Mui-selected': {
          backgroundColor: `${palette.accent} !important`,
          color: '#fff !important',
        },
      },
    },
  },
};

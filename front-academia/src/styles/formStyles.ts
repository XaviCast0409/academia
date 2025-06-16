// src/styles/formStyles.ts
export const formBoxStyles = {
  maxWidth: 500,
  mx: 'auto',
  my: 6,
  px: 4,
  py: 5,
  backgroundColor: '#F5E8DC',
  borderRadius: 4,
  boxShadow: '0 0 20px rgba(224, 127, 63, 0.4)',
  border: '4px solid #E07F3F',
  fontFamily: "'Press Start 2P', cursive' as const",
};

export const titleStyles = {
  fontFamily: "'Press Start 2P', cursive",
  color: '#84341C',
  fontSize: '1rem'
};

export const submitButtonStyles = {
  mt: 3,
  py: 1.5,
  backgroundColor: '#E07F3F',
  color: '#fff',
  fontFamily: "'Press Start 2P', cursive",
  fontSize: '0.6rem',
  '&:hover': {
    backgroundColor: '#C26C2D',
    transform: 'scale(1.02)',
  },
};

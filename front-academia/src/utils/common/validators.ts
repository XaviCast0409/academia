// Validar email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validar password
export const isValidPassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('La contraseña debe tener al menos 8 caracteres');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('La contraseña debe tener al menos una letra mayúscula');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('La contraseña debe tener al menos una letra minúscula');
  }
  
  if (!/\d/.test(password)) {
    errors.push('La contraseña debe tener al menos un número');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Validar longitud de texto
export const validateTextLength = (
  text: string,
  minLength: number,
  maxLength: number
): { isValid: boolean; error?: string } => {
  if (text.length < minLength) {
    return {
      isValid: false,
      error: `El texto debe tener al menos ${minLength} caracteres`,
    };
  }
  
  if (text.length > maxLength) {
    return {
      isValid: false,
      error: `El texto no puede tener más de ${maxLength} caracteres`,
    };
  }
  
  return { isValid: true };
};

// Validar número
export const isValidNumber = (value: string, min?: number, max?: number): boolean => {
  const num = parseFloat(value);
  if (isNaN(num)) return false;
  
  if (min !== undefined && num < min) return false;
  if (max !== undefined && num > max) return false;
  
  return true;
};

// Validar URL
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

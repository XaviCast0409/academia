// Format number with commas
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Calculate experience percentage
export const calculateExperiencePercentage = (current: number, max: number): number => {
  return Math.min((current / max) * 100, 100);
};

// Format currency
export const formatCurrency = (amount: number, currency: string = 'XaviCoins'): string => {
  return `${formatNumber(amount)} ${currency}`;
};

// Get difficulty color
export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'fácil':
      return '#059669'; // green-600
    case 'medio':
      return '#f59e0b'; // yellow-600
    case 'difícil':
      return '#dc2626'; // red-600
    default:
      return '#6b7280'; // gray-500
  }
};

// Get category color
export const getCategoryColor = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'matemáticas':
      return '#3b82f6'; // blue-600
    case 'ciencias':
      return '#059669'; // green-600
    case 'historia':
      return '#7c3aed'; // purple-600
    case 'lenguaje':
      return '#f59e0b'; // yellow-600
    default:
      return '#6b7280'; // gray-500
  }
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate username format
export const isValidUsername = (username: string): boolean => {
  return username.length >= 3 && username.length <= 20;
};

// Validate password strength
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}; 
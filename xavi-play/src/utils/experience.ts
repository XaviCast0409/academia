export interface ExperienceRequirements {
  [level: number]: number;
}

// Requisitos de experiencia para cada nivel
export const EXPERIENCE_REQUIREMENTS: ExperienceRequirements = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 1000,
  6: 2000,
  7: 4000,
  8: 8000,
  9: 16000,
  10: 32000,
  11: 64000,
  12: 128000,
  13: 256000,
  14: 512000,
  15: 1024000,
  16: 2048000,
  17: 4096000,
  18: 8192000,
  19: 16384000,
  20: 32768000,
  21: 65536000,
  22: 131072000,
  23: 262144000,
  24: 524288000,
  25: 1048576000,
};

// Calcular la experiencia necesaria para el siguiente nivel
export const getExperienceForNextLevel = (currentLevel: number): number => {
  const nextLevel = currentLevel + 1;
  return EXPERIENCE_REQUIREMENTS[nextLevel] || EXPERIENCE_REQUIREMENTS[25]; // Máximo nivel 25
};

// Calcular la experiencia del nivel actual
export const getExperienceForCurrentLevel = (currentLevel: number): number => {
  return EXPERIENCE_REQUIREMENTS[currentLevel] || 0;
};

// Calcular el progreso de experiencia (porcentaje)
export const getExperienceProgress = (currentLevel: number, currentExperience: number): number => {
  const currentLevelExp = getExperienceForCurrentLevel(currentLevel);
  const nextLevelExp = getExperienceForNextLevel(currentLevel);
  const experienceInCurrentLevel = currentExperience - currentLevelExp;
  const experienceNeededForNextLevel = nextLevelExp - currentLevelExp;
  
  if (experienceNeededForNextLevel <= 0) return 100; // Ya está en el máximo nivel
  
  const progress = (experienceInCurrentLevel / experienceNeededForNextLevel) * 100;
  return Math.min(Math.max(progress, 0), 100); // Asegurar que esté entre 0 y 100
};

// Calcular la experiencia restante para el siguiente nivel
export const getExperienceRemaining = (currentLevel: number, currentExperience: number): number => {
  const nextLevelExp = getExperienceForNextLevel(currentLevel);
  const remaining = nextLevelExp - currentExperience;
  return Math.max(remaining, 0);
};

// Calcular la experiencia ganada en el nivel actual
export const getExperienceInCurrentLevel = (currentLevel: number, currentExperience: number): number => {
  const currentLevelExp = getExperienceForCurrentLevel(currentLevel);
  return Math.max(currentExperience - currentLevelExp, 0);
}; 
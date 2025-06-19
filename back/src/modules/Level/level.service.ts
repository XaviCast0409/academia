import db from "../../config/database";

type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;
type ExperienceRequirements = Record<Level, number>;

// Experiencia requerida por nivel
const EXPERIENCE_REQUIREMENTS: ExperienceRequirements = {
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

// Experiencia por dificultad
const EXPERIENCE_BY_DIFFICULTY = {
  beginner: 50,
  intermediate: 100,
  advanced: 200,
  expert: 400,
};

export const addExperience = async (
  userId: number,
  difficulty: "beginner" | "intermediate" | "advanced" | "expert",
  transaction?: any
): Promise<{ level: number; experience: number; experienceToNextLevel: number }> => {
  const user = await db.User.findByPk(userId, { transaction });
  if (!user) throw new Error("User not found");

  // Obtener experiencia actual y nivel
  const currentExperience = user.experience || 0;
  const currentLevel = (user.level || 1) as Level;

  // Calcular nueva experiencia
  const experienceGained = EXPERIENCE_BY_DIFFICULTY[difficulty];
  const newExperience = currentExperience + experienceGained;

  // Calcular nuevo nivel
  let newLevel = currentLevel;
  let remainingExperience = newExperience;

  // Verificar si sube de nivel
  while (
    (newLevel + 1) in EXPERIENCE_REQUIREMENTS &&
    remainingExperience >= EXPERIENCE_REQUIREMENTS[(newLevel + 1) as Level]
  ) {
    newLevel = (newLevel + 1) as Level;
  }

  // Actualizar usuario
  user.experience = newExperience;
  user.level = newLevel;
  await user.save({ transaction });

  // Calcular experiencia necesaria para el siguiente nivel
  const nextLevel = (newLevel + 1) as Level;
  const experienceToNextLevel = nextLevel in EXPERIENCE_REQUIREMENTS
    ? EXPERIENCE_REQUIREMENTS[nextLevel] - newExperience
    : 0;

  return {
    level: newLevel,
    experience: newExperience,
    experienceToNextLevel,
  };
};

export const getLevelInfo = async (userId: number) => {
  const user = await db.User.findByPk(userId);
  if (!user) throw new Error("User not found");

  const currentLevel = (user.level || 1) as Level;
  const currentExperience = user.experience || 0;
  const nextLevel = (currentLevel + 1) as Level;
  
  const experienceToNextLevel = nextLevel in EXPERIENCE_REQUIREMENTS
    ? EXPERIENCE_REQUIREMENTS[nextLevel] - currentExperience
    : 0;

  return {
    level: currentLevel,
    experience: currentExperience,
    experienceToNextLevel,
    experienceRequiredForNextLevel: nextLevel in EXPERIENCE_REQUIREMENTS ? EXPERIENCE_REQUIREMENTS[nextLevel] : 0,
  };
}; 
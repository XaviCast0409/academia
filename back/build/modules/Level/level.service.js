"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLevelInfo = exports.addExperience = void 0;
const database_1 = __importDefault(require("../../config/database"));
// Experiencia requerida por nivel
const EXPERIENCE_REQUIREMENTS = {
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
const addExperience = async (userId, difficulty, transaction) => {
    const user = await database_1.default.User.findByPk(userId, { transaction });
    if (!user)
        throw new Error("User not found");
    // Obtener experiencia actual y nivel
    const currentExperience = user.experience || 0;
    const currentLevel = (user.level || 1);
    // Calcular nueva experiencia
    const experienceGained = EXPERIENCE_BY_DIFFICULTY[difficulty];
    const newExperience = currentExperience + experienceGained;
    // Calcular nuevo nivel
    let newLevel = currentLevel;
    let remainingExperience = newExperience;
    // Verificar si sube de nivel
    while ((newLevel + 1) in EXPERIENCE_REQUIREMENTS &&
        remainingExperience >= EXPERIENCE_REQUIREMENTS[(newLevel + 1)]) {
        newLevel = (newLevel + 1);
    }
    // Actualizar usuario
    user.experience = newExperience;
    user.level = newLevel;
    await user.save({ transaction });
    // Calcular experiencia necesaria para el siguiente nivel
    const nextLevel = (newLevel + 1);
    const experienceToNextLevel = nextLevel in EXPERIENCE_REQUIREMENTS
        ? EXPERIENCE_REQUIREMENTS[nextLevel] - newExperience
        : 0;
    // Si subió de nivel, actualizar logros automáticamente
    if (newLevel > currentLevel) {
        try {
            const { updateProgressFromLevelUp } = await Promise.resolve().then(() => __importStar(require("../achievement/achievementProgress.service")));
            await updateProgressFromLevelUp(userId, newLevel);
        }
        catch (error) {
            console.error("Error actualizando logros por subida de nivel:", error);
        }
    }
    return {
        level: newLevel,
        experience: newExperience,
        experienceToNextLevel,
    };
};
exports.addExperience = addExperience;
const getLevelInfo = async (userId) => {
    const user = await database_1.default.User.findByPk(userId);
    if (!user)
        throw new Error("User not found");
    const currentLevel = (user.level || 1);
    const currentExperience = user.experience || 0;
    const nextLevel = (currentLevel + 1);
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
exports.getLevelInfo = getLevelInfo;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNewWeeklyMissions = exports.generateNewDailyMissions = exports.seedMissionsIfEmpty = exports.missionsData = void 0;
const database_1 = __importDefault(require("../../config/database"));
exports.missionsData = [
    // MISIONES DIARIAS
    {
        title: 'Primera Actividad del Día',
        description: 'Completa tu primera actividad del día',
        type: 'DAILY',
        requiredCount: 1,
        rewardType: 'COINS',
        rewardAmount: 10,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
    },
    {
        title: 'Estudiante Activo',
        description: 'Completa y aprueba 3 actividades hoy',
        type: 'DAILY',
        requiredCount: 3,
        rewardType: 'COINS',
        rewardAmount: 25,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    {
        title: 'Máximo Rendimiento Diario',
        description: 'Completa y aprueba 5 actividades en un día',
        type: 'DAILY',
        requiredCount: 5,
        rewardType: 'COINS',
        rewardAmount: 50,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    // MISIONES SEMANALES
    {
        title: 'Estudiante Constante',
        description: 'Completa actividades 5 días diferentes esta semana',
        type: 'WEEKLY',
        requiredCount: 5,
        rewardType: 'COINS',
        rewardAmount: 75,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
    },
    {
        title: 'Semana Productiva',
        description: 'Completa y aprueba 15 actividades esta semana',
        type: 'WEEKLY',
        requiredCount: 15,
        rewardType: 'COINS',
        rewardAmount: 100,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    {
        title: 'Maestro Semanal',
        description: 'Completa y aprueba 30 actividades esta semana',
        type: 'WEEKLY',
        requiredCount: 30,
        rewardType: 'COINS',
        rewardAmount: 200,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    // MISIONES ESPECIALES
    {
        title: 'Explorador Matemático',
        description: 'Completa actividades de todos los temas matemáticos',
        type: 'SPECIAL',
        requiredCount: 20, // 4 actividades por cada uno de los 5 temas
        rewardType: 'COINS',
        rewardAmount: 150,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
    },
    {
        title: 'Perfeccionista',
        description: 'Obtén 10 puntuaciones perfectas (100%)',
        type: 'SPECIAL',
        requiredCount: 10,
        rewardType: 'COINS',
        rewardAmount: 100,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
        title: 'Maratón Académico',
        description: 'Completa 100 actividades aprobadas en un mes',
        type: 'SPECIAL',
        requiredCount: 100,
        rewardType: 'COINS',
        rewardAmount: 500,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
        title: 'Racha Legendaria',
        description: 'Mantén una racha de 15 días consecutivos',
        type: 'SPECIAL',
        requiredCount: 15,
        rewardType: 'COINS',
        rewardAmount: 300,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }
];
const seedMissionsIfEmpty = async () => {
    try {
        // Verificar si la tabla de misiones tiene datos
        const missionCount = await database_1.default.Mission.count();
        if (missionCount === 0) {
            // Crear todas las misiones en batch
            await database_1.default.Mission.bulkCreate(exports.missionsData);
            // Mostrar resumen por tipos
            const types = [...new Set(exports.missionsData.map(m => m.type))];
            types.forEach(type => {
                const count = exports.missionsData.filter(m => m.type === type).length;
            });
        }
        else {
        }
    }
    catch (error) {
        console.error("❌ Error al verificar/crear misiones:", error);
        throw error;
    }
};
exports.seedMissionsIfEmpty = seedMissionsIfEmpty;
const generateNewDailyMissions = async () => {
    try {
        // Desactivar misiones diarias anteriores
        await database_1.default.Mission.update({ isActive: false }, { where: { type: 'DAILY', isActive: true } });
        // Crear nuevas misiones diarias
        const dailyMissions = exports.missionsData.filter(m => m.type === 'DAILY').map(mission => ({
            ...mission,
            startDate: new Date(),
            endDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        }));
        await database_1.default.Mission.bulkCreate(dailyMissions);
    }
    catch (error) {
        console.error("❌ Error al generar misiones diarias:", error);
        throw error;
    }
};
exports.generateNewDailyMissions = generateNewDailyMissions;
const generateNewWeeklyMissions = async () => {
    try {
        // Desactivar misiones semanales anteriores
        await database_1.default.Mission.update({ isActive: false }, { where: { type: 'WEEKLY', isActive: true } });
        // Crear nuevas misiones semanales
        const weeklyMissions = exports.missionsData.filter(m => m.type === 'WEEKLY').map(mission => ({
            ...mission,
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }));
        await database_1.default.Mission.bulkCreate(weeklyMissions);
    }
    catch (error) {
        console.error("❌ Error al generar misiones semanales:", error);
        throw error;
    }
};
exports.generateNewWeeklyMissions = generateNewWeeklyMissions;

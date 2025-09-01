"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAchievementsIfEmpty = exports.achievementsData = void 0;
const database_1 = __importDefault(require("../../config/database"));
exports.achievementsData = [
    // LOGROS DE PROGRESO
    {
        title: 'Primer Paso',
        description: 'Completar tu primera actividad',
        icon: '🚶‍♂️',
        category: 'progress',
        requirementType: 'activities_completed',
        requirementValue: 1,
        rewardType: 'coins',
        rewardValue: '10',
        isActive: true
    },
    {
        title: 'Principiante',
        description: 'Completar 5 actividades',
        icon: '🌟',
        category: 'progress',
        requirementType: 'activities_completed',
        requirementValue: 5,
        rewardType: 'coins',
        rewardValue: '25',
        isActive: true
    },
    {
        title: 'Estudiante Dedicado',
        description: 'Completar 10 actividades',
        icon: '📚',
        category: 'progress',
        requirementType: 'activities_completed',
        requirementValue: 10,
        rewardType: 'coins',
        rewardValue: '50',
        isActive: true
    },
    {
        title: 'Académico',
        description: 'Completar 25 actividades',
        icon: '🎓',
        category: 'progress',
        requirementType: 'activities_completed',
        requirementValue: 25,
        rewardType: 'coins',
        rewardValue: '100',
        isActive: true
    },
    {
        title: 'Maestro del Aprendizaje',
        description: 'Completar 50 actividades',
        icon: '👨‍🎓',
        category: 'progress',
        requirementType: 'activities_completed',
        requirementValue: 50,
        rewardType: 'coins',
        rewardValue: '200',
        isActive: true
    },
    {
        title: 'Leyenda Académica',
        description: 'Completar 100 actividades',
        icon: '🏆',
        category: 'progress',
        requirementType: 'activities_completed',
        requirementValue: 100,
        rewardType: 'coins',
        rewardValue: '500',
        isActive: true
    },
    // LOGROS DE NIVELES
    {
        title: 'Subiendo de Nivel',
        description: 'Alcanzar el nivel 5',
        icon: '⬆️',
        category: 'progress',
        requirementType: 'level_reached',
        requirementValue: 5,
        rewardType: 'coins',
        rewardValue: '50',
        isActive: true
    },
    {
        title: 'Escalador',
        description: 'Alcanzar el nivel 10',
        icon: '🧗‍♂️',
        category: 'progress',
        requirementType: 'level_reached',
        requirementValue: 10,
        rewardType: 'coins',
        rewardValue: '100',
        isActive: true
    },
    {
        title: 'Alto Rendimiento',
        description: 'Alcanzar el nivel 20',
        icon: '🚀',
        category: 'progress',
        requirementType: 'level_reached',
        requirementValue: 20,
        rewardType: 'coins',
        rewardValue: '200',
        isActive: true
    },
    {
        title: 'Elite Académica',
        description: 'Alcanzar el nivel 30',
        icon: '💎',
        category: 'progress',
        requirementType: 'level_reached',
        requirementValue: 30,
        rewardType: 'coins',
        rewardValue: '300',
        isActive: true
    },
    // LOGROS DE MATEMÁTICAS
    {
        title: 'Sumador',
        description: 'Completar 10 actividades de aritmética',
        icon: '➕',
        category: 'math',
        requirementType: 'math_topic',
        requirementValue: 10,
        mathTopic: 'aritmetica',
        rewardType: 'coins',
        rewardValue: '75',
        isActive: true
    },
    {
        title: 'Maestro de Números',
        description: 'Completar 25 actividades de aritmética',
        icon: '🔢',
        category: 'math',
        requirementType: 'math_topic',
        requirementValue: 25,
        mathTopic: 'aritmetica',
        rewardType: 'coins',
        rewardValue: '150',
        isActive: true
    },
    {
        title: 'Algebrista',
        description: 'Completar 10 actividades de álgebra',
        icon: '🧮',
        category: 'math',
        requirementType: 'math_topic',
        requirementValue: 10,
        mathTopic: 'algebra',
        rewardType: 'coins',
        rewardValue: '75',
        isActive: true
    },
    {
        title: 'Maestro Algebraico',
        description: 'Completar 25 actividades de álgebra',
        icon: '📊',
        category: 'math',
        requirementType: 'math_topic',
        requirementValue: 25,
        mathTopic: 'algebra',
        rewardType: 'coins',
        rewardValue: '150',
        isActive: true
    },
    {
        title: 'Geómetra',
        description: 'Completar 10 actividades de geometría',
        icon: '📐',
        category: 'math',
        requirementType: 'math_topic',
        requirementValue: 10,
        mathTopic: 'geometria',
        rewardType: 'coins',
        rewardValue: '75',
        isActive: true
    },
    {
        title: 'Maestro de Formas',
        description: 'Completar 25 actividades de geometría',
        icon: '🔷',
        category: 'math',
        requirementType: 'math_topic',
        requirementValue: 25,
        mathTopic: 'geometria',
        rewardType: 'coins',
        rewardValue: '150',
        isActive: true
    },
    {
        title: 'Trigonometrista',
        description: 'Completar 10 actividades de trigonometría',
        icon: '📏',
        category: 'math',
        requirementType: 'math_topic',
        requirementValue: 10,
        mathTopic: 'trigonometria',
        rewardType: 'coins',
        rewardValue: '75',
        isActive: true
    },
    {
        title: 'Maestro de Ángulos',
        description: 'Completar 25 actividades de trigonometría',
        icon: '📐',
        category: 'math',
        requirementType: 'math_topic',
        requirementValue: 25,
        mathTopic: 'trigonometria',
        rewardType: 'coins',
        rewardValue: '150',
        isActive: true
    },
    {
        title: 'Razonador',
        description: 'Completar 10 actividades de razonamiento matemático',
        icon: '🧠',
        category: 'math',
        requirementType: 'math_topic',
        requirementValue: 10,
        mathTopic: 'razonamiento_matematico',
        rewardType: 'coins',
        rewardValue: '75',
        isActive: true
    },
    {
        title: 'Maestro del Pensamiento',
        description: 'Completar 25 actividades de razonamiento matemático',
        icon: '🎯',
        category: 'math',
        requirementType: 'math_topic',
        requirementValue: 25,
        mathTopic: 'razonamiento_matematico',
        rewardType: 'coins',
        rewardValue: '150',
        isActive: true
    },
    // LOGROS DE GAMIFICACIÓN
    {
        title: 'Coleccionista',
        description: 'Ganar 1000 Xavicoints',
        icon: '💰',
        category: 'gamification',
        requirementType: 'coins_earned',
        requirementValue: 1000,
        rewardType: 'coins',
        rewardValue: '100',
        isActive: true
    },
    {
        title: 'Rico en Conocimiento',
        description: 'Ganar 5000 Xavicoints',
        icon: '💎',
        category: 'gamification',
        requirementType: 'coins_earned',
        requirementValue: 5000,
        rewardType: 'coins',
        rewardValue: '500',
        isActive: true
    },
    {
        title: 'Millonario del Saber',
        description: 'Ganar 10000 Xavicoints',
        icon: '🏦',
        category: 'gamification',
        requirementType: 'coins_earned',
        requirementValue: 10000,
        rewardType: 'coins',
        rewardValue: '1000',
        isActive: true
    },
    // LOGROS DE PERFECCIÓN
    {
        title: 'Perfeccionista',
        description: 'Obtener 5 puntuaciones perfectas',
        icon: '⭐',
        category: 'competition',
        requirementType: 'perfect_scores',
        requirementValue: 5,
        rewardType: 'coins',
        rewardValue: '100',
        isActive: true
    },
    {
        title: 'Excelencia Pura',
        description: 'Obtener 10 puntuaciones perfectas',
        icon: '🌟',
        category: 'competition',
        requirementType: 'perfect_scores',
        requirementValue: 10,
        rewardType: 'coins',
        rewardValue: '200',
        isActive: true
    },
    {
        title: 'Maestro de la Perfección',
        description: 'Obtener 25 puntuaciones perfectas',
        icon: '✨',
        category: 'competition',
        requirementType: 'perfect_scores',
        requirementValue: 25,
        rewardType: 'coins',
        rewardValue: '500',
        isActive: true
    },
    // LOGROS DE CONSTANCIA
    {
        title: 'Constante',
        description: 'Mantener una racha de 3 días',
        icon: '🔥',
        category: 'gamification',
        requirementType: 'streak_days',
        requirementValue: 3,
        rewardType: 'coins',
        rewardValue: '50',
        isActive: true
    },
    {
        title: 'Dedicado',
        description: 'Mantener una racha de 7 días',
        icon: '🎯',
        category: 'gamification',
        requirementType: 'streak_days',
        requirementValue: 7,
        rewardType: 'coins',
        rewardValue: '100',
        isActive: true
    },
    {
        title: 'Incansable',
        description: 'Mantener una racha de 15 días',
        icon: '💪',
        category: 'gamification',
        requirementType: 'streak_days',
        requirementValue: 15,
        rewardType: 'coins',
        rewardValue: '200',
        isActive: true
    },
    {
        title: 'Leyenda de la Persistencia',
        description: 'Mantener una racha de 30 días',
        icon: '👑',
        category: 'gamification',
        requirementType: 'streak_days',
        requirementValue: 30,
        rewardType: 'coins',
        rewardValue: '500',
        isActive: true
    },
    // LOGROS ESPECIALES
    {
        title: 'Explorador Matemático',
        description: 'Completar actividades en todos los temas matemáticos',
        icon: '🗺️',
        category: 'special',
        requirementType: 'activities_completed',
        requirementValue: 50,
        requirementCondition: 'unique',
        rewardType: 'coins',
        rewardValue: '300',
        isActive: true
    },
    {
        title: 'Estudiante del Año',
        description: 'Logro especial por excelencia académica',
        icon: '🏅',
        category: 'special',
        requirementType: 'activities_completed',
        requirementValue: 200,
        rewardType: 'coins',
        rewardValue: '1000',
        isActive: true
    }
];
const seedAchievementsIfEmpty = async () => {
    try {
        // Verificar si la tabla de logros tiene datos
        const achievementCount = await database_1.default.Achievement.count();
        if (achievementCount === 0) {
            // Crear todos los logros en batch
            await database_1.default.Achievement.bulkCreate(exports.achievementsData);
            // Mostrar resumen por categorías
            const categories = [...new Set(exports.achievementsData.map(a => a.category))];
            categories.forEach(category => {
                const count = exports.achievementsData.filter(a => a.category === category).length;
            });
        }
        else {
        }
    }
    catch (error) {
        console.error("❌ Error al verificar/crear logros:", error);
        throw error;
    }
};
exports.seedAchievementsIfEmpty = seedAchievementsIfEmpty;

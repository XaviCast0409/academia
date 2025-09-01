"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionScheduler = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const mission_service_1 = require("../modules/mission/mission.service");
/**
 * Servicio de programación de tareas para regeneración automática de misiones
 */
class MissionScheduler {
    constructor() {
        this.isInitialized = false;
    }
    static getInstance() {
        if (!MissionScheduler.instance) {
            MissionScheduler.instance = new MissionScheduler();
        }
        return MissionScheduler.instance;
    }
    /**
     * Inicializar el programador de misiones
     */
    initialize() {
        if (this.isInitialized) {
            return;
        }
        // Programar regeneración de misiones diarias - cada día a las 00:00
        node_cron_1.default.schedule('0 0 * * *', async () => {
            try {
                await (0, mission_service_1.generateDailyMissions)();
            }
            catch (error) {
            }
        }, {
            timezone: "America/Lima"
        });
        // Programar regeneración de misiones semanales - cada domingo a las 00:00
        node_cron_1.default.schedule('0 0 * * 0', async () => {
            try {
                await (0, mission_service_1.generateWeeklyMissions)();
            }
            catch (error) {
            }
        }, {
            timezone: "America/Lima"
        });
        // Programar limpieza de misiones expiradas - cada hora
        node_cron_1.default.schedule('0 * * * *', async () => {
            try {
                await (0, mission_service_1.cleanupExpiredMissions)();
            }
            catch (error) {
            }
        }, {
            timezone: "America/Lima"
        });
        this.isInitialized = true;
    }
    getStatus() {
        return {
            isInitialized: this.isInitialized
        };
    }
}
exports.MissionScheduler = MissionScheduler;
exports.default = MissionScheduler;

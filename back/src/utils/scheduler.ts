import cron from 'node-cron';
import { generateDailyMissions, generateWeeklyMissions, cleanupExpiredMissions } from '../modules/mission/mission.service';

/**
 * Servicio de programación de tareas para regeneración automática de misiones
 */
export class MissionScheduler {
  private static instance: MissionScheduler;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): MissionScheduler {
    if (!MissionScheduler.instance) {
      MissionScheduler.instance = new MissionScheduler();
    }
    return MissionScheduler.instance;
  }

  /**
   * Inicializar el programador de misiones
   */
  public initialize(): void {
    if (this.isInitialized) {
      return;
    }

    // Programar regeneración de misiones diarias - cada día a las 00:00
    cron.schedule('0 0 * * *', async () => {
      try {
        await generateDailyMissions();
      } catch (error) {
        
      }
    }, {
      timezone: "America/Lima"
    });

    // Programar regeneración de misiones semanales - cada domingo a las 00:00
    cron.schedule('0 0 * * 0', async () => {
      try {
        await generateWeeklyMissions();
      } catch (error) {
        
      }
    }, {
      timezone: "America/Lima"
    });

    // Programar limpieza de misiones expiradas - cada hora
    cron.schedule('0 * * * *', async () => {
      try {
        await cleanupExpiredMissions();
      } catch (error) {
        
      }
    }, {
      timezone: "America/Lima"
    });

    this.isInitialized = true;
  }

  public getStatus(): { isInitialized: boolean } {
    return {
      isInitialized: this.isInitialized
    };
  }
}

export default MissionScheduler;
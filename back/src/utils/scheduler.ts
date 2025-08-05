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
      console.log('⚠️ Programador de misiones ya inicializado');
      return;
    }

    console.log('🚀 Inicializando programador de misiones...');

    // Programar regeneración de misiones diarias - cada día a las 00:00
    cron.schedule('0 0 * * *', async () => {
      console.log('🔄 Ejecutando regeneración automática de misiones diarias...');
      try {
        await generateDailyMissions();
        console.log('✅ Misiones diarias regeneradas exitosamente');
      } catch (error) {
        console.error('❌ Error regenerando misiones diarias:', error);
      }
    }, {
      timezone: "America/Lima"
    });

    // Programar regeneración de misiones semanales - cada domingo a las 00:00
    cron.schedule('0 0 * * 0', async () => {
      console.log('🔄 Ejecutando regeneración automática de misiones semanales...');
      try {
        await generateWeeklyMissions();
        console.log('✅ Misiones semanales regeneradas exitosamente');
      } catch (error) {
        console.error('❌ Error regenerando misiones semanales:', error);
      }
    }, {
      timezone: "America/Lima"
    });

    // Programar limpieza de misiones expiradas - cada hora
    cron.schedule('0 * * * *', async () => {
      console.log('🧹 Ejecutando limpieza de misiones expiradas...');
      try {
        await cleanupExpiredMissions();
        console.log('✅ Limpieza de misiones expiradas completada');
      } catch (error) {
        console.error('❌ Error limpiando misiones expiradas:', error);
      }
    }, {
      timezone: "America/Lima"
    });

    this.isInitialized = true;
    console.log('✅ Programador de misiones inicializado correctamente');
  }

  public getStatus(): { isInitialized: boolean } {
    return {
      isInitialized: this.isInitialized
    };
  }
}

export default MissionScheduler;
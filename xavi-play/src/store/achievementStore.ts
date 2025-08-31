/**
 * Archivo de compatibilidad para el store de logros
 * Exporta el nuevo sistema modular manteniendo la interfaz anterior
 */

// Importar el nuevo sistema modular
import { useAchievementStore as useNewAchievementStore } from './achievement';

// Exportar con el nombre anterior para mantener compatibilidad
export const useAchievementStore = useNewAchievementStore;

// Exportar también como default para compatibilidad
export default useNewAchievementStore;

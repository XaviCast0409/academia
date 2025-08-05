const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Función para probar el sistema de progreso de logros
async function testAchievementProgress() {
  try {
    console.log('🧪 Iniciando pruebas del sistema de progreso de logros...\n');

    // 1. Probar actualización por actividad
    console.log('1️⃣ Probando actualización por actividad...');
    const activityResponse = await axios.post(`${BASE_URL}/achievements/progress/activity/1`, {
      activityType: 'math',
      mathTopic: 'algebra',
      perfectScore: true
    });
    console.log('✅ Actividad actualizada:', activityResponse.data);

    // 2. Probar actualización por subida de nivel
    console.log('\n2️⃣ Probando actualización por subida de nivel...');
    const levelResponse = await axios.post(`${BASE_URL}/achievements/progress/level/1`, {
      newLevel: 5
    });
    console.log('✅ Nivel actualizado:', levelResponse.data);

    // 3. Probar actualización por XaviCoins
    console.log('\n3️⃣ Probando actualización por XaviCoins...');
    const coinsResponse = await axios.post(`${BASE_URL}/achievements/progress/coins/1`, {
      totalCoins: 150
    });
    console.log('✅ XaviCoins actualizadas:', coinsResponse.data);

    // 4. Probar función principal (múltiples acciones)
    console.log('\n4️⃣ Probando función principal...');
    const mainResponse = await axios.post(`${BASE_URL}/achievements/progress/action/1`, {
      activityType: 'math',
      mathTopic: 'geometria',
      perfectScore: false,
      xavicoinsEarned: 25,
      levelReached: 6,
      streakDays: 7
    });
    console.log('✅ Función principal ejecutada:', mainResponse.data);

    // 5. Obtener progreso detallado
    console.log('\n5️⃣ Obteniendo progreso detallado...');
    const progressResponse = await axios.get(`${BASE_URL}/achievements/progress/progress/1`);
    console.log('✅ Progreso obtenido:', progressResponse.data);

    // 6. Probar actualización forzada
    console.log('\n6️⃣ Probando actualización forzada...');
    const forceResponse = await axios.post(`${BASE_URL}/achievements/progress/force-update/1`);
    console.log('✅ Actualización forzada completada:', forceResponse.data);

    console.log('\n🎉 ¡Todas las pruebas completadas exitosamente!');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.response?.data || error.message);
  }
}

// Ejecutar las pruebas
testAchievementProgress(); 
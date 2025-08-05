const axios = require('axios');
const BASE_URL = 'http://localhost:3000';

async function testAchievementAssociations() {
  try {
    console.log('🔍 Probando asociaciones de logros...\n');
    
    // 1. Verificar que existen logros en la base de datos
    console.log('1️⃣ Verificando logros disponibles:');
    try {
      const achievementsResponse = await axios.get(`${BASE_URL}/achievements`);
      const achievements = achievementsResponse.data;
      console.log(`   ✅ Encontrados ${achievements.length} logros en la base de datos`);
      
      // Mostrar los primeros 5 logros
      achievements.slice(0, 5).forEach((achievement, index) => {
        console.log(`   ${index + 1}. ${achievement.title} (ID: ${achievement.id}, Activo: ${achievement.isActive})`);
      });
    } catch (error) {
      console.log(`   ❌ Error obteniendo logros: ${error.response?.data?.message || error.message}`);
      return;
    }

    // 2. Verificar UserAchievements de un usuario específico
    console.log('\n2️⃣ Verificando UserAchievements del usuario 1:');
    try {
      const userAchievementsResponse = await axios.get(`${BASE_URL}/achievements/progress/debug/1`);
      const debugData = userAchievementsResponse.data.data;
      
      console.log(`   ✅ Usuario encontrado: ${debugData.user.name} (ID: ${debugData.user.id})`);
      console.log(`   📊 Estadísticas:`);
      console.log(`      - Total logros del sistema: ${debugData.statistics.totalAchievements}`);
      console.log(`      - UserAchievements del usuario: ${debugData.statistics.userAchievements}`);
      console.log(`      - Logros desbloqueados: ${debugData.statistics.unlockedAchievements}`);
      
      // Verificar si los UserAchievements tienen achievement asociado
      const userAchievements = debugData.userAchievements;
      console.log(`\n   🔍 Verificando asociaciones de UserAchievements:`);
      
      let withAchievement = 0;
      let withoutAchievement = 0;
      
      userAchievements.forEach((ua, index) => {
        if (ua.achievementTitle) {
          withAchievement++;
          console.log(`   ${index + 1}. ✅ UserAchievement ${ua.id}: "${ua.achievementTitle}"`);
        } else {
          withoutAchievement++;
          console.log(`   ${index + 1}. ❌ UserAchievement ${ua.id}: Sin achievement asociado`);
        }
      });
      
      console.log(`\n   📈 Resumen:`);
      console.log(`      - Con achievement: ${withAchievement}`);
      console.log(`      - Sin achievement: ${withoutAchievement}`);
      
    } catch (error) {
      console.log(`   ❌ Error obteniendo UserAchievements: ${error.response?.data?.message || error.message}`);
    }

    // 3. Verificar directamente la tabla user_achievements
    console.log('\n3️⃣ Verificando tabla user_achievements directamente:');
    try {
      // Intentar obtener UserAchievements sin include para ver si existen
      const rawUserAchievementsResponse = await axios.get(`${BASE_URL}/achievements/user?userId=1`);
      const rawUserAchievements = rawUserAchievementsResponse.data.data?.userAchievements || rawUserAchievementsResponse.data;
      
      console.log(`   ✅ Encontrados ${rawUserAchievements.length} UserAchievements sin include`);
      
      // Mostrar los primeros 3
      rawUserAchievements.slice(0, 3).forEach((ua, index) => {
        console.log(`   ${index + 1}. ID: ${ua.id}, AchievementID: ${ua.achievementId}, Progress: ${ua.progress}`);
      });
      
    } catch (error) {
      console.log(`   ❌ Error obteniendo UserAchievements raw: ${error.response?.data?.message || error.message}`);
    }

  } catch (error) {
    console.error('❌ Error en el test:', error.response?.data || error.message);
  }
}

testAchievementAssociations(); 
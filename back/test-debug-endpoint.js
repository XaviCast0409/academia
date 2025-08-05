const axios = require('axios');
const BASE_URL = 'http://localhost:3000';

async function testDebugEndpoint() {
  try {
    console.log('🔍 Probando endpoint de debug...\n');
    
    const userId = 1;
    console.log(`📊 Obteniendo datos de debug para usuario ${userId}:`);
    
    const response = await axios.get(`${BASE_URL}/achievements/progress/debug/${userId}`);
    const debugData = response.data.data;
    
    console.log('✅ Respuesta exitosa del endpoint de debug');
    console.log(`📋 Datos del usuario: ${debugData.user.name} (ID: ${debugData.user.id})`);
    console.log(`📊 Estadísticas:`);
    console.log(`   - Total logros del sistema: ${debugData.statistics.totalAchievements}`);
    console.log(`   - UserAchievements del usuario: ${debugData.statistics.userAchievements}`);
    console.log(`   - Logros desbloqueados: ${debugData.statistics.unlockedAchievements}`);
    
    console.log('\n🔍 Verificando UserAchievements:');
    const userAchievements = debugData.userAchievements;
    
    if (userAchievements && userAchievements.length > 0) {
      console.log(`   📋 Encontrados ${userAchievements.length} UserAchievements`);
      
      // Mostrar los primeros 5 con detalles
      userAchievements.slice(0, 5).forEach((ua, index) => {
        console.log(`   ${index + 1}. ID: ${ua.id}`);
        console.log(`      - AchievementID: ${ua.achievementId}`);
        console.log(`      - Título: ${ua.achievement?.title || 'SIN TÍTULO'}`);
        console.log(`      - Progress: ${ua.progress}`);
        console.log(`      - Unlocked: ${ua.isUnlocked}`);
        console.log(`      - RequirementType: ${ua.achievement?.requirementType || 'N/A'}`);
        console.log(`      - RequirementValue: ${ua.achievement?.requirementValue || 'N/A'}`);
      });
      
      // Contar cuántos tienen achievement
      const withAchievement = userAchievements.filter(ua => ua.achievement).length;
      const withoutAchievement = userAchievements.filter(ua => !ua.achievement).length;
      
      console.log(`\n📈 Resumen:`);
      console.log(`   - Con achievement: ${withAchievement}`);
      console.log(`   - Sin achievement: ${withoutAchievement}`);
      
      if (withoutAchievement > 0) {
        console.log(`\n❌ UserAchievements sin achievement (primeros 3):`);
        userAchievements.filter(ua => !ua.achievement).slice(0, 3).forEach((ua, index) => {
          console.log(`   ${index + 1}. UserAchievement ID: ${ua.id}, AchievementID: ${ua.achievementId}`);
        });
      }
    } else {
      console.log('   ❌ No se encontraron UserAchievements');
    }
    
  } catch (error) {
    console.error('❌ Error en el test:', error.response?.data || error.message);
  }
}

testDebugEndpoint(); 
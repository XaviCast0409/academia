const axios = require('axios');
const BASE_URL = 'http://localhost:3000';

async function checkDatabase() {
  try {
    console.log('🔍 Verificando base de datos...\n');
    
    // 1. Verificar si el servidor está corriendo
    console.log('1️⃣ Verificando servidor:');
    try {
      const response = await axios.get(`${BASE_URL}/activities`);
      console.log('   ✅ Servidor respondiendo correctamente');
    } catch (error) {
      console.log('   ❌ Servidor no responde:', error.message);
      return;
    }

    // 2. Verificar logros disponibles
    console.log('\n2️⃣ Verificando logros:');
    try {
      const achievementsResponse = await axios.get(`${BASE_URL}/achievements`);
      const achievements = achievementsResponse.data;
      console.log(`   ✅ Encontrados ${achievements.length} logros`);
      
      if (achievements.length > 0) {
        console.log('   📋 Primeros 3 logros:');
        achievements.slice(0, 3).forEach((achievement, index) => {
          console.log(`      ${index + 1}. ${achievement.title} (ID: ${achievement.id}, Activo: ${achievement.isActive})`);
        });
      }
    } catch (error) {
      console.log('   ❌ Error obteniendo logros:', error.response?.data?.message || error.message);
    }

    // 3. Verificar UserAchievements del usuario 1
    console.log('\n3️⃣ Verificando UserAchievements del usuario 1:');
    try {
      const userAchievementsResponse = await axios.get(`${BASE_URL}/achievements/user?userId=1`);
      const userAchievements = userAchievementsResponse.data.data?.userAchievements || userAchievementsResponse.data;
      console.log(`   ✅ Encontrados ${userAchievements.length} UserAchievements`);
      
      if (userAchievements.length > 0) {
        console.log('   📋 Primeros 3 UserAchievements:');
        userAchievements.slice(0, 3).forEach((ua, index) => {
          console.log(`      ${index + 1}. ID: ${ua.id}, AchievementID: ${ua.achievementId}, Progress: ${ua.progress}, Unlocked: ${ua.isUnlocked}`);
        });
      }
    } catch (error) {
      console.log('   ❌ Error obteniendo UserAchievements:', error.response?.data?.message || error.message);
    }

    // 4. Verificar si los achievementIds en UserAchievements corresponden a logros reales
    console.log('\n4️⃣ Verificando correspondencia de IDs:');
    try {
      const achievementsResponse = await axios.get(`${BASE_URL}/achievements`);
      const achievements = achievementsResponse.data;
      const achievementIds = achievements.map(a => a.id);
      
      const userAchievementsResponse = await axios.get(`${BASE_URL}/achievements/user?userId=1`);
      const userAchievements = userAchievementsResponse.data.data?.userAchievements || userAchievementsResponse.data;
      
      let validIds = 0;
      let invalidIds = 0;
      
      userAchievements.forEach(ua => {
        if (achievementIds.includes(ua.achievementId)) {
          validIds++;
        } else {
          invalidIds++;
          console.log(`      ❌ UserAchievement ${ua.id} apunta a Achievement ${ua.achievementId} que no existe`);
        }
      });
      
      console.log(`   📊 Resumen:`);
      console.log(`      - IDs válidos: ${validIds}`);
      console.log(`      - IDs inválidos: ${invalidIds}`);
      
    } catch (error) {
      console.log('   ❌ Error verificando correspondencia:', error.response?.data?.message || error.message);
    }

  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
}

checkDatabase(); 
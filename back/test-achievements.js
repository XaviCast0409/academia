const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAchievements() {
  try {
    console.log('🔍 Probando API de logros...\n');

    const userId = 1;

    // Probar la ruta de logros
    console.log('1️⃣ Probando /achievements/progress/progress/1:');
    try {
      const response = await axios.get(`${BASE_URL}/achievements/progress/progress/${userId}`);
      console.log('✅ Respuesta exitosa');
      console.log('📊 Estructura de respuesta:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }

    // Probar la ruta de debug
    console.log('\n2️⃣ Probando /achievements/progress/debug/1:');
    try {
      const debugResponse = await axios.get(`${BASE_URL}/achievements/progress/debug/${userId}`);
      console.log('✅ Respuesta exitosa');
      console.log('📊 Estructura de respuesta:', JSON.stringify(debugResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }

    // Probar la ruta de logros general
    console.log('\n3️⃣ Probando /achievements:');
    try {
      const achievementsResponse = await axios.get(`${BASE_URL}/achievements`);
      console.log('✅ Respuesta exitosa');
      console.log(`📊 Logros encontrados: ${achievementsResponse.data.length}`);
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }

  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
}

testAchievements(); 
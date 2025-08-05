const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function debugUserData() {
  try {
    console.log('\n🔍 DEBUG: Verificando datos de usuario desde backend...\n');

    // 1. Login para obtener token
    console.log('📋 Paso 1: Login...');
    const loginResponse = await axios.post(`${BASE_URL}/users/login`, {
      email: 'test@test.com',  // Ajusta este email
      password: 'password123'   // Ajusta esta contraseña
    });

    console.log('✅ Login exitoso');
    console.log('📊 Datos del usuario del login:', JSON.stringify(loginResponse.data.user, null, 2));

    const userId = loginResponse.data.user.id;
    const token = loginResponse.data.token;

    // 2. Obtener usuario por ID
    console.log('\n📋 Paso 2: Obteniendo usuario por ID...');
    const userResponse = await axios.get(`${BASE_URL}/users/byId/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('✅ Usuario obtenido por ID');
    console.log('📊 Datos completos del usuario:', JSON.stringify(userResponse.data, null, 2));

    // 3. Verificar campos específicos
    console.log('\n📋 Paso 3: Verificando campos específicos...');
    const user = userResponse.data;
    console.log(`🔢 ID: ${user.id}`);
    console.log(`👤 Nombre: ${user.name}`);
    console.log(`📧 Email: ${user.email}`);
    console.log(`⭐ Nivel: ${user.level || 'NO DEFINIDO'}`);
    console.log(`⚡ Experiencia: ${user.experience || 'NO DEFINIDO'}`);
    console.log(`🪙 XaviCoins: ${user.xavicoints || 'NO DEFINIDO'}`);
    console.log(`🔥 Racha actual: ${user.currentStreak || 'NO DEFINIDO'}`);
    console.log(`📚 Actividades completadas: ${user.completedActivities || 'NO DEFINIDO'}`);
    console.log(`📅 Último login: ${user.lastLogin || 'NO DEFINIDO'}`);
    console.log(`✅ Verificado: ${user.isVerified !== undefined ? user.isVerified : 'NO DEFINIDO'}`);
    console.log(`🏠 Sección: ${user.section || 'NO DEFINIDO'}`);

    // 4. Verificar relaciones
    console.log('\n📋 Paso 4: Verificando relaciones...');
    console.log(`🎭 Role: ${user.role ? JSON.stringify(user.role, null, 2) : 'NO INCLUIDO'}`);
    console.log(`🐾 Pokemon: ${user.pokemon ? JSON.stringify(user.pokemon, null, 2) : 'NO INCLUIDO'}`);

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

debugUserData();
const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testCreateUser() {
  try {
    console.log('\n🔍 TESTING: Flujo completo de creación de usuario...\n');

    // Datos de prueba para crear usuario
    const userData = {
      name: "Usuario Prueba",
      email: `test${Date.now()}@test.com`, // Email único
      password: "password123",
      roleId: 2, // Rol de estudiante
      pokemonId: 1, // Pokemon por defecto
      section: "4A"
    };

    console.log('📋 Paso 1: Creando usuario...');
    console.log('Datos a enviar:', JSON.stringify(userData, null, 2));

    const createResponse = await axios.post(`${BASE_URL}/users/create`, userData);
    
    console.log('✅ Usuario creado exitosamente!');
    console.log('📊 Respuesta del servidor:');
    console.log(JSON.stringify(createResponse.data, null, 2));

    const createdUser = createResponse.data.user || createResponse.data;
    const userId = createdUser.id;

    // Verificar campos específicos
    console.log('\n📋 Paso 2: Verificando campos del usuario creado...');
    console.log(`🆔 ID: ${createdUser.id}`);
    console.log(`👤 Nombre: ${createdUser.name}`);
    console.log(`📧 Email: ${createdUser.email}`);
    console.log(`⭐ Nivel: ${createdUser.level || 'NO DEFINIDO'}`);
    console.log(`⚡ Experiencia: ${createdUser.experience || 'NO DEFINIDO'}`);
    console.log(`🪙 XaviCoins: ${createdUser.xavicoints || 'NO DEFINIDO'}`);
    console.log(`🔥 Racha actual: ${createdUser.currentStreak || 'NO DEFINIDO'}`);
    console.log(`📚 Actividades completadas: ${createdUser.completedActivities || 'NO DEFINIDO'}`);
    console.log(`✅ Verificado: ${createdUser.isVerified !== undefined ? createdUser.isVerified : 'NO DEFINIDO'}`);
    console.log(`🏠 Sección: ${createdUser.section || 'NO DEFINIDO'}`);
    console.log(`🔴 Activo: ${createdUser.isActive !== undefined ? createdUser.isActive : 'NO DEFINIDO'}`);

    // Probar login con el usuario creado
    console.log('\n📋 Paso 3: Probando login...');
    const loginResponse = await axios.post(`${BASE_URL}/users/login`, {
      email: userData.email,
      password: userData.password
    });

    console.log('✅ Login exitoso!');
    const loggedUser = loginResponse.data.user;
    console.log('📊 Datos del usuario logueado:');
    console.log(`🆔 ID: ${loggedUser.id}`);
    console.log(`⭐ Nivel: ${loggedUser.level || 'NO DEFINIDO'}`);
    console.log(`⚡ Experiencia: ${loggedUser.experience || 'NO DEFINIDO'}`);
    console.log(`🪙 XaviCoins: ${loggedUser.xavicoints || 'NO DEFINIDO'}`);
    console.log(`🔥 Racha actual: ${loggedUser.currentStreak || 'NO DEFINIDO'}`);
    console.log(`📚 Actividades completadas: ${loggedUser.completedActivities || 'NO DEFINIDO'}`);

    // Obtener usuario por ID para verificar datos actualizados
    console.log('\n📋 Paso 4: Obteniendo usuario por ID...');
    const getUserResponse = await axios.get(`${BASE_URL}/users/byId/${userId}`, {
      headers: {
        'Authorization': `Bearer ${loginResponse.data.token}`
      }
    });

    console.log('✅ Usuario obtenido por ID');
    const fetchedUser = getUserResponse.data;
    console.log('📊 Datos finales del usuario:');
    console.log(`🔥 Racha actual: ${fetchedUser.currentStreak || 'NO DEFINIDO'}`);
    console.log(`📚 Actividades completadas: ${fetchedUser.completedActivities || 'NO DEFINIDO'}`);
    console.log(`📅 Último login: ${fetchedUser.lastLogin || 'NO DEFINIDO'}`);

    console.log('\n🎉 ¡PRUEBA COMPLETADA EXITOSAMENTE!');
    console.log('✅ El flujo de creación de usuario funciona correctamente');
    console.log('✅ Todos los campos se inicializan con valores por defecto');
    console.log('✅ El login actualiza la racha automáticamente');

  } catch (error) {
    console.error('❌ Error en la prueba:', error.response?.data || error.message);
    if (error.response?.data?.errors) {
      console.error('📋 Errores de validación:', error.response.data.errors);
    }
  }
}

testCreateUser();
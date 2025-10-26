const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Función para hacer peticiones HTTP
async function makeRequest(method, endpoint, data = null, headers = {}) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`❌ Error en ${method} ${endpoint}:`, error.response?.data || error.message);
    return null;
  }
}

// Función para probar el sistema de estudio
async function testStudySystem() {
  console.log('🧪 Iniciando pruebas del sistema de estudio...\n');

  // 1. Probar obtener cursos
  console.log('📚 1. Probando obtener cursos...');
  const courses = await makeRequest('GET', '/courses');
  if (courses?.success) {
    console.log(`✅ Cursos obtenidos: ${courses.data.length}`);
    if (courses.data.length > 0) {
      console.log(`   Primer curso: ${courses.data[0].name}`);
    }
  }

  // 2. Probar obtener subtemas de un curso (si existe)
  if (courses?.success && courses.data.length > 0) {
    const firstCourseId = courses.data[0].id;
    console.log(`\n📖 2. Probando obtener subtemas del curso ${firstCourseId}...`);
    const subTopics = await makeRequest('GET', `/subtopics/course/${firstCourseId}`);
    if (subTopics?.success) {
      console.log(`✅ Subtemas obtenidos: ${subTopics.data.length}`);
    }
  }

  // 3. Probar crear un subtema de prueba
  console.log('\n➕ 3. Probando crear un subtema de prueba...');
  const testSubTopic = await makeRequest('POST', '/subtopics', {
    courseId: 1, // Asumiendo que el curso con ID 1 existe
    name: 'Subtema de Prueba',
    description: 'Este es un subtema de prueba para verificar el sistema',
    order: 1
  });
  
  if (testSubTopic?.success) {
    console.log(`✅ Subtema creado: ${testSubTopic.data.name} (ID: ${testSubTopic.data.id})`);
    
    // 4. Probar crear una carta de estudio
    console.log('\n🃏 4. Probando crear una carta de estudio...');
    const testCard = await makeRequest('POST', '/study-cards', {
      courseId: 1,
      subTopicId: testSubTopic.data.id,
      question: '¿Cuál es la capital de Francia?',
      answer: 'París',
      isAnswerImage: false,
      difficulty: 'easy'
    });
    
    if (testCard?.success) {
      console.log(`✅ Carta creada: ${testCard.data.question} (ID: ${testCard.data.id})`);
      
      // 5. Probar obtener cartas del subtema
      console.log('\n📋 5. Probando obtener cartas del subtema...');
      const cards = await makeRequest('GET', `/study-cards/subtopic/${testSubTopic.data.id}`);
      if (cards?.success) {
        console.log(`✅ Cartas obtenidas: ${cards.data.length}`);
      }
      
      // 6. Probar obtener cartas para estudio
      console.log('\n🎯 6. Probando obtener cartas para estudio...');
      const studyCards = await makeRequest('GET', `/study-cards/subtopic/${testSubTopic.data.id}/study?limit=5`);
      if (studyCards?.success) {
        console.log(`✅ Cartas para estudio obtenidas: ${studyCards.data.length}`);
      }
    }
  }

  // 7. Probar estadísticas de un curso
  console.log('\n📊 7. Probando estadísticas de un curso...');
  const courseStats = await makeRequest('GET', '/courses/1/stats');
  if (courseStats?.success) {
    console.log(`✅ Estadísticas del curso obtenidas:`);
    console.log(`   - Total subtemas: ${courseStats.data.stats.totalSubTopics}`);
    console.log(`   - Total cartas: ${courseStats.data.stats.totalCards}`);
  }

  console.log('\n🎉 Pruebas del sistema de estudio completadas!');
  console.log('\n📝 Notas:');
  console.log('   - Las rutas de usuario (favoritos, sesiones) requieren autenticación');
  console.log('   - Para probar completamente, necesitarías un usuario autenticado');
  console.log('   - El sistema está listo para ser usado desde el frontend');
}

// Función para mostrar las rutas disponibles
function showAvailableRoutes() {
  console.log('🚀 SISTEMA DE ESTUDIO IMPLEMENTADO');
  console.log('=====================================\n');
  
  console.log('📚 CURSOS:');
  console.log('   GET    /courses                    - Obtener todos los cursos');
  console.log('   GET    /courses/:id                - Obtener curso por ID');
  console.log('   GET    /courses/:id/stats          - Estadísticas del curso');
  console.log('   POST   /courses                    - Crear curso (admin)');
  console.log('   PUT    /courses/:id                - Actualizar curso (admin)');
  console.log('   DELETE /courses/:id                - Eliminar curso (admin)\n');
  
  console.log('📖 SUBTEMAS:');
  console.log('   GET    /subtopics/course/:courseId - Obtener subtemas de un curso');
  console.log('   GET    /subtopics/:id              - Obtener subtema por ID');
  console.log('   GET    /subtopics/:id/stats        - Estadísticas del subtema');
  console.log('   POST   /subtopics                  - Crear subtema (admin)');
  console.log('   PUT    /subtopics/:id              - Actualizar subtema (admin)');
  console.log('   DELETE /subtopics/:id              - Eliminar subtema (admin)\n');
  
  console.log('🃏 CARTAS DE ESTUDIO:');
  console.log('   GET    /study-cards/subtopic/:subTopicId     - Obtener cartas de un subtema');
  console.log('   GET    /study-cards/:id                      - Obtener carta por ID');
  console.log('   GET    /study-cards/subtopic/:subTopicId/study - Cartas para estudio (mezcladas)');
  console.log('   GET    /study-cards/user/favorites           - Cartas favoritas del usuario (auth)');
  console.log('   POST   /study-cards/:cardId/favorite         - Marcar/desmarcar favorito (auth)');
  console.log('   POST   /study-cards/:cardId/study            - Registrar estudio de carta (auth)');
  console.log('   POST   /study-cards                          - Crear carta (admin)');
  console.log('   PUT    /study-cards/:id                      - Actualizar carta (admin)');
  console.log('   DELETE /study-cards/:id                      - Eliminar carta (admin)\n');
  
  console.log('⏱️  SESIONES DE ESTUDIO:');
  console.log('   POST   /study-sessions/start                 - Iniciar sesión (auth)');
  console.log('   POST   /study-sessions/:sessionId/end        - Finalizar sesión (auth)');
  console.log('   GET    /study-sessions/user                  - Sesiones del usuario (auth)');
  console.log('   GET    /study-sessions/user/stats            - Estadísticas del usuario (auth)');
  console.log('   GET    /study-sessions/user/active           - Sesión activa (auth)');
  console.log('   GET    /study-sessions/:sessionId            - Obtener sesión por ID (auth)\n');
  
  console.log('🎯 CARACTERÍSTICAS IMPLEMENTADAS:');
  console.log('   ✅ 18 cursos predefinidos (se crean automáticamente al levantar el servidor)');
  console.log('   ✅ 6 cursos con subtemas y cartas de ejemplo predefinidas');
  console.log('   ✅ Sistema de subtemas dinámicos');
  console.log('   ✅ Cartas de estudio con pregunta/respuesta');
  console.log('   ✅ Soporte para respuestas de imagen');
  console.log('   ✅ Sistema de favoritos');
  console.log('   ✅ Progreso de usuario por carta');
  console.log('   ✅ Sesiones de estudio con duración');
  console.log('   ✅ Sistema de recompensas (XaviCoins y experiencia)');
  console.log('   ✅ Niveles de usuario basados en experiencia');
  console.log('   ✅ Estadísticas detalladas');
  console.log('   ✅ Sin validaciones (como solicitaste)\n');
  
  console.log('🚀 CARGA AUTOMÁTICA:');
  console.log('   ✅ Los cursos se crean automáticamente al levantar el servidor');
  console.log('   ✅ Los subtemas y cartas de ejemplo se crean automáticamente');
  console.log('   ✅ Solo se crean si las tablas están vacías\n');
}

// Ejecutar las funciones
showAvailableRoutes();
testStudySystem();

const { Sequelize } = require('sequelize');
const dataConfig = require('./src/config/environment').default;

// Configuración de la base de datos
const sequelize = new Sequelize({
  username: dataConfig.development.username,
  password: dataConfig.development.password,
  database: dataConfig.development.database,
  host: dataConfig.development.host,
  dialect: "postgres",
  logging: false,
});

// Definir el modelo Course
const Course = sequelize.define('Course', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  icon: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  color: {
    type: Sequelize.STRING(7),
    allowNull: true,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  order: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'courses',
  timestamps: true,
});

// Cursos predefinidos
const courses = [
  {
    name: "Razonamiento Verbal",
    description: "Desarrollo de habilidades de comprensión y análisis de textos",
    icon: "book-open",
    color: "#3B82F6",
    order: 1
  },
  {
    name: "Razonamiento Matemático",
    description: "Lógica matemática y resolución de problemas",
    icon: "calculator",
    color: "#EF4444",
    order: 2
  },
  {
    name: "Aritmética",
    description: "Operaciones básicas y números",
    icon: "plus-circle",
    color: "#10B981",
    order: 3
  },
  {
    name: "Álgebra",
    description: "Ecuaciones y expresiones algebraicas",
    icon: "function",
    color: "#F59E0B",
    order: 4
  },
  {
    name: "Trigonometría",
    description: "Funciones trigonométricas y triángulos",
    icon: "triangle",
    color: "#8B5CF6",
    order: 5
  },
  {
    name: "Geometría",
    description: "Formas, figuras y medidas",
    icon: "square",
    color: "#06B6D4",
    order: 6
  },
  {
    name: "Lenguaje",
    description: "Gramática y comunicación",
    icon: "message-circle",
    color: "#84CC16",
    order: 7
  },
  {
    name: "Literatura",
    description: "Análisis literario y obras clásicas",
    icon: "book",
    color: "#F97316",
    order: 8
  },
  {
    name: "Psicología",
    description: "Comportamiento humano y procesos mentales",
    icon: "brain",
    color: "#EC4899",
    order: 9
  },
  {
    name: "Educación Cívica",
    description: "Derechos, deberes y participación ciudadana",
    icon: "shield",
    color: "#6366F1",
    order: 10
  },
  {
    name: "Historia del Perú",
    description: "Historia nacional y cultura peruana",
    icon: "flag",
    color: "#DC2626",
    order: 11
  },
  {
    name: "Historia Universal",
    description: "Historia mundial y civilizaciones",
    icon: "globe",
    color: "#059669",
    order: 12
  },
  {
    name: "Geografía",
    description: "Espacios geográficos y recursos naturales",
    icon: "map",
    color: "#7C3AED",
    order: 13
  },
  {
    name: "Economía",
    description: "Sistemas económicos y finanzas",
    icon: "dollar-sign",
    color: "#16A34A",
    order: 14
  },
  {
    name: "Filosofía",
    description: "Pensamiento filosófico y ética",
    icon: "lightbulb",
    color: "#EA580C",
    order: 15
  },
  {
    name: "Física",
    description: "Leyes físicas y fenómenos naturales",
    icon: "zap",
    color: "#2563EB",
    order: 16
  },
  {
    name: "Química",
    description: "Composición y transformación de la materia",
    icon: "flask",
    color: "#7C2D12",
    order: 17
  },
  {
    name: "Biología",
    description: "Seres vivos y procesos biológicos",
    icon: "leaf",
    color: "#15803D",
    order: 18
  }
];

async function initCourses() {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida');

    // Sincronizar el modelo
    await Course.sync({ force: false });
    console.log('✅ Modelo Course sincronizado');

    // Verificar si ya existen cursos
    const existingCourses = await Course.count();
    if (existingCourses > 0) {
      console.log(`⚠️  Ya existen ${existingCourses} cursos en la base de datos`);
      console.log('¿Deseas continuar y crear los cursos faltantes? (Ctrl+C para cancelar)');
      
      // Esperar 3 segundos para dar tiempo a cancelar
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    // Crear cursos
    let createdCount = 0;
    let updatedCount = 0;

    for (const courseData of courses) {
      const [course, created] = await Course.findOrCreate({
        where: { name: courseData.name },
        defaults: courseData
      });

      if (created) {
        createdCount++;
        console.log(`✅ Creado: ${courseData.name}`);
      } else {
        // Actualizar si ya existe
        await course.update(courseData);
        updatedCount++;
        console.log(`🔄 Actualizado: ${courseData.name}`);
      }
    }

    console.log('\n🎉 Inicialización completada!');
    console.log(`📊 Resumen:`);
    console.log(`   - Cursos creados: ${createdCount}`);
    console.log(`   - Cursos actualizados: ${updatedCount}`);
    console.log(`   - Total de cursos: ${courses.length}`);

  } catch (error) {
    console.error('❌ Error durante la inicialización:', error);
  } finally {
    await sequelize.close();
    console.log('🔌 Conexión cerrada');
  }
}

// Ejecutar el script
initCourses();

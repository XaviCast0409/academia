const { Sequelize, DataTypes } = require('sequelize');

// Configuración de la base de datos
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: console.log,
});

async function fixExistingUsers() {
  try {
    console.log('\n🔧 Iniciando corrección de usuarios existentes...\n');

    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa');

    // Actualizar usuarios que tienen valores NULL en campos importantes
    const [results] = await sequelize.query(`
      UPDATE users 
      SET 
        level = COALESCE(level, 1),
        experience = COALESCE(experience, 0),
        xavicoints = COALESCE(xavicoints, 0),
        currentStreak = COALESCE(currentStreak, 0),
        completedActivities = COALESCE(completedActivities, 0),
        isActive = COALESCE(isActive, 1),
        isVerified = COALESCE(isVerified, 0)
      WHERE 
        level IS NULL OR 
        experience IS NULL OR 
        xavicoints IS NULL OR 
        currentStreak IS NULL OR 
        completedActivities IS NULL OR
        isActive IS NULL OR
        isVerified IS NULL
    `);

    console.log(`✅ ${results.affectedRows || 'Algunos'} usuarios actualizados`);

    // Verificar usuarios después de la actualización
    const [users] = await sequelize.query(`
      SELECT id, name, level, experience, xavicoints, currentStreak, completedActivities, isActive, isVerified
      FROM users 
      ORDER BY id
    `);

    console.log('\n📊 Estado de usuarios después de la corrección:');
    users.forEach(user => {
      console.log(`👤 Usuario ${user.id} (${user.name}):`);
      console.log(`   📊 Nivel: ${user.level}, XP: ${user.experience}, XaviCoins: ${user.xavicoints}`);
      console.log(`   🔥 Racha: ${user.currentStreak}, Actividades: ${user.completedActivities}`);
      console.log(`   ✅ Activo: ${user.isActive}, Verificado: ${user.isVerified}`);
      console.log('');
    });

    console.log('🎉 ¡Corrección completada exitosamente!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sequelize.close();
  }
}

fixExistingUsers();
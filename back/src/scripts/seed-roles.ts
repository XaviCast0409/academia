import db, { sequelize } from '../config/database';

const { Role } = db;

async function seedRoles() {
  try {
    await sequelize.authenticate();

    const roles = [
      { id: 1, name: 'SuperAdmin' },
      { id: 2, name: 'Admin' },
      { id: 3, name: 'User' }
    ];

    for (const r of roles) {
      await Role.findOrCreate({ where: { id: r.id }, defaults: r });
    }

    console.log('Roles seed completos');
    process.exit(0);
  } catch (error) {
    console.error('Error al seedear roles:', error);
    process.exit(1);
  }
}

seedRoles();

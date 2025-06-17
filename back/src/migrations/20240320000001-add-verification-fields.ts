import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn("users", "verificationCode", {
    type: DataTypes.STRING(5),
    allowNull: true,
  });

  await queryInterface.addColumn("users", "verificationCodeExpires", {
    type: DataTypes.DATE,
    allowNull: true,
  });

  await queryInterface.addColumn("users", "isVerified", {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn("users", "verificationCode");
  await queryInterface.removeColumn("users", "verificationCodeExpires");
  await queryInterface.removeColumn("users", "isVerified");
} 
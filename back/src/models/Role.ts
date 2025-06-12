import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface RoleAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoleInput extends Optional<RoleAttributes, "id"> {}
export interface RoleOutput extends Required<RoleAttributes> {}

export class Role
  extends Model<RoleAttributes, RoleInput>
  implements RoleAttributes
{
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
    Role.hasMany(db.User, {
      foreignKey: "roleId",
      as: "users",
    });
  }

  static initModel(sequelize: Sequelize) {
    Role.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Role",
        tableName: "roles",
        timestamps: true,
      }
    );
  }
}

export default Role;

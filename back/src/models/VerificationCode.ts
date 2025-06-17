import { Model, DataTypes, Sequelize } from "sequelize";

export interface VerificationCodeAttributes {
  id: number;
  email: string;
  code: string;
  expiresAt: Date;
  isUsed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class VerificationCode extends Model<VerificationCodeAttributes> implements VerificationCodeAttributes {
  public id!: number;
  public email!: string;
  public code!: string;
  public expiresAt!: Date;
  public isUsed!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    VerificationCode.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        code: {
          type: DataTypes.STRING(5),
          allowNull: false,
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        isUsed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: "VerificationCode",
        tableName: "verification_codes",
        timestamps: true,
      }
    );
  }
} 
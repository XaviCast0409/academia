import { Model, DataTypes, Sequelize, Optional } from "sequelize";

export interface EvidenceAttributes {
  id: number;
  studentId: number; // Relación con el alumno (User)
  activityId: number; // Relación con la actividad
  filePath: string[];
  status: "pending" | "approved" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EvidenceInput extends Optional<EvidenceAttributes, "id"> {}
export interface EvidenceOutput extends Required<EvidenceAttributes> {}

export class Evidence extends Model<EvidenceAttributes> implements EvidenceAttributes {
  public id!: number;
  public studentId!: number;
  public activityId!: number;
  public filePath!: string[];
  public status!: "pending" | "approved" | "rejected";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
    Evidence.belongsTo(db.User, {
      foreignKey: "studentId",
      as: "student",
    });
    Evidence.belongsTo(db.Activity, {
      foreignKey: "activityId",
      as: "activity",
    });
  }

  static initModel(sequelize: Sequelize) {
    Evidence.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        studentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        activityId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "activities",
            key: "id",
          },
        },
        filePath: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("pending", "approved", "rejected"),
          allowNull: false,
          defaultValue: "pending",
        },
      },
      {
        sequelize,
        modelName: "Evidence",
        tableName: "evidences",
        timestamps: true,
      }
    );
  }
}

export default Evidence;
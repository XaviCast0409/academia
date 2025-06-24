import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import db from "../config/database";

export interface ActivityAttributes {
  id: number;
  title: string;
  description: string;
  images: Array<string>; // Array de strings para múltiples imágenes
  xavicoints: number;
  professorId: number; // Relación con el profesor (User)
  difficulty?: string;
  section?: string; // Campo opcional para la sección
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ActivityInput extends Optional<ActivityAttributes, "id"> {}
export interface ActivityOutput extends Required<ActivityAttributes> {}

export class Activity extends Model<ActivityAttributes> implements ActivityAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public images!: Array<string>; // Cambiado a Array<string> para almacenar múltiples imágenes
  public xavicoints!: number;
  public professorId!: number;
  public difficulty?: string;
  public section?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
    Activity.belongsTo(db.User, {
      foreignKey: "professorId",
      as: "professor",
    });
    Activity.hasMany(db.Evidence, {
      foreignKey: "activityId",
      as: "evidences",
    });
  }

  static initModel(sequelize: Sequelize) {
    Activity.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        images: {
          type: DataTypes.ARRAY(DataTypes.STRING), // Usar ARRAY para almacenar múltiples imágenes
          allowNull: true, // Permitir que sea nulo si no hay imágenes
        },
        xavicoints: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        professorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        difficulty: {
          type: DataTypes.ENUM("beginner", "intermediate", "advanced", "expert"),
          allowNull: true, // Valor por defecto para la dificultad
          defaultValue: "beginner", // Valor por defecto para la dificultad
        },
        section: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Activity",
        tableName: "activities",
        timestamps: true,
      }
    );
  }
}

export default Activity;
import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface SubTopicAttributes {
  id: number;
  courseId: number;
  name: string;
  description?: string;
  isActive: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SubTopicInput extends Optional<SubTopicAttributes, "id"> {}
export interface SubTopicOutput extends Required<SubTopicAttributes> {}

export class SubTopic extends Model<SubTopicAttributes, SubTopicInput> implements SubTopicAttributes {
  public id!: number;
  public courseId!: number;
  public name!: string;
  public description?: string;
  public isActive!: boolean;
  public order!: number;

  // Propiedades de relaciones
  public course?: any;
  public studyCards?: any[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
    // Un subtema pertenece a un curso
    SubTopic.belongsTo(db.Course, {
      foreignKey: "courseId",
      as: "course",
    });

    // Un subtema puede tener muchas cartas de estudio
    SubTopic.hasMany(db.StudyCard, {
      foreignKey: "subTopicId",
      as: "studyCards",
    });
  }

  static initModel(sequelize: Sequelize) {
    SubTopic.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        courseId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "courses",
            key: "id",
          },
        },
        name: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        order: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "SubTopic",
        tableName: "sub_topics",
        timestamps: true,
      }
    );
  }
}

export default SubTopic;

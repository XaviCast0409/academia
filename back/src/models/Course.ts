import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface CourseAttributes {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  isActive: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CourseInput extends Optional<CourseAttributes, "id"> {}
export interface CourseOutput extends Required<CourseAttributes> {}

export class Course extends Model<CourseAttributes, CourseInput> implements CourseAttributes {
  public id!: number;
  public name!: string;
  public description?: string;
  public icon?: string;
  public color?: string;
  public isActive!: boolean;
  public order!: number;

  // Propiedades de relaciones
  public subTopics?: any[];
  public studyCards?: any[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
    // Un curso puede tener muchos subtemas
    Course.hasMany(db.SubTopic, {
      foreignKey: "courseId",
      as: "subTopics",
    });

    // Un curso puede tener muchas cartas de estudio
    Course.hasMany(db.StudyCard, {
      foreignKey: "courseId",
      as: "studyCards",
    });
  }

  static initModel(sequelize: Sequelize) {
    Course.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        icon: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        color: {
          type: DataTypes.STRING(7), // #FFFFFF
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
        modelName: "Course",
        tableName: "courses",
        timestamps: true,
      }
    );
  }
}

export default Course;

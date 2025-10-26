import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface StudyCardAttributes {
  id: number;
  courseId: number;
  subTopicId: number;
  question: string;
  answer: string;
  isAnswerImage: boolean; // Indica si la respuesta es una imagen
  difficulty: "easy" | "medium" | "hard";
  isActive: boolean;
  createdBy?: number; // ID del administrador que la creó
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StudyCardInput extends Optional<StudyCardAttributes, "id"> {}
export interface StudyCardOutput extends Required<StudyCardAttributes> {}

export class StudyCard extends Model<StudyCardAttributes, StudyCardInput> implements StudyCardAttributes {
  public id!: number;
  public courseId!: number;
  public subTopicId!: number;
  public question!: string;
  public answer!: string;
  public isAnswerImage!: boolean;
  public difficulty!: "easy" | "medium" | "hard";
  public isActive!: boolean;
  public createdBy?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
    // Una carta pertenece a un curso
    StudyCard.belongsTo(db.Course, {
      foreignKey: "courseId",
      as: "course",
    });

    // Una carta pertenece a un subtema
    StudyCard.belongsTo(db.SubTopic, {
      foreignKey: "subTopicId",
      as: "subTopic",
    });

    // Una carta puede ser estudiada por muchos usuarios
    StudyCard.hasMany(db.UserStudyCard, {
      foreignKey: "studyCardId",
      as: "userStudyCards",
    });

    // Una carta puede ser parte de muchas sesiones de estudio
    StudyCard.hasMany(db.StudySession, {
      foreignKey: "studyCardId",
      as: "studySessions",
    });
  }

  static initModel(sequelize: Sequelize) {
    StudyCard.init(
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
        subTopicId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "sub_topics",
            key: "id",
          },
        },
        question: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        answer: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        isAnswerImage: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        difficulty: {
          type: DataTypes.ENUM("easy", "medium", "hard"),
          allowNull: false,
          defaultValue: "medium",
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        createdBy: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "users",
            key: "id",
          },
        },
      },
      {
        sequelize,
        modelName: "StudyCard",
        tableName: "study_cards",
        timestamps: true,
      }
    );
  }
}

export default StudyCard;

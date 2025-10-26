import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface StudySessionAttributes {
  id: number;
  userId: number;
  courseId?: number;
  subTopicId?: number;
  studyCardId?: number;
  sessionType: "course" | "subtopic" | "favorites" | "mixed";
  startTime: Date;
  endTime?: Date;
  duration: number; // Duración en minutos
  targetDuration: number; // Duración objetivo en minutos
  cardsStudied: number;
  xavicoinsEarned: number;
  experienceEarned: number;
  isCompleted: boolean;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StudySessionInput extends Optional<StudySessionAttributes, "id"> {}
export interface StudySessionOutput extends Required<StudySessionAttributes> {}

export class StudySession extends Model<StudySessionAttributes, StudySessionInput> implements StudySessionAttributes {
  public id!: number;
  public userId!: number;
  public courseId?: number;
  public subTopicId?: number;
  public studyCardId?: number;
  public sessionType!: "course" | "subtopic" | "favorites" | "mixed";
  public startTime!: Date;
  public endTime?: Date;
  public duration!: number;
  public targetDuration!: number;
  public cardsStudied!: number;
  public xavicoinsEarned!: number;
  public experienceEarned!: number;
  public isCompleted!: boolean;
  public notes?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
    // Una sesión pertenece a un usuario
    StudySession.belongsTo(db.User, {
      foreignKey: "userId",
      as: "user",
    });

    // Una sesión puede estar relacionada con un curso
    StudySession.belongsTo(db.Course, {
      foreignKey: "courseId",
      as: "course",
    });

    // Una sesión puede estar relacionada con un subtema
    StudySession.belongsTo(db.SubTopic, {
      foreignKey: "subTopicId",
      as: "subTopic",
    });

    // Una sesión puede estar relacionada con una carta específica
    StudySession.belongsTo(db.StudyCard, {
      foreignKey: "studyCardId",
      as: "studyCard",
    });
  }

  static initModel(sequelize: Sequelize) {
    StudySession.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        courseId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "courses",
            key: "id",
          },
        },
        subTopicId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "sub_topics",
            key: "id",
          },
        },
        studyCardId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "study_cards",
            key: "id",
          },
        },
        sessionType: {
          type: DataTypes.ENUM("course", "subtopic", "favorites", "mixed"),
          allowNull: false,
          defaultValue: "mixed",
        },
        startTime: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endTime: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        duration: {
          type: DataTypes.INTEGER, // en minutos
          allowNull: false,
          defaultValue: 0,
        },
        targetDuration: {
          type: DataTypes.INTEGER, // en minutos
          allowNull: false,
          defaultValue: 15,
        },
        cardsStudied: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        xavicoinsEarned: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        experienceEarned: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        isCompleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        notes: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "StudySession",
        tableName: "study_sessions",
        timestamps: true,
      }
    );
  }
}

export default StudySession;

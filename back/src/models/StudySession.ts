import { Model, DataTypes, Sequelize, Optional } from "sequelize";

export interface StudySessionAttributes {
  id: number;
  userId: number;
  studyCardId?: number; // Opcional, puede ser una sesión general
  sessionType: "individual" | "review" | "quiz" | "general"; // Tipo de sesión
  startTime: Date; // Inicio de la sesión
  endTime?: Date; // Final de la sesión
  duration: number; // Duración en minutos
  cardsStudied: number; // Número de tarjetas estudiadas en la sesión
  xavicoinsEarned: number; // XaviCoins ganados en esta sesión
  isCompleted: boolean; // Si la sesión fue completada
  sessionGoal?: number; // Meta de tiempo en minutos (10, 15, 20, etc.)
  notes?: string; // Notas de la sesión
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StudySessionInput extends Optional<StudySessionAttributes, "id"> {}
export interface StudySessionOutput extends Required<StudySessionAttributes> {}

export class StudySession extends Model<StudySessionAttributes, StudySessionInput> implements StudySessionAttributes {
  public id!: number;
  public userId!: number;
  public studyCardId?: number;
  public sessionType!: "individual" | "review" | "quiz" | "general";
  public startTime!: Date;
  public endTime?: Date;
  public duration!: number;
  public cardsStudied!: number;
  public xavicoinsEarned!: number;
  public isCompleted!: boolean;
  public sessionGoal?: number;
  public notes?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
    // Relación con User
    StudySession.belongsTo(db.User, {
      foreignKey: "userId",
      as: "user",
    });

    // Relación con StudyCard (opcional)
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
        studyCardId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "study_cards",
            key: "id",
          },
        },
        sessionType: {
          type: DataTypes.ENUM("individual", "review", "quiz", "general"),
          allowNull: false,
          defaultValue: "general",
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
        isCompleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        sessionGoal: {
          type: DataTypes.INTEGER, // meta en minutos
          allowNull: true,
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

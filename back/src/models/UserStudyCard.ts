import { Model, DataTypes, Sequelize, Optional } from "sequelize";

export interface UserStudyCardAttributes {
  id: number;
  userId: number;
  studyCardId: number;
  isFavorite: boolean; // Si el usuario marcó como favorita
  timesStudied: number; // Cuántas veces ha estudiado esta tarjeta
  lastStudied?: Date; // Última vez que estudió esta tarjeta
  difficultyRating?: number; // Calificación de dificultad del usuario (1-5)
  personalNotes?: string; // Notas personales del usuario
  masteryLevel: "nuevo" | "aprendiendo" | "revisando" | "dominado"; // Nivel de dominio
  nextReviewDate?: Date; // Para implementar spaced repetition en el futuro
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserStudyCardInput extends Optional<UserStudyCardAttributes, "id"> {}
export interface UserStudyCardOutput extends Required<UserStudyCardAttributes> {}

export class UserStudyCard extends Model<UserStudyCardAttributes, UserStudyCardInput> implements UserStudyCardAttributes {
  public id!: number;
  public userId!: number;
  public studyCardId!: number;
  public isFavorite!: boolean;
  public timesStudied!: number;
  public lastStudied?: Date;
  public difficultyRating?: number;
  public personalNotes?: string;
  public masteryLevel!: "nuevo" | "aprendiendo" | "revisando" | "dominado";
  public nextReviewDate?: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
    // Relación con User
    UserStudyCard.belongsTo(db.User, {
      foreignKey: "userId",
      as: "user",
    });

    // Relación con StudyCard
    UserStudyCard.belongsTo(db.StudyCard, {
      foreignKey: "studyCardId",
      as: "studyCard",
    });
  }

  static initModel(sequelize: Sequelize) {
    UserStudyCard.init(
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
          allowNull: false,
          references: {
            model: "study_cards",
            key: "id",
          },
        },
        isFavorite: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        timesStudied: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        lastStudied: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        difficultyRating: {
          type: DataTypes.INTEGER,
          allowNull: true,
          validate: {
            min: 1,
            max: 5,
          },
        },
        personalNotes: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        masteryLevel: {
          type: DataTypes.ENUM("nuevo", "aprendiendo", "revisando", "dominado"),
          allowNull: false,
          defaultValue: "nuevo",
        },
        nextReviewDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "UserStudyCard",
        tableName: "user_study_cards",
        timestamps: true,
        indexes: [
          {
            unique: true,
            fields: ["userId", "studyCardId"], // Un usuario no puede tener la misma tarjeta duplicada
          },
        ],
      }
    );
  }
}

export default UserStudyCard;

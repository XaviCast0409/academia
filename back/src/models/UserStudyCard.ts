import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface UserStudyCardAttributes {
  id: number;
  userId: number;
  studyCardId: number;
  isFavorite: boolean;
  timesStudied: number;
  lastStudied?: Date;
  masteryLevel: "new" | "learning" | "reviewing" | "mastered";
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
  public masteryLevel!: "new" | "learning" | "reviewing" | "mastered";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
    // Un usuario puede tener muchas cartas de estudio
    UserStudyCard.belongsTo(db.User, {
      foreignKey: "userId",
      as: "user",
    });

    // Una carta puede ser estudiada por muchos usuarios
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
        masteryLevel: {
          type: DataTypes.ENUM("new", "learning", "reviewing", "mastered"),
          allowNull: false,
          defaultValue: "new",
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
            fields: ["userId", "studyCardId"],
          },
        ],
      }
    );
  }
}

export default UserStudyCard;

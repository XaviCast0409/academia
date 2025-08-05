import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface UserAchievementAttributes {
  id: number;
  userId: number;
  achievementId: number;
  progress: number;
  isUnlocked: boolean;
  unlockedAt?: Date;
  rewardClaimed: boolean;
  claimedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserAchievementInput extends Optional<UserAchievementAttributes, "id"> {}
export interface UserAchievementOutput extends Required<UserAchievementAttributes> {}

export class UserAchievement extends Model<UserAchievementAttributes, UserAchievementInput> implements UserAchievementAttributes {
  public id!: number;
  public userId!: number;
  public achievementId!: number;
  public progress!: number;
  public isUnlocked!: boolean;
  public unlockedAt?: Date;
  public rewardClaimed!: boolean;
  public claimedAt?: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
    UserAchievement.belongsTo(db.User, {
      foreignKey: "userId",
      as: "user",
    });
    UserAchievement.belongsTo(db.Achievement, {
      foreignKey: "achievementId",
      as: "achievement",
    });
  }

  static initModel(sequelize: Sequelize) {
    UserAchievement.init(
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
        achievementId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "achievements",
            key: "id",
          },
        },
        progress: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        isUnlocked: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        unlockedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        rewardClaimed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        claimedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "UserAchievement",
        tableName: "user_achievements",
        timestamps: true,
      }
    );
  }
}

export default UserAchievement;

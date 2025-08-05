import { Model, DataTypes, Sequelize, Optional } from "sequelize";

export interface AchievementAttributes {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: "progress" | "math" | "gamification" | "competition" | "special";
  requirementType: "activities_completed" | "level_reached" | "streak_days" | "coins_earned" | "ranking_position" | "perfect_scores" | "math_topic";
  requirementValue: number;
  requirementCondition?: "consecutive" | "total" | "unique";
  mathTopic?: "aritmetica" | "algebra" | "geometria" | "trigonometria" | "razonamiento_matematico";
  rewardType: "coins" | "badge" | "title" | "avatar_frame";
  rewardValue: number | string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AchievementInput extends Optional<AchievementAttributes, "id"> {}
export interface AchievementOutput extends Required<AchievementAttributes> {}

export class Achievement extends Model<AchievementAttributes, AchievementInput> implements AchievementAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public icon!: string;
  public category!: "progress" | "math" | "gamification" | "competition" | "special";
  public requirementType!: "activities_completed" | "level_reached" | "streak_days" | "coins_earned" | "ranking_position" | "perfect_scores" | "math_topic";
  public requirementValue!: number;
  public requirementCondition?: "consecutive" | "total" | "unique";
  public mathTopic?: "aritmetica" | "algebra" | "geometria" | "trigonometria" | "razonamiento_matematico";
  public rewardType!: "coins" | "badge" | "title" | "avatar_frame";
  public rewardValue!: number | string;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
    Achievement.hasMany(db.UserAchievement, {
      foreignKey: "achievementId",
      as: "userAchievementInstances",
    });
  }

  static initModel(sequelize: Sequelize) {
    Achievement.init(
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
        icon: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        category: {
          type: DataTypes.ENUM("progress", "math", "gamification", "competition", "special"),
          allowNull: false,
        },
        requirementType: {
          type: DataTypes.ENUM("activities_completed", "level_reached", "streak_days", "coins_earned", "ranking_position", "perfect_scores", "math_topic"),
          allowNull: false,
        },
        requirementValue: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        requirementCondition: {
          type: DataTypes.ENUM("consecutive", "total", "unique"),
          allowNull: true,
        },
        mathTopic: {
          type: DataTypes.ENUM("aritmetica", "algebra", "geometria", "trigonometria", "razonamiento_matematico"),
          allowNull: true,
        },
        rewardType: {
          type: DataTypes.ENUM("coins", "badge", "title", "avatar_frame"),
          allowNull: false,
        },
        rewardValue: {
          type: DataTypes.STRING, // Puede ser número o string
          allowNull: false,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize,
        modelName: "Achievement",
        tableName: "achievements",
        timestamps: true,
      }
    );
  }
}

export default Achievement;

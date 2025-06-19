import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

export interface UserMissionAttributes {
  id: number;
  userId: number;
  missionId: number;
  progress: number;
  isCompleted: boolean;
  completedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserMissionInput extends Optional<UserMissionAttributes, 'id'> {}
export interface UserMissionOutput extends Required<UserMissionAttributes> {}

export class UserMission extends Model<UserMissionAttributes, UserMissionInput> implements UserMissionAttributes {
  public id!: number;
  public userId!: number;
  public missionId!: number;
  public progress!: number;
  public isCompleted!: boolean;
  public completedAt?: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
    UserMission.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
    UserMission.belongsTo(db.Mission, { foreignKey: 'missionId', as: 'mission' });
  }

  static initModel(sequelize: Sequelize) {
    UserMission.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        missionId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        progress: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        isCompleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        completedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'UserMission',
        tableName: 'user_missions',
        timestamps: true,
      }
    );
  }
}

export default UserMission; 
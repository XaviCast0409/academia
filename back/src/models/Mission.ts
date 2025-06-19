import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

export interface MissionAttributes {
  id: number;
  title: string;
  description: string;
  type: 'DAILY' | 'WEEKLY' | 'GROUP' | 'SPECIAL';
  groupId?: number | null;
  requiredCount: number;
  rewardType: 'COINS' | 'BADGE' | 'ITEM';
  rewardAmount: number;
  isActive: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MissionInput extends Optional<MissionAttributes, 'id'> {}
export interface MissionOutput extends Required<MissionAttributes> {}

export class Mission extends Model<MissionAttributes, MissionInput> implements MissionAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public type!: 'DAILY' | 'WEEKLY' | 'GROUP' | 'SPECIAL';
  public groupId?: number | null;
  public requiredCount!: number;
  public rewardType!: 'COINS' | 'BADGE' | 'ITEM';
  public rewardAmount!: number;
  public isActive!: boolean;
  public startDate?: Date | null;
  public endDate?: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
    // Relaciones futuras si es necesario
  }

  static initModel(sequelize: Sequelize) {
    Mission.init(
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
        type: {
          type: DataTypes.ENUM('DAILY', 'WEEKLY', 'GROUP', 'SPECIAL'),
          allowNull: false,
        },
        groupId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        requiredCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        rewardType: {
          type: DataTypes.ENUM('COINS', 'BADGE', 'ITEM'),
          allowNull: false,
        },
        rewardAmount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Mission',
        tableName: 'missions',
        timestamps: true,
      }
    );
  }
}

export default Mission; 
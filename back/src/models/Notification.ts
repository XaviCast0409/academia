import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

export interface NotificationAttributes {
  id: number;
  userId: number | null; // null => global notification
  type: string; // e.g., 'activity_created' | 'evidence_status'
  title: string;
  message: string;
  data?: Record<string, unknown> | null;
  isRead?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NotificationInput extends Optional<NotificationAttributes, 'id'> {}
export interface NotificationOutput extends Required<NotificationAttributes> {}

export class Notification
  extends Model<NotificationAttributes, NotificationInput>
  implements NotificationAttributes {
  public id!: number;
  public userId!: number | null;
  public type!: string;
  public title!: string;
  public message!: string;
  public data?: Record<string, unknown> | null;
  public isRead?: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
    Notification.belongsTo(db.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }

  static initModel(sequelize: Sequelize) {
    Notification.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        message: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        data: {
          // Postgres JSONB; for others falls back to JSON
          type: (DataTypes as any).JSONB || DataTypes.JSON,
          allowNull: true,
        },
        isRead: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: 'Notification',
        tableName: 'notifications',
        timestamps: true,
      }
    );
  }
}

export default Notification;



import { Model, DataTypes, Sequelize, Optional } from "sequelize";

export interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  professorId: number; // Relación con el profesor (User)
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductInput extends Optional<ProductAttributes, "id"> {}
export interface ProductOutput extends Required<ProductAttributes> {}

export class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public professorId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
    Product.belongsTo(db.User, {
      foreignKey: "professorId",
      as: "professor",
    });
    Product.hasMany(db.Transaction, {
      foreignKey: "productId",
      as: "transactions",
    });
  }

  static initModel(sequelize: Sequelize) {
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        professorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
      },
      {
        sequelize,
        modelName: "Product",
        tableName: "products",
        timestamps: true,
      }
    );
  }
}

export default Product;
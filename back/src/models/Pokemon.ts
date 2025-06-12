// models/Pokemon.ts
import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface PokemonAttributes {
    id: number;
    name: string;
    imageUrl: string;
    highResImageUrl: string; // Optional field for high-resolution image URL
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PokemonInput extends Optional<PokemonAttributes, "id"> { }
export interface PokemonOutput extends Required<PokemonAttributes> { }

export class Pokemon
    extends Model<PokemonAttributes, PokemonInput>
    implements PokemonAttributes {
    public id!: number;
    public name!: string;
    public imageUrl!: string;
    public highResImageUrl!: string; // Optional field for high-resolution image URL

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(db: any) {
        Pokemon.hasMany(db.User, {
            foreignKey: "pokemonId",
            as: "users",
        });
    }

    static initModel(sequelize: Sequelize) {
        Pokemon.init(
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
                imageUrl: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                highResImageUrl: {
                    type: DataTypes.STRING,
                    allowNull: true, // Optional field
                },
            },
            {
                sequelize,
                modelName: "Pokemon",
                tableName: "pokemons",
                timestamps: true,
            }
        );
    }
}

export default Pokemon;

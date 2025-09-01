"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyCard = void 0;
const sequelize_1 = require("sequelize");
class StudyCard extends sequelize_1.Model {
    static associate(db) {
        // Relación con el creador (User) - opcional para futuro
        StudyCard.belongsTo(db.User, {
            foreignKey: "createdById",
            as: "creator",
        });
        // Relación con UserStudyCard (muchos a muchos con usuarios)
        StudyCard.hasMany(db.UserStudyCard, {
            foreignKey: "studyCardId",
            as: "userStudyCards",
        });
        // Relación con StudySession
        StudyCard.hasMany(db.StudySession, {
            foreignKey: "studyCardId",
            as: "studySessions",
        });
    }
    static initModel(sequelize) {
        StudyCard.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            question: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            answer: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            category: {
                type: sequelize_1.DataTypes.ENUM("matematicas", "fisica", "quimica", "otros"),
                allowNull: false,
            },
            mathTopic: {
                type: sequelize_1.DataTypes.ENUM("algebra", "trigonometria", "geometria", "aritmetica", "razonamiento_matematico"),
                allowNull: true,
            },
            subtopic: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            difficulty: {
                type: sequelize_1.DataTypes.ENUM("basico", "intermedio", "avanzado", "experto"),
                allowNull: false,
                defaultValue: "basico",
            },
            tags: {
                type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
                allowNull: true,
                defaultValue: [],
            },
            hasLatex: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            xavicoinsReward: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 5,
            },
            isActive: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            createdById: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "users",
                    key: "id",
                },
            },
        }, {
            sequelize,
            modelName: "StudyCard",
            tableName: "study_cards",
            timestamps: true,
        });
    }
}
exports.StudyCard = StudyCard;
exports.default = StudyCard;

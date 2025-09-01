import { Model, DataTypes, Sequelize, Optional } from "sequelize";

export interface StudyCardAttributes {
  id: number;
  title: string;
  question: string; // Pregunta o concepto (puede incluir LaTeX)
  answer: string; // Respuesta o explicación (puede incluir LaTeX)
  category: "matematicas" | "fisica" | "quimica" | "otros";
  mathTopic?: "algebra" | "trigonometria" | "geometria" | "aritmetica" | "razonamiento_matematico";
  subtopic?: string; // Tema específico (ej: "teoria_exponentes", "productos_notables", "angulos_trigonometricos")
  difficulty: "basico" | "intermedio" | "avanzado" | "experto";
  tags: string[]; // Array de tags para búsqueda
  hasLatex: boolean; // Indica si la tarjeta contiene LaTeX
  xavicoinsReward: number; // Recompensa por estudiar esta tarjeta
  isActive: boolean;
  createdById?: number; // ID del profesor que creó la tarjeta (opcional para futuro)
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StudyCardInput extends Optional<StudyCardAttributes, "id"> {}
export interface StudyCardOutput extends Required<StudyCardAttributes> {}

export class StudyCard extends Model<StudyCardAttributes, StudyCardInput> implements StudyCardAttributes {
  public id!: number;
  public title!: string;
  public question!: string;
  public answer!: string;
  public category!: "matematicas" | "fisica" | "quimica" | "otros";
  public mathTopic?: "algebra" | "trigonometria" | "geometria" | "aritmetica" | "razonamiento_matematico";
  public subtopic?: string;
  public difficulty!: "basico" | "intermedio" | "avanzado" | "experto";
  public tags!: string[];
  public hasLatex!: boolean;
  public xavicoinsReward!: number;
  public isActive!: boolean;
  public createdById?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
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

  static initModel(sequelize: Sequelize) {
    StudyCard.init(
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
        question: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        answer: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        category: {
          type: DataTypes.ENUM("matematicas", "fisica", "quimica", "otros"),
          allowNull: false,
        },
        mathTopic: {
          type: DataTypes.ENUM("algebra", "trigonometria", "geometria", "aritmetica", "razonamiento_matematico"),
          allowNull: true,
        },
        subtopic: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        difficulty: {
          type: DataTypes.ENUM("basico", "intermedio", "avanzado", "experto"),
          allowNull: false,
          defaultValue: "basico",
        },
        tags: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
          defaultValue: [],
        },
        hasLatex: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        xavicoinsReward: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 5,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        createdById: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "users",
            key: "id",
          },
        },
      },
      {
        sequelize,
        modelName: "StudyCard",
        tableName: "study_cards",
        timestamps: true,
      }
    );
  }
}

export default StudyCard;

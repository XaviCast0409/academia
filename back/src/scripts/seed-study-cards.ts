import db, { sequelize } from "../config/database";

const { Course, SubTopic, StudyCard } = db;

async function seed() {
  try {
    // Ensure DB connection
    await sequelize.authenticate();

    // Create or find a sample course
    const [course] = await Course.findOrCreate({
      where: { name: 'Matemáticas - Ejemplo' },
      defaults: {
        name: 'Matemáticas - Ejemplo',
        description: 'Curso de ejemplo para cartas de estudio',
        icon: '🎒',
        color: '#fbbf24',
        order: 1
      }
    });

    // Create or find some subtopics
    const subtopicNames = ['Álgebra', 'Trigonometría', 'Geometría', 'Aritmética'];
    const subTopics: any[] = [];

    for (let i = 0; i < subtopicNames.length; i++) {
      const name = subtopicNames[i];
      const [sub] = await SubTopic.findOrCreate({
        where: { courseId: course.id, name },
        defaults: {
          courseId: course.id,
          name,
          description: `${name} - subtema de ejemplo`,
          order: i + 1
        }
      });
      subTopics.push(sub);
    }

    // Prepare sample questions/answers
    const sampleQA = [
      ['¿Cuál es la fórmula general para resolver ecuaciones cuadráticas?', 'x = (-b ± √(b^2 - 4ac)) / (2a)'],
      ['¿Qué es una función lineal?', 'Una función de la forma f(x)=mx+b donde m y b son constantes.'],
      ['Defina el teorema de Pitágoras.', 'En un triángulo rectángulo, a^2 + b^2 = c^2 donde c es la hipotenusa.'],
      ['¿Cómo se calcula el área de un círculo?', 'Área = πr^2'],
      ['¿Qué representa la pendiente de una recta?', 'La pendiente representa la tasa de cambio, m = (y2 - y1)/(x2 - x1).'],
      ['¿Qué es una progresión aritmética?', 'Una sucesión en la que la diferencia entre términos consecutivos es constante.'],
      ['¿Cómo se factoriza x^2 - y^2?', '(x - y)(x + y)'],
      ['¿Cuál es la identidad trigonométrica básica?', 'sin^2(x) + cos^2(x) = 1'],
      ['¿Qué es un número primo?', 'Un número mayor que 1 que solo tiene 1 y sí mismo como divisores.'],
      ['¿Cómo se calcula el volumen de un prisma?', 'Volumen = área de la base × altura']
    ];

    // Create ~30 cards distributing across subtopics
    const totalCards = 30;
    const difficulties = ['easy', 'medium', 'hard'];
    const createdCards: any[] = [];

    for (let i = 0; i < totalCards; i++) {
      const qa = sampleQA[i % sampleQA.length];
      const sub = subTopics[i % subTopics.length];
      const difficulty = difficulties[i % difficulties.length] as any;

      const card = await StudyCard.create({
        courseId: course.id,
        subTopicId: sub.id,
        question: `${qa[0]} (ejemplo ${i + 1})`,
        answer: qa[1],
        isAnswerImage: false,
        difficulty,
        isActive: true,
        createdBy: null
      });

      createdCards.push(card);
    }

    console.log(`Seed completo: ${createdCards.length} cartas creadas.`);
    process.exit(0);
  } catch (error) {
    console.error('Error al seedear cartas:', error);
    process.exit(1);
  }
}

seed();

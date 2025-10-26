import { Course } from "../../models/Course";
import { SubTopic } from "../../models/SubTopic";
import { StudyCard } from "../../models/StudyCard";

// Cursos predefinidos
const courses = [
  {
    name: "Razonamiento Verbal",
    description: "Desarrollo de habilidades de comprensión y análisis de textos",
    icon: "book-open",
    color: "#3B82F6",
    order: 1,
    isActive: true
  },
  {
    name: "Razonamiento Matemático",
    description: "Lógica matemática y resolución de problemas",
    icon: "calculator",
    color: "#EF4444",
    order: 2,
    isActive: true
  },
  {
    name: "Aritmética",
    description: "Operaciones básicas y números",
    icon: "plus-circle",
    color: "#10B981",
    order: 3,
    isActive: true
  },
  {
    name: "Álgebra",
    description: "Ecuaciones y expresiones algebraicas",
    icon: "function",
    color: "#F59E0B",
    order: 4,
    isActive: true
  },
  {
    name: "Trigonometría",
    description: "Funciones trigonométricas y triángulos",
    icon: "triangle",
    color: "#8B5CF6",
    order: 5,
    isActive: true
  },
  {
    name: "Geometría",
    description: "Formas, figuras y medidas",
    icon: "square",
    color: "#06B6D4",
    order: 6,
    isActive: true
  },
  {
    name: "Lenguaje",
    description: "Gramática y comunicación",
    icon: "message-circle",
    color: "#84CC16",
    order: 7,
    isActive: true
  },
  {
    name: "Literatura",
    description: "Análisis literario y obras clásicas",
    icon: "book",
    color: "#F97316",
    order: 8,
    isActive: true
  },
  {
    name: "Psicología",
    description: "Comportamiento humano y procesos mentales",
    icon: "brain",
    color: "#EC4899",
    order: 9,
    isActive: true
  },
  {
    name: "Educación Cívica",
    description: "Derechos, deberes y participación ciudadana",
    icon: "shield",
    color: "#6366F1",
    order: 10,
    isActive: true
  },
  {
    name: "Historia del Perú",
    description: "Historia nacional y cultura peruana",
    icon: "flag",
    color: "#DC2626",
    order: 11,
    isActive: true
  },
  {
    name: "Historia Universal",
    description: "Historia mundial y civilizaciones",
    icon: "globe",
    color: "#059669",
    order: 12,
    isActive: true
  },
  {
    name: "Geografía",
    description: "Espacios geográficos y recursos naturales",
    icon: "map",
    color: "#7C3AED",
    order: 13,
    isActive: true
  },
  {
    name: "Economía",
    description: "Sistemas económicos y finanzas",
    icon: "dollar-sign",
    color: "#16A34A",
    order: 14,
    isActive: true
  },
  {
    name: "Filosofía",
    description: "Pensamiento filosófico y ética",
    icon: "lightbulb",
    color: "#EA580C",
    order: 15,
    isActive: true
  },
  {
    name: "Física",
    description: "Leyes físicas y fenómenos naturales",
    icon: "zap",
    color: "#2563EB",
    order: 16,
    isActive: true
  },
  {
    name: "Química",
    description: "Composición y transformación de la materia",
    icon: "flask",
    color: "#7C2D12",
    order: 17,
    isActive: true
  },
  {
    name: "Biología",
    description: "Seres vivos y procesos biológicos",
    icon: "leaf",
    color: "#15803D",
    order: 18,
    isActive: true
  }
];

// Subtemas de ejemplo para algunos cursos
const exampleSubTopics = [
  // Razonamiento Verbal
  {
    courseName: "Razonamiento Verbal",
    subTopics: [
      { name: "Comprensión de Lectura", description: "Análisis e interpretación de textos", order: 1 },
      { name: "Sinónimos y Antónimos", description: "Relaciones semánticas entre palabras", order: 2 },
      { name: "Analogías", description: "Relaciones lógicas entre conceptos", order: 3 },
      { name: "Oraciones Incompletas", description: "Completar oraciones con coherencia", order: 4 }
    ]
  },
  // Aritmética
  {
    courseName: "Aritmética",
    subTopics: [
      { name: "Operaciones Básicas", description: "Suma, resta, multiplicación y división", order: 1 },
      { name: "Fracciones", description: "Operaciones con fracciones y decimales", order: 2 },
      { name: "Porcentajes", description: "Cálculo de porcentajes y descuentos", order: 3 },
      { name: "Problemas de Edades", description: "Resolución de problemas con edades", order: 4 }
    ]
  },
  // Álgebra
  {
    courseName: "Álgebra",
    subTopics: [
      { name: "Ecuaciones Lineales", description: "Resolución de ecuaciones de primer grado", order: 1 },
      { name: "Sistemas de Ecuaciones", description: "Métodos de resolución de sistemas", order: 2 },
      { name: "Factorización", description: "Técnicas de factorización algebraica", order: 3 },
      { name: "Inecuaciones", description: "Resolución de inecuaciones lineales", order: 4 }
    ]
  },
  // Geometría
  {
    courseName: "Geometría",
    subTopics: [
      { name: "Áreas y Perímetros", description: "Cálculo de áreas y perímetros de figuras", order: 1 },
      { name: "Teorema de Pitágoras", description: "Aplicaciones del teorema de Pitágoras", order: 2 },
      { name: "Volúmenes", description: "Cálculo de volúmenes de sólidos", order: 3 },
      { name: "Geometría Analítica", description: "Coordenadas y ecuaciones de figuras", order: 4 }
    ]
  },
  // Física
  {
    courseName: "Física",
    subTopics: [
      { name: "Cinemática", description: "Movimiento rectilíneo y circular", order: 1 },
      { name: "Dinámica", description: "Leyes de Newton y fuerzas", order: 2 },
      { name: "Energía", description: "Tipos de energía y conservación", order: 3 },
      { name: "Electricidad", description: "Circuitos eléctricos básicos", order: 4 }
    ]
  },
  // Historia del Perú
  {
    courseName: "Historia del Perú",
    subTopics: [
      { name: "Imperio Inca", description: "Civilización inca y su organización", order: 1 },
      { name: "Conquista Española", description: "Llegada de los españoles al Perú", order: 2 },
      { name: "Independencia", description: "Proceso de independencia del Perú", order: 3 },
      { name: "República", description: "Historia republicana del Perú", order: 4 }
    ]
  }
];

// Cartas de ejemplo para diferentes subtemas
const exampleCards = [
  // Comprensión de Lectura
  {
    courseName: "Razonamiento Verbal",
    subTopicName: "Comprensión de Lectura",
    cards: [
      {
        question: "¿Qué es la comprensión lectora?",
        answer: "Es la capacidad de entender, interpretar y analizar un texto escrito, extrayendo su significado y comprendiendo las ideas principales y secundarias.",
        isAnswerImage: false,
        difficulty: "easy" as const
      },
      {
        question: "¿Cuáles son los elementos principales de un texto narrativo?",
        answer: "Los elementos principales son: personajes, trama, escenario, tiempo, narrador y tema.",
        isAnswerImage: false,
        difficulty: "medium" as const
      },
      {
        question: "¿Qué estrategia es útil para mejorar la comprensión lectora?",
        answer: "Hacer preguntas sobre el texto, resumir en propias palabras, identificar palabras clave y relacionar con conocimientos previos.",
        isAnswerImage: false,
        difficulty: "medium" as const
      }
    ]
  },
  // Operaciones Básicas
  {
    courseName: "Aritmética",
    subTopicName: "Operaciones Básicas",
    cards: [
      {
        question: "¿Cuánto es 15 + 27?",
        answer: "42",
        isAnswerImage: false,
        difficulty: "easy" as const
      },
      {
        question: "¿Cuál es el resultado de 8 × 7?",
        answer: "56",
        isAnswerImage: false,
        difficulty: "easy" as const
      },
      {
        question: "Si tengo 48 manzanas y las reparto entre 6 personas, ¿cuántas le tocan a cada una?",
        answer: "8 manzanas",
        isAnswerImage: false,
        difficulty: "medium" as const
      },
      {
        question: "¿Cuánto es 125 - 89?",
        answer: "36",
        isAnswerImage: false,
        difficulty: "easy" as const
      }
    ]
  },
  // Ecuaciones Lineales
  {
    courseName: "Álgebra",
    subTopicName: "Ecuaciones Lineales",
    cards: [
      {
        question: "Resuelve: 2x + 5 = 13",
        answer: "x = 4",
        isAnswerImage: false,
        difficulty: "medium" as const
      },
      {
        question: "¿Cuál es el valor de x en la ecuación 3x - 7 = 8?",
        answer: "x = 5",
        isAnswerImage: false,
        difficulty: "medium" as const
      },
      {
        question: "Resuelve: 4(x + 2) = 20",
        answer: "x = 3",
        isAnswerImage: false,
        difficulty: "hard" as const
      }
    ]
  },
  // Áreas y Perímetros
  {
    courseName: "Geometría",
    subTopicName: "Áreas y Perímetros",
    cards: [
      {
        question: "¿Cuál es el área de un cuadrado de lado 6 cm?",
        answer: "36 cm²",
        isAnswerImage: false,
        difficulty: "easy" as const
      },
      {
        question: "¿Cuál es el perímetro de un rectángulo de 8 cm de largo y 5 cm de ancho?",
        answer: "26 cm",
        isAnswerImage: false,
        difficulty: "medium" as const
      },
      {
        question: "¿Cuál es el área de un triángulo con base 10 cm y altura 6 cm?",
        answer: "30 cm²",
        isAnswerImage: false,
        difficulty: "medium" as const
      }
    ]
  },
  // Cinemática
  {
    courseName: "Física",
    subTopicName: "Cinemática",
    cards: [
      {
        question: "¿Qué es la velocidad?",
        answer: "Es la magnitud física que mide la rapidez con que un objeto cambia de posición en el tiempo.",
        isAnswerImage: false,
        difficulty: "easy"
      },
      {
        question: "¿Cuál es la fórmula de la velocidad media?",
        answer: "v = d/t, donde v es velocidad, d es distancia y t es tiempo.",
        isAnswerImage: false,
        difficulty: "medium" as const
      },
      {
        question: "¿Qué es la aceleración?",
        answer: "Es la tasa de cambio de la velocidad con respecto al tiempo.",
        isAnswerImage: false,
        difficulty: "medium" as const
      }
    ]
  },
  // Imperio Inca
  {
    courseName: "Historia del Perú",
    subTopicName: "Imperio Inca",
    cards: [
      {
        question: "¿Cuál fue la capital del Imperio Inca?",
        answer: "Cusco, considerada el ombligo del mundo.",
        isAnswerImage: false,
        difficulty: "easy" as const
      },
      {
        question: "¿Quién fue el último emperador inca?",
        answer: "Atahualpa, quien fue ejecutado por los españoles en 1533.",
        isAnswerImage: false,
        difficulty: "medium" as const
      },
      {
        question: "¿Qué sistema de comunicación utilizaban los incas?",
        answer: "Los quipus, un sistema de cuerdas con nudos para registrar información.",
        isAnswerImage: false,
        difficulty: "hard" as const
      }
    ]
  }
];

export async function seedCoursesAndCardsIfEmpty() {
  try {
    console.log('🌱 Verificando si se necesitan crear cursos y cartas de ejemplo...');
    
    // Verificar si ya existen cursos
    const existingCourses = await Course.count();
    
    if (existingCourses === 0) {
      console.log('📚 Creando cursos predefinidos...');
      
      // Crear cursos
      for (const courseData of courses) {
        await Course.create(courseData);
        console.log(`✅ Creado curso: ${courseData.name}`);
      }
      
      console.log('📖 Creando subtemas de ejemplo...');
      
      // Crear subtemas y cartas
      for (const courseData of exampleSubTopics) {
        const course = await Course.findOne({ where: { name: courseData.courseName } });
        
        if (course) {
          for (const subTopicData of courseData.subTopics) {
            const subTopic = await SubTopic.create({
              courseId: course.id,
              name: subTopicData.name,
              description: subTopicData.description,
              order: subTopicData.order,
              isActive: true
            });
            
            console.log(`✅ Creado subtema: ${subTopicData.name} en ${courseData.courseName}`);
            
            // Buscar las cartas correspondientes a este subtema
            const cardData = exampleCards.find(card => 
              card.courseName === courseData.courseName && 
              card.subTopicName === subTopicData.name
            );
            
            if (cardData) {
              for (const card of cardData.cards) {
                await StudyCard.create({
                  courseId: course.id,
                  subTopicId: subTopic.id,
                  question: card.question,
                  answer: card.answer,
                  isAnswerImage: card.isAnswerImage,
                  difficulty: card.difficulty as "easy" | "medium" | "hard",
                  isActive: true
                });
                
                console.log(`🃏 Creada carta: ${card.question.substring(0, 30)}...`);
              }
            }
          }
        }
      }
      
      console.log('🎉 Cursos, subtemas y cartas de ejemplo creados exitosamente!');
    } else {
      console.log(`📚 Ya existen ${existingCourses} cursos en la base de datos`);
    }
    
  } catch (error) {
    console.error('❌ Error al crear cursos y cartas de ejemplo:', error);
  }
}

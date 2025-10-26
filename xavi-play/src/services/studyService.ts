import api from './api';
import { StudyCard, UserStudyCard, StudySession, StudyProgress, StudyStatistics, StudyDeck } from '@/types/StudyTypes';

export interface StudyCardFilters {
  category?: string;
  mathTopic?: string;
  difficulty?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

class StudyService {
  // Helper: map backend StudyCard shape to frontend StudyCard type
  private mapBackendCardToFront(card: any): StudyCard {
    return {
      id: card.id,
      title: card.question?.slice(0, 50) || '',
      question: card.question,
      answer: card.answer,
      category: (card.course?.name || 'otros').toLowerCase() as any,
      mathTopic: card.subTopic?.name ? card.subTopic.name.toLowerCase().replace(/\s+/g, '_') : undefined,
      subtopic: card.subTopic?.name,
      difficulty: (card.difficulty === 'easy' ? 'basico' : card.difficulty === 'medium' ? 'intermedio' : 'avanzado') as any,
      tags: [],
  hasLatex: /\\\\|\$\$|\\\(|\\\)/.test(card.question || '') || /\\\\|\$\$|\\\(|\\\)/.test(card.answer || ''),
  // backend had inconsistent naming historically (xavicoins / xavicoints) — be defensive
  xavicoinsReward: card.xavicoins || card.xavicoints || (card.rewards && card.rewards.xavicoins) || 0,
      isActive: card.isActive,
      createdById: card.createdBy,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt
    };
  }

  // ============ TARJETAS DE ESTUDIO ============

  /**
   * Obtener todas las tarjetas con filtros
   */
  async getStudyCards(filters: StudyCardFilters = {}): Promise<PaginatedResponse<StudyCard>> {
    const params = new URLSearchParams();

    if (filters.category) params.append('category', filters.category);
    if (filters.mathTopic) params.append('mathTopic', filters.mathTopic);
    if (filters.difficulty) params.append('difficulty', filters.difficulty);
    if (filters.search) params.append('search', filters.search);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const response = await api.get(`/study-cards?${params.toString()}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener tarjetas');
    }

    // Map backend shape to frontend StudyCard
    const data = Array.isArray(response.data.data) ? response.data.data.map((c: any) => this.mapBackendCardToFront(c)) : [];

    return {
      data,
      pagination: response.data.pagination
    };
  }

  /**
   * Obtener tarjetas organizadas por mazos/categorías
   */
  async getStudyDecks(): Promise<StudyDeck[]> {
    // Obtener cursos desde backend y para cada curso obtener subtemas
    const response = await api.get('/courses');

    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener cursos');
    }

    const courses: any[] = Array.isArray(response.data.data) ? response.data.data : [];
    const decks: StudyDeck[] = [];

    // Para cada curso, obtener subtemas y construir mazos por subtema
    for (const course of courses) {
      try {
        // If the course already includes subTopics from the backend, use them
        const subTopics: any[] = Array.isArray(course.subTopics) ? course.subTopics : (Array.isArray(course.subTopics) ? course.subTopics : null);

        let resolvedSubTopics: any[] | null = null;

        if (Array.isArray(subTopics) && subTopics.length > 0) {
          resolvedSubTopics = subTopics;
        } else {
          const subResp = await api.get(`/subtopics/course/${course.id}`);
          if (subResp.data && subResp.data.success) resolvedSubTopics = Array.isArray(subResp.data.data) ? subResp.data.data : [];
        }

        if (!resolvedSubTopics) continue;

        // Cada subtopic será un deck individual
        resolvedSubTopics.forEach((sub: any) => {
          const cardCount = (sub.studyCards && Array.isArray(sub.studyCards)) ? sub.studyCards.length : 0;

          decks.push({
            // category and mathTopic hold ids as strings so the existing store can pass them back
            category: String(course.id),
            mathTopic: String(sub.id),
            displayName: `${course.name} - ${sub.name}`,
            cardCount,
            avgDifficulty: 'basico',
            totalXavicoins: 0,
            description: sub.description || course.description || '',
            icon: course.icon || '🎒',
            color: course.color || '#fbbf24',
            courseId: course.id,
            subTopicId: sub.id
          });
        });

      } catch (err: any) {
        console.warn('Error cargando subtopics para curso', course.id, err && err.message ? err.message : String(err));
        continue;
      }
    }

    return decks;
  }

  /**
   * Obtener cursos con subtopics y conteo de tarjetas (usa servicio backend getAllCourses)
   */
  async getCourses(): Promise<any[]> {
    const response = await api.get('/courses');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener cursos');
    }
  return Array.isArray(response.data.data) ? response.data.data : [];
  }

  /**
   * Obtener tarjetas de un mazo específico
   */
  async getDeckCards(category: string, mathTopic?: string): Promise<StudyCard[]> {
    // Aquí category y mathTopic no representan directamente course/subtopic IDs,
    // la store llama a loadDeckCards con valores construidos desde StudyDeck.
    // Para integrarlo con el backend, esperamos que 'category' sea el courseId string
    // o en su defecto la categoría textual; intentaremos parsear courseId si viene.

    // Si category es un número (courseId) y mathTopic es subTopicId, preferimos usar el endpoint por subtopic
    const courseId = Number(category);
    const subTopicId = mathTopic ? Number(mathTopic) : undefined;

    if (!Number.isNaN(subTopicId) && subTopicId) {
      const resp = await api.get(`/study-cards/subtopic/${subTopicId}`);
      if (!resp.data.success) throw new Error(resp.data.message || 'Error al obtener tarjetas');
      // Map backend StudyCard shape to frontend StudyCard
      return Array.isArray(resp.data.data) ? resp.data.data.map((c: any) => this.mapBackendCardToFront(c)) : [];
    }

    // Si tenemos solo courseId, obtendremos todos los subtopics y combinar sus tarjetas
    if (!Number.isNaN(courseId) && courseId) {
      const subResp = await api.get(`/subtopics/course/${courseId}`);
      if (!subResp.data.success) throw new Error(subResp.data.message || 'Error al obtener subtemas');

      const subTopics: any[] = subResp.data.data;
      const cards: StudyCard[] = [];

      for (const sub of subTopics) {
        // If subtopic already carries studyCards nested, use them
        if (Array.isArray(sub.studyCards) && sub.studyCards.length > 0) {
          cards.push(...sub.studyCards.map((c: any) => this.mapBackendCardToFront(c)));
          continue;
        }

        const resp = await api.get(`/study-cards/subtopic/${sub.id}`);
        if (!resp.data.success) continue;
        if (Array.isArray(resp.data.data)) cards.push(...resp.data.data.map((c: any) => this.mapBackendCardToFront(c)));
      }

      return cards;
    }

    // Fallback: llamar a un endpoint general de cards si existe
  const fallback = await this.getStudyCards({ limit: 100 });
  return fallback.data;
  }

  /**
   * Obtener una tarjeta específica
   */
  async getStudyCard(id: number): Promise<StudyCard> {
    const response = await api.get(`/study-cards/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener tarjeta');
    }

  return this.mapBackendCardToFront(response.data.data);
  }

  /**
   * Marcar/desmarcar tarjeta como favorita
   */
  async toggleFavorite(cardId: number): Promise<{ isFavorite: boolean }> {
    const response = await api.post(`/study-cards/${cardId}/favorite`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al cambiar favorito');
    }

    return response.data.data;
  }

  /**
   * Obtener tarjetas favoritas del usuario
   */
  async getFavoriteCards(page = 1, limit = 20): Promise<PaginatedResponse<UserStudyCard>> {
    const response = await api.get(`/study-cards/user/favorites?page=${page}&limit=${limit}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener favoritos');
    }

    return {
      data: response.data.data,
      pagination: response.data.pagination
    };
  }

  /**
   * Obtener progreso de estudio del usuario
   */
  async getStudyProgress(): Promise<StudyProgress> {
    const response = await api.get('/study-sessions/user/stats');

    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener progreso');
    }

    return response.data.data;
  }

  /**
   * Obtener tarjetas recomendadas
   */
  async getRecommendedCards(limit = 10): Promise<StudyCard[]> {
    // Not implemented in backend explicitly; fallback to popular or recent cards
    const response = await api.get(`/study-cards?limit=${limit}`);
    if (!response.data.success) throw new Error('Error al obtener recomendaciones');
  return Array.isArray(response.data.data) ? response.data.data.map((c: any) => this.mapBackendCardToFront(c)) : [];
  }

  // ============ SESIONES DE ESTUDIO ============

  /**
   * Iniciar una nueva sesión de estudio
   */
  async startStudySession(config: {
    courseId?: number;
    subTopicId?: number;
    sessionType?: "individual" | "review" | "quiz" | "general";
    sessionGoal?: number;
    targetDuration?: number;
    notes?: string;
  }): Promise<StudySession> {
    const response = await api.post('/study-sessions/start', config);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al iniciar sesión');
    }

    return response.data.data;
  }

  /**
   * Finalizar sesión de estudio
   */
  async finishStudySession(sessionId: number, data: {
    cardsStudied: number;
    notes?: string;
    rewardsOverride?: { cardsCoinsRounded?: number; timeCoins?: number; totalXavicoins?: number; experience?: number }
  }): Promise<{ session: any; rewards?: any } | null> {
    // If client provided cards/time coins, compute totalXavicoins to send as exact amount
    const payload = { ...data } as any;
    if (data.rewardsOverride) {
      const cards = Number(data.rewardsOverride.cardsCoinsRounded || 0);
      const time = Number(data.rewardsOverride.timeCoins || 0);
      payload.rewardsOverride = { ...data.rewardsOverride, totalXavicoins: Math.max(0, Math.ceil(cards + time)) };
    }

    const response = await api.post(`/study-sessions/${sessionId}/end`, payload);
    if (!response.data.success) throw new Error(response.data.message || 'Error al finalizar sesión');
    // backend may return rewards in the root response
    return {
      session: response.data.data,
      rewards: response.data.rewards || null
    };
  }

  /**
   * Registrar estudio de una tarjeta
   */
  async recordCardStudy(cardId: number, sessionId?: number): Promise<UserStudyCard> {
    // Backend exposes POST /study-cards/:cardId/study
    const response = await api.post(`/study-cards/${cardId}/study`, { sessionId });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al registrar estudio');
    }

    return response.data.data;
  }

  /**
   * Obtener sesión activa
   */
  async getActiveSession(): Promise<StudySession | null> {
    try {
      const response = await api.get('/study-sessions/user/active');
      if (!response.data.success) return null;
      return response.data.data || null;
    } catch (error: any) {
      if (error?.response?.status !== 404) console.warn('Error obteniendo sesión activa:', error?.response?.status || error?.message);
      return null;
    }
  }

  /**
   * Cancelar sesión activa
   */
  async cancelActiveSession(): Promise<void> {
    const response = await api.delete('/study-sessions/user/active');
    if (!response.data.success) throw new Error(response.data.message || 'Error al cancelar sesión');
  }

  /**
   * Obtener historial de sesiones
   */
  async getSessionHistory(filters: {
    sessionType?: string;
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
  } = {}): Promise<PaginatedResponse<StudySession>> {
    const params = new URLSearchParams();

    if (filters.sessionType) params.append('sessionType', filters.sessionType);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);

    const response = await api.get(`/study-sessions/history?${params.toString()}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener historial');
    }

    return {
      data: response.data.data,
      pagination: response.data.pagination
    };
  }

  /**
   * Obtener estadísticas de estudio
   */
  async getStudyStatistics(timeframe: "week" | "month" | "year" = "month"): Promise<StudyStatistics> {
    const response = await api.get(`/study-sessions/statistics?timeframe=${timeframe}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener estadísticas');
    }

    return response.data.data;
  }

  // ============ MÉTODOS HELPER ============

  private getDeckDisplayName(category: string, mathTopic?: string): string {
    const categoryNames = {
      matematicas: 'Matemáticas',
      fisica: 'Física',
      quimica: 'Química',
      otros: 'Otros'
    };

    const topicNames = {
      algebra: 'Álgebra',
      trigonometria: 'Trigonometría',
      geometria: 'Geometría',
      aritmetica: 'Aritmética',
      razonamiento_matematico: 'Razonamiento Matemático'
    };

    const categoryName = categoryNames[category as keyof typeof categoryNames] || category;

    if (mathTopic) {
      const topicName = topicNames[mathTopic as keyof typeof topicNames] || mathTopic;
      return `${categoryName} - ${topicName}`;
    }

    return categoryName;
  }

  private getDeckDescription(category: string, mathTopic?: string): string {
    const descriptions = {
      'matematicas-algebra': 'Ecuaciones, funciones, expresiones algebraicas, teoría de exponentes, productos notables',
      'matematicas-trigonometria': 'Funciones trigonométricas, identidades, ángulos trigonométricos, ecuaciones',
      'matematicas-geometria': 'Figuras planas, sólidos, áreas, volúmenes, teoremas geométricos',
      'matematicas-aritmetica': 'Operaciones básicas, fracciones, números reales, proporciones',
      'matematicas-razonamiento_matematico': 'Lógica matemática, problemas de razonamiento, sucesiones, series',
      'fisica': 'Leyes físicas, mecánica y termodinámica',
      'quimica': 'Elementos, reacciones y compuestos químicos',
      'otros': 'Conceptos variados y temas generales'
    };

    const key = mathTopic ? `${category}-${mathTopic}` : category;
    return descriptions[key as keyof typeof descriptions] || 'Tarjetas de estudio';
  }

  private getDeckIcon(category: string, mathTopic?: string): string {
    const icons = {
      'matematicas-algebra': '🔥', // Charmander-inspired (Fuego)
      'matematicas-trigonometria': '⚡', // Pikachu-inspired (Eléctrico)
      'matematicas-geometria': '💧', // Squirtle-inspired (Agua)
      'matematicas-aritmetica': '🌱', // Bulbasaur-inspired (Planta)
      'matematicas-razonamiento_matematico': '✨', // Fairy-type inspired
      'fisica': '🚀', // Flying-type inspired
      'quimica': '🧪', // Poison-type inspired
      'otros': '🎒' // Pokemon trainer backpack
    };

    const key = mathTopic ? `${category}-${mathTopic}` : category;
    return icons[key as keyof typeof icons] || '🎒';
  }

  private getDeckColor(category: string): string {
    const colors = {
      matematicas: '#fbbf24', // Pokemon yellow (Pikachu theme)
      fisica: '#ef4444', // Pokemon red (Pokeball theme)
      quimica: '#8b5cf6', // Pokemon purple (Psychic type)
      otros: '#10b981' // Pokemon green (Grass type)
    };

    return colors[category as keyof typeof colors] || '#fbbf24';
  }
}

export const studyService = new StudyService();

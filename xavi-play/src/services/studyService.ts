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

    return {
      data: response.data.data,
      pagination: response.data.pagination
    };
  }

  /**
   * Obtener tarjetas organizadas por mazos/categorías
   */
  async getStudyDecks(): Promise<StudyDeck[]> {
    const response = await api.get('/study-cards');
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener mazos');
    }

    const cards: StudyCard[] = response.data.data;
    
    // Agrupar tarjetas por categoría y tema matemático
    const decksMap = new Map<string, StudyDeck>();
    
    cards.forEach(card => {
      const key = card.mathTopic ? `${card.category}-${card.mathTopic}` : card.category;
      
      if (!decksMap.has(key)) {
        decksMap.set(key, {
          category: card.category,
          mathTopic: card.mathTopic,
          displayName: this.getDeckDisplayName(card.category, card.mathTopic),
          cardCount: 0,
          avgDifficulty: 'basico',
          totalXavicoins: 0,
          description: this.getDeckDescription(card.category, card.mathTopic),
          icon: this.getDeckIcon(card.category, card.mathTopic),
          color: this.getDeckColor(card.category)
        });
      }
      
      const deck = decksMap.get(key)!;
      deck.cardCount++;
      deck.totalXavicoins += card.xavicoinsReward;
    });

    return Array.from(decksMap.values());
  }

  /**
   * Obtener tarjetas de un mazo específico
   */
  async getDeckCards(category: string, mathTopic?: string): Promise<StudyCard[]> {
    const filters: StudyCardFilters = { category, limit: 100 };
    if (mathTopic) filters.mathTopic = mathTopic;
    
    const response = await this.getStudyCards(filters);
    return response.data;
  }

  /**
   * Obtener una tarjeta específica
   */
  async getStudyCard(id: number): Promise<StudyCard> {
    const response = await api.get(`/study-cards/${id}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener tarjeta');
    }

    return response.data.data;
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
    const response = await api.get(`/study-cards/favorites?page=${page}&limit=${limit}`);
    
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
    const response = await api.get('/study-cards/progress');
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener progreso');
    }

    return response.data.data;
  }

  /**
   * Obtener tarjetas recomendadas
   */
  async getRecommendedCards(limit = 10): Promise<StudyCard[]> {
    const response = await api.get(`/study-cards/recommended?limit=${limit}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener recomendaciones');
    }

    return response.data.data;
  }

  // ============ SESIONES DE ESTUDIO ============

  /**
   * Iniciar una nueva sesión de estudio
   */
  async startStudySession(config: {
    studyCardId?: number;
    sessionType?: "individual" | "review" | "quiz" | "general";
    sessionGoal?: number;
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
  }): Promise<{
    session: StudySession;
    rewardsEarned: {
      xavicoins: number;
      timeBonus: boolean;
      cardsBonus: number;
    };
  }> {
    const response = await api.put(`/study-sessions/${sessionId}/finish`, data);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al finalizar sesión');
    }

    return response.data.data;
  }

  /**
   * Registrar estudio de una tarjeta
   */
  async recordCardStudy(cardId: number, sessionId?: number): Promise<UserStudyCard> {
    const response = await api.post(`/study-sessions/cards/${cardId}/study`, { sessionId });
    
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
      const response = await api.get('/study-sessions/active');
      
      if (!response.data.success) {
        return null;
      }

      // Si success es true pero data es null, no hay sesión activa
      return response.data.data || null;
    } catch (error: any) {
      // Solo loggear errores reales (401, 500, etc.)
      if (error?.response?.status !== 404) {
        console.warn('Error obteniendo sesión activa:', error?.response?.status || error?.message);
      }
      return null;
    }
  }

  /**
   * Cancelar sesión activa
   */
  async cancelActiveSession(): Promise<void> {
    const response = await api.delete('/study-sessions/active');
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al cancelar sesión');
    }
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

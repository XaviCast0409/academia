# Integración del Sistema de Logros en el Frontend

## Descripción

Este documento explica cómo usar el nuevo sistema de progreso de logros en el frontend de la aplicación React Native.

## Componentes Actualizados

### 1. **AchievementService** (`src/services/achievementService.ts`)

El servicio ha sido actualizado con nuevos métodos:

```typescript
// Nuevos métodos disponibles
- updateProgressFromActivity(userId, activityData)
- updateProgressFromLevelUp(userId, newLevel)
- updateProgressFromStreak(userId, streakDays)
- updateProgressFromCoins(userId, totalCoins)
- forceUpdateAllUserAchievements(userId)
```

### 2. **AchievementStore** (`src/store/achievementStore.ts`)

El store ha sido actualizado con nuevas acciones:

```typescript
// Nuevas acciones disponibles
- updateProgressFromActivity(userId, activityData)
- updateProgressFromLevelUp(userId, newLevel)
- updateProgressFromStreak(userId, streakDays)
- updateProgressFromCoins(userId, totalCoins)
- forceUpdateAllUserAchievements(userId)
```

### 3. **useAchievementProgress Hook** (`src/hooks/useAchievementProgress.ts`)

Nuevo hook para manejar las actualizaciones de progreso:

```typescript
import { useAchievementProgress } from '@/hooks/useAchievementProgress';

const {
  updateActivityProgress,
  updateLevelProgress,
  updateStreakProgress,
  updateCoinsProgress,
  forceUpdateAllAchievements,
  userId
} = useAchievementProgress();
```

## Uso del Sistema

### Ejemplo 1: Actualizar Progreso por Actividad Completada

```typescript
import { useAchievementProgress } from '@/hooks/useAchievementProgress';

const MyComponent = () => {
  const { updateActivityProgress } = useAchievementProgress();

  const handleActivityCompleted = async (activityData: any) => {
    try {
      await updateActivityProgress({
        activityType: 'math',
        mathTopic: 'algebra',
        perfectScore: true,
        xavicoinsEarned: 25
      });
      
      
    } catch (error) {
      
    }
  };

  return (
    // Tu componente aquí
  );
};
```

### Ejemplo 2: Actualizar Progreso por Subida de Nivel

```typescript
import { useAchievementProgress } from '@/hooks/useAchievementProgress';

const MyComponent = () => {
  const { updateLevelProgress } = useAchievementProgress();

  const handleLevelUp = async (newLevel: number) => {
    try {
      await updateLevelProgress(newLevel);
      
    } catch (error) {
      
    }
  };

  return (
    // Tu componente aquí
  );
};
```

### Ejemplo 3: Actualizar Progreso por Racha

```typescript
import { useAchievementProgress } from '@/hooks/useAchievementProgress';

const MyComponent = () => {
  const { updateStreakProgress } = useAchievementProgress();

  const handleStreakUpdate = async (streakDays: number) => {
    try {
      await updateStreakProgress(streakDays);
      
    } catch (error) {
      
    }
  };

  return (
    // Tu componente aquí
  );
};
```

### Ejemplo 4: Actualizar Progreso por XaviCoins

```typescript
import { useAchievementProgress } from '@/hooks/useAchievementProgress';

const MyComponent = () => {
  const { updateCoinsProgress } = useAchievementProgress();

  const handleCoinsEarned = async (totalCoins: number) => {
    try {
      await updateCoinsProgress(totalCoins);
      
    } catch (error) {
      
    }
  };

  return (
    // Tu componente aquí
  );
};
```

### Ejemplo 5: Forzar Actualización (Debugging)

```typescript
import { useAchievementProgress } from '@/hooks/useAchievementProgress';

const DebugComponent = () => {
  const { forceUpdateAllAchievements } = useAchievementProgress();

  const handleForceUpdate = async () => {
    try {
      await forceUpdateAllAchievements();
      
    } catch (error) {
      
    }
  };

  return (
    <Button title="Forzar Actualización" onPress={handleForceUpdate} />
  );
};
```

## Integración Automática

### En Evidencias

Cuando se aprueba una evidencia, el backend automáticamente actualiza el progreso de logros. El frontend solo necesita recargar los datos:

```typescript
// En el componente de evidencias
const handleEvidenceApproved = async () => {
  // El backend ya actualizó los logros automáticamente
  // Solo necesitamos recargar los datos del usuario
  await refreshUserData();
  await refreshAchievements();
};
```

### En Subida de Nivel

Cuando el usuario sube de nivel, el backend automáticamente actualiza el progreso de logros:

```typescript
// En el componente de nivel
const handleLevelUp = async (newLevel: number) => {
  // El backend ya actualizó los logros automáticamente
  // Solo necesitamos recargar los datos
  await refreshUserData();
  await refreshAchievements();
};
```

## Tipos Actualizados

Los tipos han sido actualizados para incluir los nuevos campos:

```typescript
export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string; // Nuevo campo
  category: 'progress' | 'math' | 'gamification' | 'competition' | 'special';
  requirementType: 'activities_completed' | 'level_reached' | 'streak_days' | 'coins_earned' | 'perfect_scores' | 'math_topic' | 'ranking_position';
  requirementValue: number;
  requirementCondition?: 'consecutive' | 'total' | 'unique'; // Nuevo campo
  mathTopic?: 'aritmetica' | 'algebra' | 'geometria' | 'trigonometria' | 'razonamiento_matematico'; // Nuevo campo
  rewardType: 'coins' | 'badge' | 'title' | 'avatar_frame';
  rewardValue: number | string; // Cambiado a number | string
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserAchievement {
  id: number;
  userId: number;
  achievementId: number;
  currentProgress: number; // Cambiado de 'progress' a 'currentProgress'
  isUnlocked: boolean;
  rewardClaimed: boolean;
  unlockedAt?: string;
  claimedAt?: string;
  createdAt: string;
  updatedAt: string;
  achievement: Achievement;
}
```

## Mejores Prácticas

1. **Usar el hook useAchievementProgress**: Este hook maneja automáticamente la validación del usuario y los errores.

2. **Manejar errores**: Siempre envolver las llamadas en try-catch para manejar errores graciosamente.

3. **Recargar datos después de actualizaciones**: Después de actualizar el progreso, recargar los datos del usuario y logros.

4. **Usar para debugging**: El método `forceUpdateAllAchievements` es útil para debugging y testing.

5. **Logs detallados**: El sistema incluye logs detallados para monitoreo y debugging.

## Endpoints Disponibles

```http
# Actualizar progreso por actividad
POST /api/achievements/progress/activity/:userId

# Actualizar progreso por subida de nivel
POST /api/achievements/progress/level/:userId

# Actualizar progreso por racha
POST /api/achievements/progress/streak/:userId

# Actualizar progreso por XaviCoins
POST /api/achievements/progress/coins/:userId

# Función principal (múltiples acciones)
POST /api/achievements/progress/action/:userId

# Forzar actualización (debugging)
POST /api/achievements/progress/force-update/:userId

# Obtener progreso detallado
GET /api/achievements/progress/progress/:userId
```

## Ejemplo Completo

```typescript
import React from 'react';
import { View, Button, Alert } from 'react-native';
import { useAchievementProgress } from '@/hooks/useAchievementProgress';
import { useAchievementStore } from '@/store/achievementStore';

const AchievementTestComponent = () => {
  const { user } = useAuthStore();
  const { refreshUserAchievements } = useAchievementStore();
  const {
    updateActivityProgress,
    updateLevelProgress,
    updateStreakProgress,
    updateCoinsProgress,
    forceUpdateAllAchievements
  } = useAchievementProgress();

  const handleTestActivity = async () => {
    try {
      await updateActivityProgress({
        activityType: 'math',
        mathTopic: 'algebra',
        perfectScore: true,
        xavicoinsEarned: 25
      });
      
      await refreshUserAchievements(parseInt(user!.id));
      Alert.alert('Éxito', 'Progreso actualizado por actividad');
    } catch (error) {
      Alert.alert('Error', 'Error actualizando progreso');
    }
  };

  const handleTestLevelUp = async () => {
    try {
      await updateLevelProgress(5);
      await refreshUserAchievements(parseInt(user!.id));
      Alert.alert('Éxito', 'Progreso actualizado por subida de nivel');
    } catch (error) {
      Alert.alert('Error', 'Error actualizando progreso');
    }
  };

  const handleForceUpdate = async () => {
    try {
      await forceUpdateAllAchievements();
      await refreshUserAchievements(parseInt(user!.id));
      Alert.alert('Éxito', 'Actualización forzada completada');
    } catch (error) {
      Alert.alert('Error', 'Error en actualización forzada');
    }
  };

  return (
    <View>
      <Button title="Test Actividad" onPress={handleTestActivity} />
      <Button title="Test Subida de Nivel" onPress={handleTestLevelUp} />
      <Button title="Forzar Actualización" onPress={handleForceUpdate} />
    </View>
  );
};

export default AchievementTestComponent;
``` 
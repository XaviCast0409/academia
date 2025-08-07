import { View, Text, StyleSheet } from 'react-native';

interface StreakDisplayProps {
  currentStreak: number;
  lastActivityDate?: string;
  style?: any;
}

const StreakDisplay: React.FC<StreakDisplayProps> = ({
  currentStreak,
  lastActivityDate,
  style
}) => {
  const getStreakMessage = () => {
    if (currentStreak === 0) {
      return 'Inicia tu racha conectándote mañana';
    } else if (currentStreak === 1) {
      return '¡Primer día de tu racha!';
    } else if (currentStreak < 7) {
      return '¡Sigue así!';
    } else if (currentStreak < 30) {
      return '¡Excelente constancia!';
    } else {
      return '¡Eres increíble!';
    }
  };

  const getStreakIcon = () => {
    if (currentStreak === 0) return '📅';
    if (currentStreak < 3) return '🔥';
    if (currentStreak < 7) return '🔥🔥';
    if (currentStreak < 30) return '🔥🔥🔥';
    return '🔥🔥🔥⭐';
  };

  const formatLastActivityDate = () => {
    if (!lastActivityDate) return null;
    
    const date = new Date(lastActivityDate);
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    return `Hace ${diffDays} días`;
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.streakHeader}>
        <Text style={styles.streakIcon}>{getStreakIcon()}</Text>
        <View style={styles.streakInfo}>
          <Text style={styles.streakNumber}>{currentStreak}</Text>
          <Text style={styles.streakLabel}>
            {currentStreak === 1 ? 'día' : 'días'} seguidos
          </Text>
        </View>
      </View>
      
      <Text style={styles.streakMessage}>{getStreakMessage()}</Text>
      
      {lastActivityDate && (
        <Text style={styles.lastActivity}>
          Última conexión: {formatLastActivityDate()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fef3c7', // yellow-100
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f59e0b', // yellow-500
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  streakIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  streakInfo: {
    flex: 1,
  },
  streakNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#92400e', // yellow-800
  },
  streakLabel: {
    fontSize: 14,
    color: '#b45309', // yellow-700
    marginTop: -2,
  },
  streakMessage: {
    fontSize: 14,
    color: '#92400e', // yellow-800
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  lastActivity: {
    fontSize: 12,
    color: '#b45309', // yellow-700
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default StreakDisplay;
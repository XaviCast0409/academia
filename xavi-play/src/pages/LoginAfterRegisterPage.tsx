import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';

const LoginAfterRegisterPage: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Automatically redirect to login after 1.5 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Login' as never);
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ScreenWrapper>
      <View style={styles.container as any}>
        <View style={styles.successContainer as any}>
          <Text style={styles.successIcon as any}>✅</Text>
          <Text style={styles.successTitle as any}>¡Usuario Creado Exitosamente!</Text>
          <Text style={styles.successMessage as any}>
            Tu cuenta se ha creado correctamente. Serás redirigido al login en unos segundos.
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContainer: {
    backgroundColor: '#d1fae5', // green-100
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10b981', // green-500
    maxWidth: 300,
    width: '100%',
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#065f46', // green-800
    textAlign: 'center',
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 16,
    color: '#047857', // green-700
    textAlign: 'center',
    lineHeight: 24,
  },
};

export default LoginAfterRegisterPage; 
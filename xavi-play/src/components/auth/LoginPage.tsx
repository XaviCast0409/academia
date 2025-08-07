import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { loginStyles } from '@/styles/login.styles';
import { LoginPageProps } from '@/types/auth';
import { useAuthStore } from '@/store/authStore';

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthStore();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Iniciando login...');
      await login(email.trim(), password.trim());
      console.log('Login exitoso, llamando onLogin...');
      onLogin?.();
      console.log('onLogin ejecutado');
    } catch (error: any) {
      console.log("Error en login:", error);
      console.log("Error message:", error.message);
      console.log("Error response:", error.response);
      Alert.alert('Error de Login', error.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email.trim() && password.trim();

  return (
    <SafeAreaView style={loginStyles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
            backgroundColor: '#dc2626',
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={loginStyles.contentContainer}>
            {/* Pokemon Logo */}
            <View style={loginStyles.logoContainer}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png',
                }}
                style={loginStyles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Login Form */}
            <View style={loginStyles.formContainer}>
              {/* Pokeball Icon */}
              <View style={loginStyles.pokeballContainer}>
                <View style={loginStyles.pokeball}>
                  <View style={loginStyles.pokeballCenter} />
                </View>
              </View>

              <Text style={loginStyles.title}>
                ¡Inicia tu aventura Pokémon!
              </Text>

              <View style={loginStyles.inputContainer}>
                <Text style={loginStyles.label}>Email</Text>
                <TextInput
                  mode="outlined"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="ash@pokemon.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={[
                    loginStyles.input,
                    emailFocused && loginStyles.inputFocused,
                  ]}
                  outlineColor="#d1d5db"
                  activeOutlineColor="#fbbf24"
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  theme={{
                    colors: {
                      primary: '#fbbf24',
                    },
                  }}
                />
              </View>

              <View style={loginStyles.inputContainer}>
                <Text style={loginStyles.label}>Contraseña</Text>
                <TextInput
                  mode="outlined"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  secureTextEntry={!showPassword}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  style={[
                    loginStyles.input,
                    passwordFocused && loginStyles.inputFocused,
                  ]}
                  outlineColor="#d1d5db"
                  activeOutlineColor="#fbbf24"
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  theme={{
                    colors: {
                      primary: '#fbbf24',
                    },
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!isFormValid || isLoading}
                style={[
                  loginStyles.button,
                  (!isFormValid || isLoading) && loginStyles.buttonDisabled,
                ]}
              >
                <Text
                  style={[
                    loginStyles.buttonText,
                    (!isFormValid || isLoading) && loginStyles.buttonTextDisabled,
                  ]}
                >
                  {isLoading ? 'Iniciando sesión...' : '¡Quiero ser el mejor!'}
                </Text>
              </TouchableOpacity>

              {/* Create User Link */}
              <View style={loginStyles.createUserContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register' as never)}
                  style={loginStyles.createUserButton}
                >
                  <Text style={loginStyles.createUserButtonText}>
                    Crear nuevo usuario
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Pikachu Image */}
            <View style={loginStyles.pikachuContainer}>
              <Image
                source={{
                  uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
                }}
                style={loginStyles.pikachu}
                resizeMode="contain"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginPage; 
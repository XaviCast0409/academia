import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { personalDataStyles } from '@/styles/personalData.styles';

interface PersonalDataStepProps {
  form: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    section: string;
  };
  errors: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    section?: string;
  };
  onInputChange: (field: string, value: string) => void;
  onNext: () => void;
  isValid: boolean;
}

const PersonalDataStep: React.FC<PersonalDataStepProps> = ({
  form,
  errors,
  onInputChange,
  onNext,
  isValid,
}) => {
  return (
    <View style={personalDataStyles.container}>
      <View style={personalDataStyles.contentContainer}>
        <View style={personalDataStyles.header}>
          <Text style={personalDataStyles.title}>¡Comencemos tu aventura!</Text>
          <Text style={personalDataStyles.subtitle}>
            Paso 1 de 2: Tus datos personales
          </Text>
        </View>

        <View style={personalDataStyles.formContainer}>
          {/* Name Input */}
          <View style={personalDataStyles.inputContainer}>
            <Text style={personalDataStyles.label}>Nombre Completo</Text>
            <TextInput
              style={[
                personalDataStyles.input,
                errors.name && personalDataStyles.inputError
              ]}
              value={form.name}
              onChangeText={(value) => onInputChange('name', value)}
              placeholder="Ingresa tu nombre completo"
              autoCapitalize="words"
            />
            {errors.name && <Text style={personalDataStyles.errorText}>{errors.name}</Text>}
          </View>

          {/* Section Input */}
          <View style={personalDataStyles.inputContainer}>
            <Text style={personalDataStyles.label}>Sección</Text>
            <TextInput
              style={[
                personalDataStyles.input,
                errors.section && personalDataStyles.inputError
              ]}
              value={form.section}
              onChangeText={(value) => onInputChange('section', value)}
              placeholder="Ej: A, B, C, etc."
              autoCapitalize="characters"
            />
            {errors.section && <Text style={personalDataStyles.errorText}>{errors.section}</Text>}
          </View>

          {/* Email Input */}
          <View style={personalDataStyles.inputContainer}>
            <Text style={personalDataStyles.label}>Email</Text>
            <TextInput
              style={[
                personalDataStyles.input,
                errors.email && personalDataStyles.inputError
              ]}
              value={form.email}
              onChangeText={(value) => onInputChange('email', value)}
              placeholder="ejemplo@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={personalDataStyles.errorText}>{errors.email}</Text>}
          </View>

          {/* Password Input */}
          <View style={personalDataStyles.inputContainer}>
            <Text style={personalDataStyles.label}>Contraseña</Text>
            <TextInput
              style={[
                personalDataStyles.input,
                errors.password && personalDataStyles.inputError
              ]}
              value={form.password}
              onChangeText={(value) => onInputChange('password', value)}
              placeholder="Mínimo 6 caracteres"
              secureTextEntry
            />
            {errors.password && <Text style={personalDataStyles.errorText}>{errors.password}</Text>}
          </View>

          {/* Confirm Password Input */}
          <View style={personalDataStyles.inputContainer}>
            <Text style={personalDataStyles.label}>Confirmar Contraseña</Text>
            <TextInput
              style={[
                personalDataStyles.input,
                errors.confirmPassword && personalDataStyles.inputError
              ]}
              value={form.confirmPassword}
              onChangeText={(value) => onInputChange('confirmPassword', value)}
              placeholder="Repite la contraseña"
              secureTextEntry
            />
            {errors.confirmPassword && <Text style={personalDataStyles.errorText}>{errors.confirmPassword}</Text>}
          </View>
        </View>
      </View>

      <View style={personalDataStyles.buttonContainer}>
        <TouchableOpacity
          style={[
            personalDataStyles.nextButton,
            !isValid && personalDataStyles.nextButtonDisabled
          ]}
          onPress={onNext}
          disabled={!isValid}
        >
          <Text style={[
            personalDataStyles.nextButtonText,
            !isValid && personalDataStyles.nextButtonTextDisabled
          ]}>
            Siguiente Paso →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PersonalDataStep; 
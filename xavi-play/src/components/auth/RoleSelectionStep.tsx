import { View, Text, TouchableOpacity } from 'react-native';
import { roleSelectionStyles } from '@/styles/roleSelection.styles';
import { Role } from '@/services/userService';

interface RoleSelectionStepProps {
  roles: Role[];
  selectedRole: Role | null;
  onRoleSelect: (role: Role) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
}

const RoleSelectionStep: React.FC<RoleSelectionStepProps> = ({
  roles,
  selectedRole,
  onRoleSelect,
  onNext,
  onBack,
  isValid,
}) => {
  return (
    <View style={roleSelectionStyles.container}>
      <View style={roleSelectionStyles.contentContainer}>
        <View style={roleSelectionStyles.header}>
          <Text style={roleSelectionStyles.title}>¿Cuál será tu rol?</Text>
          <Text style={roleSelectionStyles.subtitle}>
            Paso 2 de 3: Selecciona tu rol en la academia
          </Text>
        </View>

        <View style={roleSelectionStyles.rolesContainer}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[
                roleSelectionStyles.roleCard,
                selectedRole?.id === role.id && roleSelectionStyles.roleCardSelected
              ]}
              onPress={() => onRoleSelect(role)}
            >
              <View style={roleSelectionStyles.roleIcon}>
                <Text style={roleSelectionStyles.roleIconText}>
                  {role.name === 'Estudiante' ? '👨‍🎓' : '👨‍🏫'}
                </Text>
              </View>
              <Text style={[
                roleSelectionStyles.roleName,
                selectedRole?.id === role.id && roleSelectionStyles.roleNameSelected
              ]}>
                {role.name}
              </Text>
              <Text style={roleSelectionStyles.roleDescription}>
                {role.name === 'Estudiante'
                  ? 'Accede a actividades, misiones y logros'
                  : 'Gestiona contenido y supervisa estudiantes'
                }
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={roleSelectionStyles.buttonContainer}>
        <View style={roleSelectionStyles.navigationContainer}>
          <TouchableOpacity
            style={roleSelectionStyles.backButton}
            onPress={onBack}
          >
            <Text style={roleSelectionStyles.backButtonText}>← Anterior</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              roleSelectionStyles.nextButton,
              !isValid && roleSelectionStyles.nextButtonDisabled
            ]}
            onPress={onNext}
            disabled={!isValid}
          >
            <Text style={[
              roleSelectionStyles.nextButtonText,
              !isValid && roleSelectionStyles.nextButtonTextDisabled
            ]}>
              Siguiente Paso →
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RoleSelectionStep; 
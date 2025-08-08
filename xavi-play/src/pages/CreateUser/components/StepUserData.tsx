import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { createUserStyles } from '@/styles/createUser.styles';

type SectionOption = 'Primaria' | '1ro Sec' | '2do Sec' | '3ro Sec' | '4to Sec' | '5to Sec';

interface Props {
  values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    section: string;
  };
  onChange: <K extends keyof Props['values']>(key: K, value: Props['values'][K]) => void;
  sectionOptions: SectionOption[];
  onContinue: () => void;
  canContinue: boolean;
}

export const StepUserData: React.FC<Props> = ({ values, onChange, sectionOptions, onContinue, canContinue }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [sectionOpen, setSectionOpen] = useState(false);

  const sectionList = useMemo(() => sectionOptions, [sectionOptions]);

  return (
    <View>
      <Text style={createUserStyles.title}>Datos del Usuario</Text>

      {/* Name */}
      <View style={createUserStyles.inputContainer}>
        <Text style={createUserStyles.label}>Nombre</Text>
        <TextInput
          style={createUserStyles.input}
          value={values.name}
          onChangeText={(v) => onChange('name', v)}
          placeholder="Ingresa el nombre completo"
          autoCapitalize="words"
        />
      </View>

      {/* Email */}
      <View style={createUserStyles.inputContainer}>
        <Text style={createUserStyles.label}>Email</Text>
        <TextInput
          style={createUserStyles.input}
          value={values.email}
          onChangeText={(v) => onChange('email', v)}
          placeholder="ejemplo@email.com"
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      {/* Password */}
      <View style={createUserStyles.inputContainer}>
        <Text style={createUserStyles.label}>Contraseña</Text>
        <View style={createUserStyles.passwordRow}>
          <TextInput
            style={[createUserStyles.input, { flex: 1 }]}
            value={values.password}
            onChangeText={(v) => onChange('password', v)}
            placeholder="Mínimo 6 caracteres"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={createUserStyles.eyeButton}
            onPress={() => setPasswordVisible((s) => !s)}
          >
            <Text style={createUserStyles.eyeText}>{passwordVisible ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm Password */}
      <View style={createUserStyles.inputContainer}>
        <Text style={createUserStyles.label}>Confirmar Contraseña</Text>
        <View style={createUserStyles.passwordRow}>
          <TextInput
            style={[createUserStyles.input, { flex: 1 }]}
            value={values.confirmPassword}
            onChangeText={(v) => onChange('confirmPassword', v)}
            placeholder="Repite la contraseña"
            secureTextEntry={!confirmVisible}
          />
          <TouchableOpacity
            style={createUserStyles.eyeButton}
            onPress={() => setConfirmVisible((s) => !s)}
          >
            <Text style={createUserStyles.eyeText}>{confirmVisible ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Section Select */}
      <View style={createUserStyles.inputContainer}>
        <Text style={createUserStyles.label}>Sección</Text>
        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            style={createUserStyles.selector}
            onPress={() => setSectionOpen((v) => !v)}
            activeOpacity={0.7}
          >
            <Text style={createUserStyles.selectorText}>
              {values.section ? values.section : 'Selecciona una sección'}
            </Text>
            <Text style={{ color: '#6b7280' }}>▼</Text>
          </TouchableOpacity>
          {sectionOpen && (
            <View style={[
              createUserStyles.selectorDropdown,
              { position: 'absolute', top: 52, left: 0, right: 0, zIndex: 10 }
            ]}>
              <ScrollView nestedScrollEnabled style={{ maxHeight: 200 }}>
                {sectionList.map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    style={[
                      createUserStyles.selectorOption,
                      values.section === opt && { backgroundColor: '#eff6ff' },
                    ]}
                    onPress={() => {
                      onChange('section', opt);
                      setSectionOpen(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={createUserStyles.selectorOptionText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={[createUserStyles.button, !canContinue && createUserStyles.buttonDisabled]}
        onPress={onContinue}
        disabled={!canContinue}
      >
        <Text style={createUserStyles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StepUserData;


import React, { useCallback, useMemo, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import { createUserStyles } from '@/styles/createUser.styles';
import userService from '@/services/userService';
import { StepUserData } from './components/StepUserData';
import { StepPokemonSelect } from './components/StepPokemonSelect';
import { CreatingOverlay } from './components/CreatingOverlay';

type SectionOption = 'Primaria' | '1ro Sec' | '2do Sec' | '3ro Sec' | '4to Sec' | '5to Sec';

interface CreateUserForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  section: SectionOption | '';
  pokemonId: number;
}

const SECTION_OPTIONS: SectionOption[] = [
  'Primaria',
  '1ro Sec',
  '2do Sec',
  '3ro Sec',
  '4to Sec',
  '5to Sec',
];

export const CreateUserScreen: React.FC = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const [form, setForm] = useState<CreateUserForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    section: '',
    pokemonId: 0,
  });

  const isStepOneValid = useMemo(() => {
    return (
      form.name.trim().length > 0 &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.password.length >= 6 &&
      form.password === form.confirmPassword &&
      Boolean(form.section)
    );
  }, [form.name, form.email, form.password, form.confirmPassword, form.section]);

  const isStepTwoValid = useMemo(() => form.pokemonId > 0, [form.pokemonId]);

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const updateField = useCallback(<K extends keyof CreateUserForm>(key: K, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = async () => {
    if (!isStepOneValid || !isStepTwoValid) return;

    try {
      setIsSubmitting(true);
      // Crear usuario con rol fijo de alumno (id 2)
      await userService.createUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        roleId: 2,
        pokemonId: form.pokemonId,
        section: form.section as string,
      });

      // Mostrar overlay ~5s y luego navegar a Login
      setShowOverlay(true);
      setTimeout(() => {
        setShowOverlay(false);
        (navigation as any).reset({ index: 0, routes: [{ name: 'Login' }] });
      }, 5000);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al crear el usuario');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView
        style={createUserStyles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 1 }}
      >
        <View style={createUserStyles.formContainer}>
          {step === 1 ? (
            <StepUserData
              values={form}
              onChange={updateField}
              sectionOptions={SECTION_OPTIONS}
              onContinue={handleNext}
              canContinue={isStepOneValid}
            />
          ) : (
            <StepPokemonSelect
              selectedPokemonId={form.pokemonId}
              onSelectPokemon={(id: number) => updateField('pokemonId', id)}
              onSubmit={handleSubmit}
              canSubmit={isStepTwoValid && !isSubmitting}
              submitting={isSubmitting}
            />
          )}
        </View>
      </ScrollView>

      <CreatingOverlay visible={showOverlay} />
    </ScreenWrapper>
  );
};

export default CreateUserScreen;


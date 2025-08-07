import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PersonalDataStep from '@/components/auth/PersonalDataStep';
import PokemonSelectionStep from '@/components/auth/PokemonSelectionStep';
import userService, { Pokemon } from '@/services/userService';
import { RootStackParamList } from '@/types/navigation';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  roleId: number;
  pokemonId: number;
  section: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  pokemonId?: string;
  section?: string;
}

type Step = 'personal' | 'pokemon';

type RegisterNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

const RegisterPage = () => {
  const navigation = useNavigation<RegisterNavigationProp>();
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [currentPokemonPage, setCurrentPokemonPage] = useState(1);
  const [totalPokemonPages, setTotalPokemonPages] = useState(1);
  const [loadingMorePokemons, setLoadingMorePokemons] = useState(false);

  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    roleId: 2, // Automatically assign student role (ID 2)
    pokemonId: 0,
    section: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Load pokemons on component mount
  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async (page: number = 1) => {
    try {
      setLoadingMorePokemons(true);
      const response = await userService.getPokemons(page);
      const { pokemons: newPokemons, totalPages } = response;
      
      if (page === 1) {
        setPokemons(newPokemons);
      } else {
        setPokemons(prev => [...prev, ...newPokemons]);
      }
      
      setTotalPokemonPages(totalPages);
      setCurrentPokemonPage(page);
    } catch (error) {
      console.error('Error loading pokemons:', error);
      Alert.alert('Error', 'No se pudieron cargar los Pokémon');
    } finally {
      setLoadingMorePokemons(false);
    }
  };

  const validatePersonalData = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!form.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!form.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (form.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!form.section.trim()) {
      newErrors.section = 'La sección es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePokemonSelection = (): boolean => {
    const newErrors: FormErrors = { ...errors };
    
    if (!form.pokemonId) {
      newErrors.pokemonId = 'Debes seleccionar un Pokémon';
      setErrors(newErrors);
      return false;
    }
    
    setErrors(newErrors);
    return true;
  };

  const handleCreateUser = async () => {
    if (!validatePokemonSelection()) {
      return;
    }

    setLoading(true);
    try {
      const userData = {
        name: form.name.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password,
        roleId: form.roleId, // This will always be 2 (student)
        pokemonId: form.pokemonId,
        section: form.section.trim(),
      };

      const response = await userService.createUser(userData);
      
      // Navigate to success page which will redirect to login automatically
      navigation.navigate('LoginAfterRegister', { 
        userEmail: form.email.toLowerCase().trim() 
      });
      
    } catch (error: any) {
      console.error('Error creating user:', error);
      const errorMessage = error.response?.data?.error || 'Error al crear el usuario';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field as keyof FormErrors]: undefined }));
    }
  };

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setForm(prev => ({ ...prev, pokemonId: pokemon.id }));
    setErrors(prev => ({ ...prev, pokemonId: undefined }));
  };

  const handleNextStep = () => {
    if (currentStep === 'personal') {
      if (validatePersonalData()) {
        setCurrentStep('pokemon');
      }
    }
  };

  const handleBackStep = () => {
    if (currentStep === 'pokemon') {
      setCurrentStep('personal');
    }
  };

  const loadMorePokemons = () => {
    if (currentPokemonPage < totalPokemonPages && !loadingMorePokemons) {
      loadPokemons(currentPokemonPage + 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPokemonPages && page !== currentPokemonPage) {
      setPokemons([]); // Limpiar Pokémon actuales
      loadPokemons(page);
    }
  };

  const isPersonalDataValid = (): boolean => {
    return Boolean(
      form.name.trim() && 
      form.email.trim() && 
      /\S+@\S+\.\S+/.test(form.email) &&
      form.password.length >= 6 && 
      form.password === form.confirmPassword &&
      form.section.trim()
    );
  };

  const isPokemonSelectionValid = () => {
    return form.pokemonId > 0;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <PersonalDataStep
            form={{
              name: form.name,
              email: form.email,
              password: form.password,
              confirmPassword: form.confirmPassword,
              section: form.section,
            }}
            errors={{
              name: errors.name,
              email: errors.email,
              password: errors.password,
              confirmPassword: errors.confirmPassword,
              section: errors.section,
            }}
            onInputChange={handleInputChange}
            onNext={handleNextStep}
            isValid={isPersonalDataValid()}
          />
        );
      case 'pokemon':
        return (
          <PokemonSelectionStep
            pokemons={pokemons}
            selectedPokemon={selectedPokemon}
            currentPage={currentPokemonPage}
            totalPages={totalPokemonPages}
            loadingMore={loadingMorePokemons}
            onPokemonSelect={handlePokemonSelect}
            onNext={handleCreateUser}
            onBack={handleBackStep}
            onLoadMore={loadMorePokemons}
            onPageChange={goToPage}
            isValid={isPokemonSelectionValid()}
            creatingUser={loading}
          />
        );
      default:
        return null;
    }
  };
  return (
    <ScreenWrapper>
      {renderStep()}
    </ScreenWrapper>
  );
};

export default RegisterPage; 
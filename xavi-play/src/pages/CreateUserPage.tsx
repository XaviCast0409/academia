import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import { createUserStyles } from '@/styles/createUser.styles';
import userService, { Role, Pokemon } from '@/services/userService';



interface CreateUserForm {
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
  roleId?: string;
  pokemonId?: string;
  section?: string;
}

const CreateUserPage: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [showPokemonSelector, setShowPokemonSelector] = useState(false);
  const [currentPokemonPage, setCurrentPokemonPage] = useState(1);
  const [totalPokemonPages, setTotalPokemonPages] = useState(1);
  const [loadingMorePokemons, setLoadingMorePokemons] = useState(false);

  const [form, setForm] = useState<CreateUserForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    roleId: 0,
    pokemonId: 0,
    section: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Load roles and pokemons on component mount
  useEffect(() => {
    loadRoles();
    loadPokemons();
  }, []);

  const loadRoles = async () => {
    try {
      const rolesData = await userService.getRoles();
      setRoles(rolesData);
    } catch (error) {
      console.error('Error loading roles:', error);
      Alert.alert('Error', 'No se pudieron cargar los roles');
    }
  };

  const loadPokemons = async (page: number = 1) => {
    try {
      setLoadingMorePokemons(true);
      const response = await userService.getPokemons(page);
      const { pokemons: newPokemons, totalPages } = response;
      
      // Para la primera página, mostrar solo los primeros 12 Pokémon
      if (page === 1) {
        setPokemons(newPokemons.slice(0, 12));
      } else {
        // Para páginas adicionales, agregar los siguientes 12
        const startIndex = (page - 1) * 12;
        const endIndex = startIndex + 12;
        const pagePokemons = newPokemons.slice(startIndex, endIndex);
        setPokemons(prev => [...prev, ...pagePokemons]);
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

  const validateForm = (): boolean => {
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

    if (!form.roleId) {
      newErrors.roleId = 'Debes seleccionar un rol';
    }

    if (!form.pokemonId) {
      newErrors.pokemonId = 'Debes seleccionar un Pokémon';
    }

    if (!form.section.trim()) {
      newErrors.section = 'La sección es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateUser = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {    
      Alert.alert(
        'Usuario Creado',
        'El usuario se ha creado exitosamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error: any) {
      console.error('Error creating user:', error);
      const errorMessage = error.response?.data?.error || 'Error al crear el usuario';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateUserForm, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field as keyof FormErrors]: undefined }));
    }
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    handleInputChange('roleId', role.id);
    setShowRoleSelector(false);
  };

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    handleInputChange('pokemonId', pokemon.id);
    setShowPokemonSelector(false);
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

  // Función para obtener solo los Pokémon de la página actual
  const getCurrentPagePokemons = () => {
    const startIndex = (currentPokemonPage - 1) * 12;
    const endIndex = startIndex + 12;
    return pokemons.slice(startIndex, endIndex);
  };

  return (
    <ScreenWrapper>
      <PokemonHeader title="Crear Usuario" showBackButton onBackPress={() => navigation.goBack()} />
      <ScrollView 
        style={createUserStyles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={createUserStyles.formContainer}>
          <Text style={createUserStyles.title}>Nuevo Usuario</Text>
          
          {/* Info Message */}
          <View style={createUserStyles.infoContainer}>
            <Text style={createUserStyles.infoText}>
              👨‍💼 Solo administradores pueden crear nuevos usuarios
            </Text>
          </View>

          {/* Name Input */}
          <View style={createUserStyles.inputContainer}>
            <Text style={createUserStyles.label}>Nombre</Text>
            <TextInput
              style={[
                createUserStyles.input,
                errors.name && createUserStyles.inputError
              ]}
              value={form.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Ingresa el nombre completo"
              autoCapitalize="words"
            />
            {errors.name && <Text style={createUserStyles.errorText}>{errors.name}</Text>}
          </View>

          {/* Email Input */}
          <View style={createUserStyles.inputContainer}>
            <Text style={createUserStyles.label}>Email</Text>
            <TextInput
              style={[
                createUserStyles.input,
                errors.email && createUserStyles.inputError
              ]}
              value={form.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="ejemplo@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={createUserStyles.errorText}>{errors.email}</Text>}
          </View>

          {/* Password Input */}
          <View style={createUserStyles.inputContainer}>
            <Text style={createUserStyles.label}>Contraseña</Text>
            <TextInput
              style={[
                createUserStyles.input,
                errors.password && createUserStyles.inputError
              ]}
              value={form.password}
              onChangeText={(value) => handleInputChange('password', value)}
              placeholder="Mínimo 6 caracteres"
              secureTextEntry
            />
            {errors.password && <Text style={createUserStyles.errorText}>{errors.password}</Text>}
          </View>

          {/* Confirm Password Input */}
          <View style={createUserStyles.inputContainer}>
            <Text style={createUserStyles.label}>Confirmar Contraseña</Text>
            <TextInput
              style={[
                createUserStyles.input,
                errors.confirmPassword && createUserStyles.inputError
              ]}
              value={form.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              placeholder="Repite la contraseña"
              secureTextEntry
            />
            {errors.confirmPassword && <Text style={createUserStyles.errorText}>{errors.confirmPassword}</Text>}
          </View>

          {/* Section Input */}
          <View style={createUserStyles.inputContainer}>
            <Text style={createUserStyles.label}>Sección</Text>
            <TextInput
              style={[
                createUserStyles.input,
                errors.section && createUserStyles.inputError
              ]}
              value={form.section}
              onChangeText={(value) => handleInputChange('section', value)}
              placeholder="Ej: A, B, C, etc."
              autoCapitalize="characters"
            />
            {errors.section && <Text style={createUserStyles.errorText}>{errors.section}</Text>}
          </View>

          {/* Role Selector */}
          <View style={createUserStyles.inputContainer}>
            <Text style={createUserStyles.label}>Rol</Text>
            <TouchableOpacity
                             style={[
                 createUserStyles.selector,
                 errors.roleId ? createUserStyles.inputError : undefined
               ]}
              onPress={() => setShowRoleSelector(!showRoleSelector)}
            >
              <Text style={createUserStyles.selectorText}>
                {selectedRole ? selectedRole.name : 'Selecciona un rol'}
              </Text>
            </TouchableOpacity>
            {errors.roleId && <Text style={createUserStyles.errorText}>{errors.roleId}</Text>}
          </View>

          {showRoleSelector && (
            <View style={createUserStyles.selectorDropdown}>
              {roles.map((role) => (
                <TouchableOpacity
                  key={role.id}
                  style={createUserStyles.selectorOption}
                  onPress={() => handleRoleSelect(role)}
                >
                  <Text style={createUserStyles.selectorOptionText}>{role.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Pokemon Selector */}
          <View style={createUserStyles.inputContainer}>
            <Text style={createUserStyles.label}>Pokémon</Text>
            <TouchableOpacity
                             style={[
                 createUserStyles.selector,
                 errors.pokemonId ? createUserStyles.inputError : undefined
               ]}
              onPress={() => setShowPokemonSelector(!showPokemonSelector)}
            >
              {selectedPokemon ? (
                <View style={createUserStyles.pokemonSelector}>
                  <Image 
                    source={{ uri: selectedPokemon.highResImageUrl }} 
                    style={createUserStyles.pokemonImage}
                  />
                  <Text style={createUserStyles.selectorText}>{selectedPokemon.name}</Text>
                </View>
              ) : (
                <Text style={createUserStyles.selectorText}>Selecciona un Pokémon</Text>
              )}
            </TouchableOpacity>
            {errors.pokemonId && <Text style={createUserStyles.errorText}>{errors.pokemonId}</Text>}
          </View>

                     {showPokemonSelector && (
             <View style={createUserStyles.pokemonGrid}>
                               <View style={createUserStyles.pokemonGridContainer}>
                  {getCurrentPagePokemons().map((pokemon) => (
                    <TouchableOpacity
                      key={pokemon.id}
                      style={[
                        createUserStyles.pokemonOption,
                        selectedPokemon?.id === pokemon.id && createUserStyles.pokemonOptionSelected
                      ]}
                      onPress={() => handlePokemonSelect(pokemon)}
                    >
                      <Image 
                        source={{ uri: pokemon.highResImageUrl }} 
                        style={createUserStyles.pokemonOptionImage}
                      />
                      <Text style={createUserStyles.pokemonOptionText}>{pokemon.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
               
               {/* Paginación */}
               <View style={createUserStyles.paginationContainer}>
                 <TouchableOpacity
                   style={[
                     createUserStyles.paginationButton,
                     currentPokemonPage === 1 && createUserStyles.paginationButtonDisabled
                   ]}
                   onPress={() => goToPage(currentPokemonPage - 1)}
                   disabled={currentPokemonPage === 1}
                 >
                   <Text style={[
                     createUserStyles.paginationButtonText,
                     currentPokemonPage === 1 && createUserStyles.paginationButtonTextDisabled
                   ]}>
                     ←
                   </Text>
                 </TouchableOpacity>
                 
                 <Text style={createUserStyles.paginationInfo}>
                   Página {currentPokemonPage} de {totalPokemonPages}
                 </Text>
                 
                 <TouchableOpacity
                   style={[
                     createUserStyles.paginationButton,
                     currentPokemonPage === totalPokemonPages && createUserStyles.paginationButtonDisabled
                   ]}
                   onPress={() => goToPage(currentPokemonPage + 1)}
                   disabled={currentPokemonPage === totalPokemonPages}
                 >
                   <Text style={[
                     createUserStyles.paginationButtonText,
                     currentPokemonPage === totalPokemonPages && createUserStyles.paginationButtonTextDisabled
                   ]}>
                     →
                   </Text>
                 </TouchableOpacity>
               </View>
               
               {/* Botón para cargar más Pokémon */}
               {currentPokemonPage < totalPokemonPages && (
                 <TouchableOpacity
                   style={createUserStyles.loadMoreButton}
                   onPress={loadMorePokemons}
                   disabled={loadingMorePokemons}
                 >
                   <Text style={createUserStyles.loadMoreText}>
                     {loadingMorePokemons ? 'Cargando...' : 'Cargar más Pokémon'}
                   </Text>
                 </TouchableOpacity>
               )}
             </View>
           )}

          {/* Create Button */}
          <TouchableOpacity
            style={[
              createUserStyles.button,
              loading && createUserStyles.buttonDisabled
            ]}
            onPress={handleCreateUser}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#1e40af" />
            ) : (
              <Text style={createUserStyles.buttonText}>Crear Usuario</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default CreateUserPage; 
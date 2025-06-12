import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  CircularProgress
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRoleStore } from '../../store/roleStore';
import { useEffect, useState } from 'react';
import { createUser } from '../../services/userService';
import type { CreateUserDTO } from '../../types/user';
import { PokemonSelector } from '../pokemon/PokemonSelector';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  name: yup.string().required('Nombre requerido'),
  email: yup.string().email('Email inválido').required('Email requerido'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('Contraseña requerida'),
  roleId: yup.number().required('Rol requerido'),
  pokemonId: yup.number().required('Pokémon requerido')
});

export const CreateUserForm = () => {
  const { getAllRoles } = useRoleStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateUserDTO>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      roleId: 2, // 👈 rol alumno por defecto
      pokemonId: undefined
    }
  });

  useEffect(() => {
    getAllRoles();
  }, [getAllRoles]);

  const onSubmit = async (data: CreateUserDTO) => {
    try {
      setLoading(true);
      await createUser(data);
      await Swal.fire({
        icon: 'success',
        title: '¡Usuario creado!',
        text: 'Tu cuenta ha sido registrada correctamente.',
        confirmButtonColor: '#e07f3f'
      });
      reset();
      navigate('/'); // 👈 redirige al login
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear usuario',
        text: 'Verifica los datos ingresados o intenta más tarde.',
        confirmButtonColor: '#e07f3f'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      width={400}
      mx="auto"
      mt={4}
      p={3}
      bgcolor="#F5E8DC"
      borderRadius={2}
      boxShadow="0px 4px 12px rgba(0,0,0,0.1)"
    >
      <Typography variant="h5" mb={2} color="#84341C">
        Crear Usuario
      </Typography>

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            label="Nombre"
            {...field}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
            sx={{ '& .MuiInputBase-root': { backgroundColor: '#fff' } }}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            label="Email"
            {...field}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
            sx={{ '& .MuiInputBase-root': { backgroundColor: '#fff' } }}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            {...field}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
            sx={{ '& .MuiInputBase-root': { backgroundColor: '#fff' } }}
          />
        )}
      />

      <Controller
        name="roleId"
        control={control}
        render={({ field }) => (
          <TextField
            label="Rol"
            fullWidth
            disabled // 👈 desactiva la edición
            value={2} // 👈 forzamos el valor a 2 (Alumno)
            margin="normal"
            sx={{ '& .MuiInputBase-root': { backgroundColor: '#fff' } }}
            helperText="Este campo no se puede modificar"
          >
            <MenuItem value={2}>
              Alumno
            </MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="pokemonId"
        control={control}
        render={({ field }) => <PokemonSelector field={field} />}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{
          mt: 3,
          bgcolor: '#E07F3F',
          color: '#fff',
          '&:hover': {
            bgcolor: '#C26C2D',
          }
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Crear Usuario'}
      </Button>
    </Box>
  );
};

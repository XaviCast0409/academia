import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
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
      roleId: 2,
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
      navigate('/');
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
      sx={{
        maxWidth: 500,
        mx: 'auto',
        my: 6,
        px: 4,
        py: 5,
        backgroundColor: '#F5E8DC',
        borderRadius: 4,
        boxShadow: '0 0 20px rgba(224, 127, 63, 0.4)',
        border: '4px solid #E07F3F',
        fontFamily: "'Press Start 2P', cursive"
      }}
    >
      <Typography
        variant="h5"
        align="center"
        mb={4}
        sx={{
          fontFamily: "'Press Start 2P', cursive",
          color: '#84341C',
          fontSize: '1rem'
        }}
      >
        CREAR USUARIO
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
            InputLabelProps={{ style: { fontFamily: "'Press Start 2P'", fontSize: '0.6rem' } }}
            inputProps={{ style: { fontFamily: "'Press Start 2P'", fontSize: '0.6rem' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
                '& fieldset': { borderColor: '#84341C' },
                '&:hover fieldset': { borderColor: '#E07F3F' }
              }
            }}
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
            InputLabelProps={{ style: { fontFamily: "'Press Start 2P'", fontSize: '0.6rem' } }}
            inputProps={{ style: { fontFamily: "'Press Start 2P'", fontSize: '0.6rem' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
                '& fieldset': { borderColor: '#84341C' },
                '&:hover fieldset': { borderColor: '#E07F3F' }
              }
            }}
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
            InputLabelProps={{ style: { fontFamily: "'Press Start 2P'", fontSize: '0.6rem' } }}
            inputProps={{ style: { fontFamily: "'Press Start 2P'", fontSize: '0.6rem' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
                '& fieldset': { borderColor: '#84341C' },
                '&:hover fieldset': { borderColor: '#E07F3F' }
              }
            }}
          />
        )}
      />

      <Controller
        name="roleId"
        control={control}
        render={({ field }) => (
          <TextField
            label="Rol"
            {...field}
            fullWidth
            disabled
            value={2}
            margin="normal"
            helperText="Este campo no se puede modificar"
            InputLabelProps={{ style: { fontFamily: "'Press Start 2P'", fontSize: '0.6rem' } }}
            inputProps={{ style: { fontFamily: "'Press Start 2P'", fontSize: '0.6rem' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
                '& fieldset': { borderColor: '#84341C' },
                '&:hover fieldset': { borderColor: '#E07F3F' }
              }
            }}
          >
            <MenuItem value={2}>Alumno</MenuItem>
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
          py: 1.5,
          backgroundColor: '#E07F3F',
          color: '#fff',
          fontFamily: "'Press Start 2P', cursive",
          fontSize: '0.6rem',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: '#C26C2D',
            transform: 'scale(1.02)'
          }
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'CREAR USUARIO'}
      </Button>
    </Box>
  );
};

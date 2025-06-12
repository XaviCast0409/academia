import {
  Box, Button, MenuItem, TextField, Typography
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRoleStore } from '../../store/roleStore';
import { useEffect } from 'react';
import { createUser } from '../../services/userService';
import type { CreateUserDTO } from '../../types/user';
import { PokemonSelector } from '../pokemon/PokemonSelector';

const schema = yup.object().shape({
  name: yup.string().required('Nombre requerido'),
  email: yup.string().email('Email inválido').required('Email requerido'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('Contraseña requerida'),
  roleId: yup.number().required('Rol requerido'),
  pokemonId: yup.number().required('Pokémon requerido') // 👈
});

export const CreateUserForm = () => {
  const { roles, getAllRoles } = useRoleStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateUserDTO>({
    resolver: yupResolver(schema),
    defaultValues: { name: '', email: '', password: '', roleId: 0 }
  });

  useEffect(() => {
    const fetchRoles = async () => {
      await getAllRoles();
    };
    fetchRoles();
  }, [getAllRoles]);

  const onSubmit = async (data: CreateUserDTO) => {
    try {
      await createUser(data);
      alert('Usuario creado con éxito');
      reset();
    } catch (err) {
      alert('Error al crear usuario');
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
            select
            label="Rol"
            fullWidth
            {...field}
            error={!!errors.roleId}
            helperText={errors.roleId?.message}
            margin="normal"
            sx={{ '& .MuiInputBase-root': { backgroundColor: '#fff' } }}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
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
        sx={{
          mt: 3,
          bgcolor: '#E07F3F',
          color: '#fff',
          '&:hover': {
            bgcolor: '#C26C2D',
          },
        }}
      >
        Crear Usuario
      </Button>
    </Box>
  );
};

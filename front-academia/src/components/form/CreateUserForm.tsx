// src/components/forms/CreateUserForm.tsx
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { CustomTextField } from '../shared/CustomTextField';
import { PokemonSelector } from '../pokemon/PokemonSelector';
import { useRoleStore } from '../../store/roleStore';
import { createUser } from '../../services/userService';
import { userSchema } from '../../schemas/userSchema';
import { formBoxStyles, titleStyles, submitButtonStyles } from '../../styles/formStyles';
import type { CreateUserDTO } from '../../types/user';

const sectionOptions = [
  { label: "1ro Sec", value: "1ro Sec" },
  { label: "2do Sec", value: "2do Sec" },
  { label: "3ro Sec", value: "3ro Sec" },
  { label: "4to Sec", value: "4to Sec" },
  { label: "5to Sec", value: "5to Sec" }
];

export const CreateUserForm = () => {
  const { getAllRoles } = useRoleStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateUserDTO>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      roleId: 2,
      pokemonId: undefined,
      section: ''
    }
  });

  useEffect(() => {
    getAllRoles();
  }, [getAllRoles]);

  const onSubmit = async (data: CreateUserDTO) => {
    setLoading(true);
    try {
      await createUser(data);
      await Swal.fire({
        icon: 'success',
        title: '¡Usuario creado!',
        text: 'Cuenta registrada correctamente.',
        confirmButtonColor: '#e07f3f'
      });
      reset();
      navigate('/');
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear usuario',
        text: 'Verifica los datos o intenta más tarde.',
        confirmButtonColor: '#e07f3f'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={formBoxStyles}>
      <Typography variant="h5" align="center" mb={4} sx={titleStyles}>
        CREAR USUARIO
      </Typography>

      <CustomTextField
        name="name"
        control={control}
        label="Nombre"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <CustomTextField
        name="email"
        control={control}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <CustomTextField
        name="password"
        control={control}
        label="Contraseña"
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <CustomTextField
        name="section"
        control={control}
        label="Sección"
        select
        options={sectionOptions}
        error={!!errors.section}
        helperText={errors.section?.message}
      />

      <CustomTextField
        name="roleId"
        control={control}
        label="Rol"
        select
        options={[{ label: 'Alumno', value: 2 }]}
        disabled
        helperText="No se puede modificar"
        error={!!errors.roleId}
      />

      <Controller name="pokemonId" control={control} render={({ field }) => <PokemonSelector field={field} />} />

      <Button type="submit" fullWidth variant="contained" disabled={loading} sx={submitButtonStyles}>
        {loading ? <CircularProgress size={24} color="inherit" /> : 'CREAR USUARIO'}
      </Button>
    </Box>
  );
};

import { Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import type { RoleInput } from '../../types/role';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createRole } from '../../services/roleService';
import { useRoleStore } from '../../store/roleStore';
import { useEffect } from 'react';

const schema = yup.object().shape({
  name: yup.string().required('El nombre del rol es obligatorio'),
});

export const CreateRoleForm = () => {
  const { control, handleSubmit, reset } = useForm<RoleInput>({
    defaultValues: { name: '' },
    resolver: yupResolver(schema),
  });

  const addRole = useRoleStore((state) => state.addRole);
  const getAllRoles = useRoleStore((state) => state.getAllRoles);

  // Cargar roles al montar el componente
  useEffect(() => {
    const fetchRoles = async () => {
      await getAllRoles();
    };
    fetchRoles();
  }, [getAllRoles]);

  const onSubmit = async (data: RoleInput) => {
    try {
      const newRole = await createRole(data);
      addRole(newRole);
      reset();
    } catch (error) {
      console.error('Error al crear rol:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Nombre del rol"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
            margin="normal"
          />
        )}
      />
      <Button type="submit" variant="contained" color="primary">
        Crear Rol
      </Button>
    </form>
  );
};

import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import type { RoleInput } from '../../types/role';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createRole } from '../../services/roleService';
import { useRoleStore } from '../../store/roleStore';
import { useEffect } from 'react';

import CustomTextField from '../shared/CustomTextField';
import { PageHeader, GameCard } from '../common';
import { useResponsive } from '../../shared';

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
  const { isMobile } = useResponsive();

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
    <Box
      sx={{
        py: 5,
        px: 2,
        maxWidth: 'sm',
        mx: 'auto',
        fontFamily: 'Press Start 2P'
      }}
    >
      <PageHeader
        title="CREAR ROL"
        subtitle="Define un nuevo rol en el sistema"
      />
      
      <GameCard>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <CustomTextField
            name="name"
            control={control}
            label="Nombre del rol"
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth
            sx={{
              mt: 3,
              py: 2,
              backgroundColor: 'primary.main',
              fontFamily: 'Press Start 2P',
              fontSize: isMobile ? '0.7rem' : '0.9rem',
              '&:hover': {
                backgroundColor: 'primary.dark',
              }
            }}
          >
            Crear Rol
          </Button>
        </Box>
      </GameCard>
    </Box>
  );
};

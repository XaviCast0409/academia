import { CreateRoleForm } from '../../components/form/CreateRoleForm';
import { useRoleStore } from '../../store/roleStore';
import { Box, Typography, List, ListItem } from '@mui/material';

export const RolesPage = () => {
  const roles = useRoleStore((state) => state.roles);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Gestión de Roles
      </Typography>
      <CreateRoleForm />
      <Typography variant="h6" mt={4}>
        Roles existentes:
      </Typography>
      <List>
        {roles.map((role) => (
          <ListItem key={role.id}>{role.name}</ListItem>
        ))}
      </List>
    </Box>
  );
};

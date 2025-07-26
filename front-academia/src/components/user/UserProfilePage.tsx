import { useEffect } from "react";
import { Container } from "@mui/material";
import { useUserStore } from "../../store/userStore";
import { UserProfileCard } from "./UserProfileCard";
import { UpdateSectionAlert } from './UpdateSectionAlert';
import { WhatsAppAlert } from './WhatsAppAlert';
import { PageHeader, LoadingSpinner } from '../common';
import { getCurrentUser } from '../../shared';

export const UserProfilePage = () => {
  const currentUser = getCurrentUser();
  const { user, getUserById } = useUserStore();

  useEffect(() => {
    if (currentUser?.id) {
      getUserById(currentUser.id);
    }
  }, [getUserById, currentUser]);

  if (!user && currentUser?.id) {
    return <LoadingSpinner message="Cargando perfil de usuario..." />;
  }

  return (
    <Container sx={{ py: 5 }}>
      <PageHeader
        title="Mi Perfil"
        subtitle="Información de tu cuenta y progreso en XaviPlay"
      />
      
      <WhatsAppAlert />
      <UpdateSectionAlert />
      <UserProfileCard user={user} />
    </Container>
  );
};

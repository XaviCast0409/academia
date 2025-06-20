import { useEffect } from "react";
import { Container } from "@mui/material";
import { useUserStore } from "../../store/userStore";
import { UserProfileCard } from "./UserProfileCard";
import { UpdateSectionAlert } from './UpdateSectionAlert';
import { WhatsAppAlert } from './WhatsAppAlert';

export const UserProfilePage = () => {
  const { user, getUserById } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem("auth-storage");
    if (!token) return;
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id;
    getUserById(userId);
  }, [getUserById]);

  return (
    <Container sx={{ mt: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2 } }}>
      <WhatsAppAlert />
      <UpdateSectionAlert />
      <UserProfileCard user={user} />
    </Container>
  );
};

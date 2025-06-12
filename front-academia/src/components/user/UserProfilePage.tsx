import { useEffect } from "react";
import { Container } from "@mui/material";
import { useUserStore } from "../../store/userStore";
import { UserProfileCard } from "./UserProfileCard";

export const UserProfilePage = () => {
  const { user, getUserById } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id;
    getUserById(userId);
  }, [getUserById]);

  return (
    <Container sx={{ mt: 6 }}>
      <UserProfileCard user={user} />
    </Container>
  );
};

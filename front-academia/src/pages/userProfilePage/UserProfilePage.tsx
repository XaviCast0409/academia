import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import { UserProfileCard } from "../../components/userProfileCard/UserProfileCard";
import { useAuthStore } from "../../store/authStore";
import { userService } from "../../services/userService";
import Swal from "sweetalert2";

export const UserProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          navigate("/login");
          return;
        }

        if (!user) {
          const userData = await userService.getCurrentUser();
          useAuthStore.getState().setUser(userData);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar la información del usuario",
          confirmButtonColor: "#e07f3f",
        });
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, user, navigate]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ backgroundColor: "#0D3745" }}
      >
        <CircularProgress sx={{ color: "#E07F3F" }} />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0D3745",
        py: 4,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          color: "#F5E8DC",
          fontFamily: "'Press Start 2P', cursive",
          textAlign: "center",
          mb: 4,
        }}
      >
        Perfil de Usuario
      </Typography>

      {user && <UserProfileCard user={user} />}
    </Container>
  );
}; 
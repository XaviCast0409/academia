import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { authService } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";
import { useState } from "react";

import CustomTextField from "../../components/shared/CustomTextField";
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { GameCard } from '../../components/common/GameCard';
import { useResponsive } from '../../hooks/common/useResponsive';

interface LoginFormInputs {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const { isMobile } = useResponsive();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setLoading(true);
      const response = await authService.login(data.email, data.password);
      
      login(response.token, response.user);
      
      // La redirección se maneja en el ProtectedRoute basado en el rol
      if (response.user.roleId === 1) {
        navigate("/admin");
      } else if (response.user.roleId === 2) {
        navigate("/users/profile");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Correo o contraseña incorrectos.",
        confirmButtonColor: "#e07f3f",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#0D3745",
        fontFamily: "'Press Start 2P', cursive",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <GameCard>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontFamily: "'Press Start 2P', cursive",
              color: "#84341C",
              fontSize: isMobile ? "0.8rem" : "1rem",
              mb: 3,
            }}
          >
            🎮 XaviPlay
          </Typography>

          <Typography
            variant="h5"
            align="center"
            sx={{
              fontFamily: "'Press Start 2P', cursive",
              color: "#84341C",
              fontSize: isMobile ? "0.6rem" : "0.8rem",
              mb: 3,
            }}
          >
            Iniciar Sesión
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <CustomTextField
              name="email"
              control={control}
              label="Correo electrónico"
              type="email"
              rules={{ 
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Ingresa un correo válido"
                }
              }}
            />

            <CustomTextField
              name="password"
              control={control}
              label="Contraseña"
              type="password"
              rules={{ 
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres"
                }
              }}
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                backgroundColor: "#E07F3F",
                color: "#fff",
                fontFamily: "'Press Start 2P', cursive",
                fontSize: isMobile ? "0.5rem" : "0.6rem",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#C76F2F",
                  transform: "scale(1.02)",
                },
                "&:disabled": {
                  backgroundColor: '#C76F2F',
                }
              }}
            >
              {loading ? <LoadingSpinner /> : "INGRESAR"}
            </Button>
          </Box>

          <Box textAlign="center" mt={3}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: isMobile ? "0.4rem" : "0.5rem",
                color: "#84341C",
              }}
            >
              ¿No tienes una cuenta?{" "}
              <Link
                component={RouterLink}
                to="/create-user"
                underline="hover"
                sx={{
                  color: "#0D3745",
                  fontWeight: "bold",
                  fontSize: isMobile ? "0.4rem" : "0.5rem",
                  fontFamily: "'Press Start 2P', cursive",
                  '&:hover': {
                    color: '#E07F3F'
                  }
                }}
              >
                Crear cuenta
              </Link>
            </Typography>
          </Box>
        </GameCard>
      </Box>
    </Box>
  );
};

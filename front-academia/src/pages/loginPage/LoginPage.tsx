import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
  CircularProgress,
} from "@mui/material";
import { loginUser } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";
import { useState } from "react";

interface LoginFormInputs {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false); // ✅ estado para loader

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setLoading(true); // 🔄 muestra el loader
      const token = await loginUser(data);
      login(token);
      const decoded = jwtDecode<{ roleId: number }>(token);
      const roleId = decoded.roleId;

      switch (roleId) {
        case 3:
        case 2:
          navigate("/users/profile");
          break;
        case 1:
          navigate("/admin");
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Correo o contraseña incorrectos.",
        confirmButtonColor: "#e07f3f",
      });
    } finally {
      setLoading(false); // ✅ oculta el loader
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#0d3745" }}
        >
          Iniciar Sesión
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label="Correo electrónico"
            margin="normal"
            {...register("email", { required: "El correo es obligatorio" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            margin="normal"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <Link
              component={RouterLink}
              to="/forgot-password"
              underline="hover"
              sx={{ fontSize: 14, color: "#84341c" }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={loading} // ❌ desactiva mientras carga
            sx={{
              mt: 3,
              backgroundColor: "#e07f3f",
              "&:hover": {
                backgroundColor: "#c76d32",
              },
              fontWeight: "bold",
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </form>

        <Box textAlign="center" mt={3}>
          <Typography variant="body2">
            ¿No tienes una cuenta?{" "}
            <Link
              component={RouterLink}
              to="/create-user"
              underline="hover"
              sx={{ color: "#0d3745", fontWeight: "bold" }}
            >
              Crear cuenta
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

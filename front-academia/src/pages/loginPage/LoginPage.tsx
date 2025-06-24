import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
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
import { authService } from "../../services/authService";
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
  const [loading, setLoading] = useState(false);

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
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#0D3745",
        fontFamily: "'Press Start 2P', cursive",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          padding: 4,
          width: "100%",
          backgroundColor: "#F5E8DC",
          borderRadius: 4,
          boxShadow: "0px 0px 20px 5px rgba(224, 127, 63, 0.4)",
          border: "4px solid #E07F3F",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontFamily: "'Press Start 2P', cursive",
            color: "#84341C",
            fontSize: "1rem",
          }}
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
            InputLabelProps={{ style: { fontFamily: "'Press Start 2P'" } }}
            inputProps={{ style: { fontFamily: "'Press Start 2P'" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#84341C",
                },
                "&:hover fieldset": {
                  borderColor: "#E07F3F",
                },
              },
            }}
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
            InputLabelProps={{ style: { fontFamily: "'Press Start 2P'" } }}
            inputProps={{ style: { fontFamily: "'Press Start 2P'" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#84341C",
                },
                "&:hover fieldset": {
                  borderColor: "#E07F3F",
                },
              },
            }}
          />

{/*           <Box
            display="flex"
            justifyContent="flex-end"
            mt={1}
            sx={{ fontFamily: "'Press Start 2P'", fontSize: "0.5rem" }}
          >
            <Link
              component={RouterLink}
              to="/forgot-password"
              underline="hover"
              sx={{ color: "#84341C", fontSize: "0.5rem" }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Box> */}

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
              fontSize: "0.6rem",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "#C76F2F",
                transform: "scale(1.02)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "INGRESAR"
            )}
          </Button>
        </form>

        <Box textAlign="center" mt={3}>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "0.5rem",
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
                fontSize: "0.5rem",
              }}
            >
              Crear cuenta
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

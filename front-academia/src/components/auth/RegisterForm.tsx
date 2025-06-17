import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import { authService } from '../../services/authService';
import { VerifyCodeForm } from './VerifyCodeForm';

const sections = [
  { value: 'A', label: 'Sección A' },
  { value: 'B', label: 'Sección B' },
  { value: 'C', label: 'Sección C' },
];

export const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    section: '',
    roleId: 2, // 2 es el ID para usuarios normales
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.register(formData);
      setShowVerification(true);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  if (showVerification) {
    return (
      <VerifyCodeForm
        email={formData.email}
        onVerificationSuccess={() => {
          // Redirigir al login o mostrar mensaje de éxito
          window.location.href = '/login';
        }}
      />
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Registro de usuario
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Nombre"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        required
        disabled={loading}
      />

      <TextField
        fullWidth
        label="Correo electrónico"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        required
        disabled={loading}
      />

      <TextField
        fullWidth
        label="Contraseña"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        margin="normal"
        required
        disabled={loading}
      />

      <TextField
        fullWidth
        select
        label="Sección"
        name="section"
        value={formData.section}
        onChange={handleChange}
        margin="normal"
        required
        disabled={loading}
      >
        {sections.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Registrarse'}
      </Button>
    </Box>
  );
}; 
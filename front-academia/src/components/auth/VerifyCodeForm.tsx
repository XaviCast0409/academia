import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { emailVerificationService } from '../../services/emailVerificationService';

interface VerifyCodeFormProps {
  email: string;
  onVerificationSuccess: () => void;
}

export const VerifyCodeForm: React.FC<VerifyCodeFormProps> = ({
  email,
  onVerificationSuccess,
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions
    setError('');
    setLoading(true);

    try {
      await emailVerificationService.verifyCode(email, code);
      onVerificationSuccess();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al verificar el código');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Verificación de correo electrónico
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Se ha enviado un código de verificación a {email}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Código de verificación"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        margin="normal"
        required
        inputProps={{ maxLength: 5 }}
        disabled={loading}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading || code.length !== 5}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Verificar código'}
      </Button>
    </Box>
  );
}; 
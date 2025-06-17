import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
  Alert,
} from '@mui/material';
import { useState } from 'react';
import ImageCloudinary from '../../components/cloudinary/Image';
import { useEvidenceStore } from '../../store/evidenceStore';
import Swal from 'sweetalert2';
import { useActivityStore } from '../../store/activityStore';

interface FormValues {
  filePath: string[];
}

export const SendEvidence = () => {
  const { id } = useParams();
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { control, handleSubmit } = useForm<FormValues>();
  const [uploaderKey] = useState<number>(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const addEvidence = useEvidenceStore((state) => state.addEvidence);

  const handleImageUpload = (urls: string[]) => {
    setImageLinks(urls);
    setIsUploading(false);
  };

  const onSubmit = async () => {
    if (imageLinks.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'Debes subir al menos una imagen como evidencia.',
        icon: 'error',
        confirmButtonColor: '#E07F3F',
      });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const studentId = payload.id;
    const studentName = payload.name || payload.studentName || "";

    try {
      await addEvidence({
        studentId,
        studentName,
        activityId: Number(id),
        filePath: imageLinks,
        status: 'pending',
      });

      Swal.fire({
        title: '¡Evidencia enviada!',
        text: 'Tu evidencia fue enviada correctamente.',
        icon: 'success',
        confirmButtonColor: '#84341c',
        confirmButtonText: 'OK',
      }).then(() => {
        const lastPage = Number(localStorage.getItem('actividadActualPage')) || 1;
        setTimeout(() => {
          navigate('/users/actividades');
          setTimeout(() => {
            useActivityStore.getState().setPage(lastPage);
          }, 100);
        }, 100);
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo enviar la evidencia. Intenta nuevamente.',
        icon: 'error',
        confirmButtonColor: '#E07F3F',
      });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        p: 3,
        bgcolor: '#fffefc',
        border: '4px solid #0D3745',
        borderRadius: 4,
        boxShadow: '6px 6px 0 #E07F3F',
        fontFamily: `'Press Start 2P', cursive`,
      }}
    >
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{
          mb: 3,
          border: '3px solid #84341c',
          color: '#84341c',
          fontSize: isMobile ? '0.5rem' : '0.65rem',
          fontFamily: `'Press Start 2P', cursive`,
          px: 2,
          py: 1,
          '&:hover': {
            backgroundColor: 'rgba(132, 52, 28, 0.1)',
            borderColor: '#E07F3F',
          },
        }}
      >
        ← Volver
      </Button>
      <Typography
        variant="h5"
        sx={{
          color: '#0D3745',
          fontSize: isMobile ? '0.9rem' : '1.1rem',
          textAlign: 'center',
          mb: 3,
          fontFamily: `'Press Start 2P', cursive`,
        }}
      >
        Subir Evidencia para Actividad #{id}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <Controller
          name="filePath"
          control={control}
          render={() => (
            <ImageCloudinary
              setImageLinks={handleImageUpload}
              resetUploader={uploaderKey}
              maxFiles={5}
              maxFileSize={2 * 1024 * 1024}
              title="Evidencias de la Actividad"
            />
          )}
        />

        {imageLinks.length === 0 && !isUploading && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Debes subir al menos una imagen como evidencia
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={imageLinks.length === 0 || isUploading}
          sx={{
            backgroundColor: '#E07F3F',
            fontFamily: `'Press Start 2P', cursive`,
            fontSize: '0.6rem',
            px: 3,
            py: 1.5,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: '#84341c',
            },
            '&.Mui-disabled': {
              backgroundColor: '#cccccc',
              color: '#666666',
            },
          }}
        >
          {isUploading ? 'Subiendo...' : 'Enviar Evidencia'}
        </Button>
      </Box>
    </Container>
  );
};

import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Alert,
} from '@mui/material';
import { useState } from 'react';
import ImageCloudinary from '../../components/cloudinary/Image';
import { useEvidenceStore } from '../../store/evidenceStore';
import Swal from 'sweetalert2';
import { useActivityStore } from '../../store/activityStore';
import { PageHeader, GameCard } from '../common';
import { useResponsive, getCurrentUser } from '../../shared';

interface FormValues {
  filePath: string[];
}

export const SendEvidence = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const user = getCurrentUser();
  
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { control, handleSubmit } = useForm<FormValues>();
  const [uploaderKey] = useState<number>(0);

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

    if (!user?.id) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo identificar al usuario.',
        icon: 'error',
        confirmButtonColor: '#E07F3F',
      });
      return;
    }

    try {
      await addEvidence({
        studentId: user.id,
        studentName: user.name || user.studentName || "",
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
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <PageHeader
        title={`Subir Evidencia para Actividad #${id}`}
        subtitle="Sube las imágenes que demuestren tu trabajo en esta actividad"
        showBackButton
      />

      <GameCard>
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
            size="large"
            sx={{
              backgroundColor: '#E07F3F',
              fontFamily: `'Press Start 2P', cursive`,
              fontSize: isMobile ? '0.6rem' : '0.8rem',
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
      </GameCard>
    </Container>
  );
};

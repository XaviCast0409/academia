import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import ImageCloudinary from '../../components/cloudinary/Image';
import { useEvidenceStore } from '../../store/evidenceStore';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  filePath: string[];
}

export const SendEvidence = () => {
  const { id } = useParams();
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const { control, handleSubmit } = useForm<FormValues>();
  const [uploaderKey, /* setUploaderKey */] = useState<number>(0);
  const navigate = useNavigate();

  const addEvidence = useEvidenceStore((state) => state.addEvidence);

  const onSubmit = async () => {
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
        confirmButtonColor: 'rgb(132, 52, 28)',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/users/actividades');
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo enviar la evidencia. Intenta nuevamente.',
        icon: 'error',
        confirmButtonColor: 'rgb(224, 127, 63)',
      });
    }
  };


  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Subir Evidencia para Actividad #{id}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="filePath"
          control={control}
          render={() => (
            <ImageCloudinary setImageLinks={setImageLinks} resetUploader={uploaderKey} />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: 'rgb(132, 52, 28)',
            '&:hover': { backgroundColor: 'rgb(13, 55, 69)' },
          }}
        >
          Enviar Evidencia
        </Button>
      </Box>
    </Container>
  );
};

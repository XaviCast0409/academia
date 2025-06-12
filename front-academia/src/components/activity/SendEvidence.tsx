import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import ImageCloudinary from '../../components/cloudinary/Image';
import { useEvidenceStore } from '../../store/evidenceStore';

interface FormValues {
  filePath: string[];
}

export const SendEvidence = () => {
  const { id } = useParams();
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const { control, handleSubmit } = useForm<FormValues>();

  const addEvidence = useEvidenceStore((state) => state.addEvidence);

  const onSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const studentId = payload.id;

    try {
      const studentName = payload.name || payload.studentName || ""; // Adjust according to your token payload structure
      await addEvidence({
        studentId,
        studentName,
        activityId: Number(id),
        filePath: imageLinks,
        status: 'pending',
      });
      alert('Evidencia enviada correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al enviar la evidencia');
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
            <ImageCloudinary setImageLinks={setImageLinks} />
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

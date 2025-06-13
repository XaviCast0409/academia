import { Card, CardContent, CardMedia, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useActivityStore } from '../../store/activityStore';

interface ActivityCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  xavicoints?: number;
}

const ActivityCardStudent = ({ id, title, description, image, xavicoints }: ActivityCardProps) => {
  const navigate = useNavigate();
  const activityById = useActivityStore((state) => state.activityById);

  const handleViewActivity = async () => {
    await activityById(id);
    navigate(`/users/actividades/ver/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: 4, backgroundColor: 'rgb(224, 127, 63)', color: 'white' }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h6">{title}</Typography>
        <Typography variant="body2" color="white">{description}</Typography>
        {xavicoints && (
          <Typography variant="body2" color="white" sx={{ mt: 1 }}>
            <strong>Xavicoints:</strong> {xavicoints}
          </Typography>
        )}

        <Stack direction="column" spacing={1} mt={2}>
          <Button
            variant="contained"
            onClick={() => navigate(`/users/actividades/evidence/${id}`)}
            sx={{ backgroundColor: 'rgb(132, 52, 28)', '&:hover': { backgroundColor: 'rgb(13, 55, 69)' } }}
          >
            Enviar Evidencia
          </Button>
          <Button
            variant="outlined"
            onClick={handleViewActivity}
            sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white' } }}
          >
            Ver Actividad
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ActivityCardStudent;

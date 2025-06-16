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
  const { activityById, page } = useActivityStore();
  const navigate = useNavigate();

const handleViewActivity = async () => {
  localStorage.setItem('actividadActualPage', String(page));
  await activityById(id);
  navigate(`/users/actividades/ver/${id}`);
};

  return (
    <Card
      sx={{
        maxWidth: 360,
        borderRadius: 5,
        bgcolor: '#E07F3F',
        color: 'white',
        border: '4px double #FFCC00',
        boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
        },
        fontFamily: 'Press Start 2P',
      }}
    >
      <CardMedia component="img" height="180" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h6" sx={{ color: '#FFEB3B', fontFamily: 'inherit' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="white" sx={{ mb: 2, fontFamily: 'inherit' }}>
          {description}
        </Typography>
        {xavicoints && (
          <Typography variant="body2" sx={{ mt: 2, fontFamily: 'inherit' }}>
            💰 <strong>Xavicoints:</strong> {xavicoints}
          </Typography>
        )}

        <Stack direction="column" spacing={1} mt={3}>
          <Button
            variant="contained"
            onClick={() => navigate(`/users/actividades/evidence/${id}`)}
            sx={{
              backgroundColor: 'rgb(132, 52, 28)',
              '&:hover': { backgroundColor: 'rgb(13, 55, 69)' },
              fontFamily: 'inherit',
            }}
          >
            Enviar Evidencia
          </Button>
          <Button
            variant="outlined"
            onClick={handleViewActivity}
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': { borderColor: '#FFEB3B', color: '#FFEB3B' },
              fontFamily: 'inherit',
            }}
          >
            Ver Actividad
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ActivityCardStudent;
import { Button, Container, Typography, Grid, Card, CardMedia } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useActivityStore } from '../../store/activityStore';

export const ViewActivityPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activity, activityById } = useActivityStore();

  useEffect(() => {
    if (id) activityById(Number(id));
  }, [id]);

  if (!activity) {
    return <Typography variant="h6">Cargando actividad...</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ mb: 2, borderColor: 'rgb(132, 52, 28)', color: 'rgb(132, 52, 28)', '&:hover': { backgroundColor: 'rgba(132,52,28,0.1)' } }}
      >
        ← Volver
      </Button>

      <Typography variant="h4" gutterBottom>{activity.title}</Typography>
      <Typography variant="subtitle1" gutterBottom>{activity.description}</Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Profesor:</strong> {activity.professor?.name}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        <strong>Xavicoints:</strong> {activity.xavicoints}
      </Typography>

      <Grid container spacing={2}>
        {activity.images?.map((img, idx) => (
          <Grid key={idx}>
            <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                height="200"
                image={img}
                alt={`evidence-${idx}`}
                sx={{ objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => window.open(img, '_blank')} // Ver en grande
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};


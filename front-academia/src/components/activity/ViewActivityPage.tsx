import {
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useActivityStore } from '../../store/activityStore';

export const ViewActivityPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activity, activityById } = useActivityStore();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (id) activityById(Number(id));
  }, [id]);

  if (!activity) {
    return (
      <Typography
        variant="h6"
        sx={{
          fontFamily: `'Press Start 2P', cursive`,
          textAlign: 'center',
          mt: 4,
        }}
      >
        Cargando actividad...
      </Typography>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 6,
        p: isMobile ? 2 : 4,
        bgcolor: '#fffefc',
        border: '5px solid #0D3745',
        borderRadius: 5,
        boxShadow: '8px 8px 0 #E07F3F',
        fontFamily: `'Press Start 2P', cursive`,
      }}
    >
      {/* Botón volver */}
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{
          mb: 4,
          border: '4px solid #84341c',
          color: '#84341c',
          fontSize: isMobile ? '0.7rem' : '1rem',
          px: 3,
          py: 1.5,
          fontFamily: `'Press Start 2P', cursive`,
          '&:hover': {
            backgroundColor: 'rgba(132, 52, 28, 0.1)',
            borderColor: '#E07F3F',
          },
        }}
      >
        ← Volver
      </Button>

      {/* Título */}
      <Typography
        variant="h4"
        sx={{
          color: '#0D3745',
          fontSize: isMobile ? '1.6rem' : '2.2rem',
          fontFamily: "inherit",
          mb: 3,
          textAlign: 'center',
        }}
      >
        {activity.title}
      </Typography>

      {/* Descripción */}
      <Typography
        variant="subtitle1"
        sx={{
          color: '#84341c',
          fontSize: isMobile ? '1rem' : '1.2rem',
          fontFamily: "inherit",
          mb: 3,
          textAlign: 'center',
        }}
      >
        {activity.description}
      </Typography>

      {/* Info adicional */}
      <Typography
        sx={{
          fontSize: isMobile ? '0.9rem' : '1.1rem',
          fontFamily: "inherit",
          mb: 2,
          color: '#0D3745',
          textAlign: 'center',
        }}
      >
        <strong>👨‍🏫 Profesor:</strong> {activity.professor?.name}
      </Typography>

      <Typography
        sx={{
          fontSize: isMobile ? '0.9rem' : '1.1rem',
          mb: 4,
          color: '#E07F3F',
          textAlign: 'center',
          fontFamily: "inherit",
        }}
      >
        <strong>💰 XaviCoins:</strong> {activity.xavicoints}
      </Typography>

      {/* Galería de imágenes */}
      <Grid container spacing={3} justifyContent="center">
        {activity.images?.map((img, idx) => (
          <Grid key={idx}>
            <Card
              sx={{
                borderRadius: 3,
                border: '4px dashed #0D3745',
                boxShadow: '6px 6px 0 #FFCC00',
                bgcolor: '#fffefc',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => window.open(img, '_blank')}
            >
              <CardMedia
                component="img"
                height={isMobile ? 160 : 220}
                image={img}
                alt={`evidence-${idx}`}
                sx={{
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useActivityStore } from '../../store/activityStore';
import { PageHeader, LoadingSpinner, GameCard } from '../common';
import { XavicoinsDisplay } from '../ui';
import { useResponsive } from '../../shared';

export const ViewActivityPage = () => {
  const { id } = useParams();
  const { isMobile } = useResponsive();
  const { activity, activityById } = useActivityStore();

  useEffect(() => {
    if (id) activityById(Number(id));
  }, [id]);

  if (!activity) {
    return <LoadingSpinner message="Cargando actividad..." />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <PageHeader
        title={activity.title}
        subtitle={activity.description}
        showBackButton
      />

      <GameCard>
        {/* Info adicional */}
        <Typography
          sx={{
            fontSize: isMobile ? '0.9rem' : '1.1rem',
            fontFamily: 'Press Start 2P',
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
            fontFamily: 'Press Start 2P',
          }}
        >
          <XavicoinsDisplay amount={activity.xavicoints} />
        </Typography>

        {/* Galería de imágenes */}
        {activity.images && activity.images.length > 0 && (
          <Grid container spacing={3} justifyContent="center">
            {activity.images.map((img, idx) => (
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
        )}
      </GameCard>
    </Container>
  );
};

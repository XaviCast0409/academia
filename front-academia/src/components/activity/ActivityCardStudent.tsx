import { CardContent, CardMedia, Typography, Button, Stack, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useActivityStore } from '../../store/activityStore';
import { GameCard } from '../common';
import { DifficultyBadge, XavicoinsDisplay } from '../ui';

interface ActivityCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  xavicoints?: number;
  difficulty?: string;
  section?: string;
  createdAt?: string;
}

const ActivityCardStudent = ({ 
  id, 
  title, 
  description, 
  image, 
  xavicoints, 
  difficulty, 
  section, 
  createdAt 
}: ActivityCardProps) => {
  const { activityById, page } = useActivityStore();
  const navigate = useNavigate();

  // Función para verificar si la actividad es nueva (creada en los últimos 4 días)
  const isNewActivity = () => {
    if (!createdAt) return false;
    
    const activityDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - activityDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    
    return daysDifference <= 4;
  };

  const handleViewActivity = async () => {
    localStorage.setItem('actividadActualPage', String(page));
    await activityById(id);
    navigate(`/users/actividades/ver/${id}`);
  };

  const handleSendEvidence = () => {
    navigate(`/users/actividades/evidence/${id}`);
  };

  return (
    <GameCard
      hover={true}
    >
      <Box
        sx={{
          maxWidth: 360,
          position: 'relative',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.03)',
          },
        }}
      >
        {/* Badge de dificultad */}
        {difficulty && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 2,
            }}
          >
            <DifficultyBadge difficulty={difficulty as 'beginner' | 'intermediate' | 'advanced' | 'expert'} />
          </Box>
        )}
        
        {/* Indicador de actividad nueva */}
        {isNewActivity() && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              bgcolor: '#FF1744',
              color: '#fff',
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              fontSize: '0.75rem',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              letterSpacing: 1,
              textTransform: 'uppercase',
              zIndex: 2,
              minWidth: 60,
              textAlign: 'center',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                },
                '50%': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 12px rgba(255, 23, 68, 0.5)',
                },
                '100%': {
                  transform: 'scale(1)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                },
              },
            }}
          >
            ¡NUEVO!
          </Box>
        )}
        
        <CardMedia component="img" height="180" image={image} alt={title} />
        
        <CardContent>
          <Typography 
            gutterBottom 
            variant="h6" 
            sx={{ 
              color: '#FFEB3B', 
              fontFamily: 'Press Start 2P', 
              fontSize: '1rem' 
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="white" 
            sx={{ 
              mb: 2, 
              fontFamily: 'Press Start 2P', 
              fontSize: '0.85rem' 
            }}
          >
            {description}
          </Typography>
          
          {section && (
            <Typography 
              variant="body2" 
              color="white" 
              sx={{ 
                mb: 2, 
                fontFamily: 'Press Start 2P', 
                fontSize: '0.85rem' 
              }}
            >
              📚 {section}
            </Typography>
          )}
          
          {xavicoints && (
            <Box sx={{ mb: 2 }}>
              <XavicoinsDisplay amount={xavicoints} />
            </Box>
          )}
          
          <Stack direction="column" spacing={1} mt={3}>
            <Button
              variant="contained"
              onClick={handleSendEvidence}
              sx={{
                backgroundColor: 'rgb(132, 52, 28)',
                '&:hover': { backgroundColor: 'rgb(13, 55, 69)' },
                fontFamily: 'Press Start 2P',
                fontSize: '0.85rem',
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
                fontFamily: 'Press Start 2P',
                fontSize: '0.85rem',
              }}
            >
              Ver Actividad
            </Button>
          </Stack>
        </CardContent>
      </Box>
    </GameCard>
  );
};

export default ActivityCardStudent;

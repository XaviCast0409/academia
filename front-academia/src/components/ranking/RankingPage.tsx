import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Chip,
  CircularProgress,
  Container,
  useMediaQuery,
  useTheme,
  Button,
} from '@mui/material';
import { 
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  LocalFireDepartment as FireIcon,
  MonetizationOn as CoinIcon,
} from '@mui/icons-material';
import { getUsersRanking } from '../../services/userService';
import type { User } from '../../types/user';
import RewardsModal from './RewardsModal';

const RankingPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [rewardsModalOpen, setRewardsModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    loadRanking();
  }, [selectedSection]);

  const loadRanking = async () => {
    try {
      setLoading(true);
      const sectionParam = selectedSection === '' ? undefined : selectedSection;
      const rankingData = await getUsersRanking(sectionParam);
      setUsers(rankingData);
    } catch (error) {
      console.error('Error loading ranking:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankingIcon = (position: number) => {
    switch (position) {
      case 1:
        return <TrophyIcon sx={{ color: '#FFD700', fontSize: isMobile ? 30 : 40 }} />;
      case 2:
        return <TrophyIcon sx={{ color: '#C0C0C0', fontSize: isMobile ? 25 : 35 }} />;
      case 3:
        return <TrophyIcon sx={{ color: '#CD7F32', fontSize: isMobile ? 20 : 30 }} />;
      default:
        return <StarIcon sx={{ color: '#E07F3F', fontSize: isMobile ? 18 : 25 }} />;
    }
  };

  const getRankingColor = (position: number) => {
    switch (position) {
      case 1:
        return '#FFD700';
      case 2:
        return '#C0C0C0';
      case 3:
        return '#CD7F32';
      default:
        return '#E07F3F';
    }
  };
  const sections = [
    { value: '', label: 'Todas las secciones' },
    { value: '1ro Sec', label: '1ro Secundaria' },
    { value: '2do Sec', label: '2do Secundaria' },
    { value: '3ro Sec', label: '3ro Secundaria' },
    { value: '4to Sec', label: '4to Secundaria' },
    { value: '5to Sec', label: '5to Secundaria' },
  ];

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress sx={{ color: '#0D3745' }} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={4}
        flexDirection={isMobile ? 'column' : 'row'}
        gap={2}
      >
        <Typography
          variant="h5"
          sx={{ 
            fontWeight: 600, 
            color: '#0D3745', 
            textAlign: isMobile ? 'center' : 'left',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <TrendingUpIcon sx={{ color: '#E07F3F' }} />
          🏆 Ranking de Estudiantes
        </Typography>
      </Box>

      <Typography
        variant="subtitle1"
        sx={{ 
          textAlign: 'center', 
          color: '#84341C',
          mb: 4,
          fontWeight: 500
        }}
      >
        Los 20 estudiantes con los niveles más altos
      </Typography>

      {/* Botón de recompensas */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<TrophyIcon />}
          onClick={() => setRewardsModalOpen(true)}
          sx={{
            borderColor: '#E07F3F',
            color: '#E07F3F',
            fontWeight: 600,
            px: 3,
            py: 1,
            '&:hover': {
              borderColor: '#84341C',
              backgroundColor: '#E07F3F',
              color: 'white',
            },
          }}
        >
          Ver Recompensas Mensuales
        </Button>
      </Box>

      {/* Filtro por sección */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel>Filtrar por sección</InputLabel>
          <Select
            value={selectedSection}
            label="Filtrar por sección"
            onChange={(e) => setSelectedSection(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#0D3745',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#84341C',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#84341C',
              },
            }}
          >
            {sections.map((section) => (
              <MenuItem key={section.value} value={section.value}>
                {section.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        {selectedSection && (
          <Box display="flex" alignItems="center" gap={1}>
            <SchoolIcon sx={{ color: '#1976d2', fontSize: '1rem' }} />
            <Typography
              variant="body2"
              sx={{
                color: '#1976d2',
                fontWeight: 600,
                fontSize: isMobile ? '0.85rem' : '0.9rem'
              }}
            >
              Mostrando estudiantes de: <strong>{selectedSection}</strong>
            </Typography>
          </Box>
        )}
      </Box>

      {/* Lista de ranking */}
      <Box>
        {users.map((user, index) => (
          <Box
            key={user.id}
            sx={{
              px: isMobile ? 1 : 3,
              py: isMobile ? 1.5 : 2.5,
              mb: 2,
              bgcolor: '#fdfdfd',
              border: index < 3 ? `3px solid ${getRankingColor(index + 1)}` : '2px solid #E07F3F',
              borderRadius: 3,
              boxShadow: '0px 4px 16px rgba(13,55,69,0.10)',
              transition: 'transform 0.15s',
              background: index < 3 ? 'linear-gradient(135deg, #fdfdfd 0%, #f8f8f8 100%)' : '#fdfdfd',
              '&:hover': {
                backgroundColor: '#f8f8f8',
                transform: 'scale(1.02)',
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "flex-start" : "center",
                justifyContent: "space-between",
                gap: 2,
                flexWrap: "wrap"
              }}
            >
              {/* Posición y icono */}
              <Box display="flex" alignItems="center" sx={{ minWidth: isMobile ? 'auto' : 80 }}>
                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                  {getRankingIcon(index + 1)}
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: getRankingColor(index + 1),
                    fontSize: isMobile ? '1.1rem' : '1.25rem'
                  }}
                >
                  #{index + 1}
                </Typography>
              </Box>

              {/* Avatar del usuario */}
              <Avatar 
                sx={{ 
                  width: isMobile ? 50 : 56, 
                  height: isMobile ? 50 : 56, 
                  mr: 2,
                  bgcolor: 'transparent',
                  border: '2px solid #0D3745',
                  boxShadow: '0 2px 8px rgba(224,127,63,0.20)',
                }}
              >
                {user.pokemon?.imageUrl ? (
                  <img 
                    src={user.pokemon.imageUrl} 
                    alt={user.pokemon.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: '#E07F3F',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: isMobile ? '1.2rem' : '1.5rem',
                    }}
                  >
                    ?
                  </Box>
                )}
              </Avatar>

              {/* Información del usuario */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Typography 
                    fontWeight={700} 
                    fontSize={isMobile ? "1rem" : "1.15rem"} 
                    color="#0D3745" 
                    noWrap
                  >
                    {user.name}
                  </Typography>
                </Box>

                {user.pokemon && (
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Box
                      component="img"
                      src={user.pokemon.imageUrl}
                      alt={user.pokemon.name}
                      sx={{
                        width: 20,
                        height: 20,
                        objectFit: 'cover',
                        borderRadius: '50%',
                        border: '1px solid #E07F3F',
                      }}
                    />
                    <Typography 
                      variant="body2" 
                      color="#E07F3F"
                      sx={{ fontWeight: 600, fontSize: isMobile ? '0.85rem' : '0.9rem' }}
                    >
                      {user.pokemon.name}
                    </Typography>
                  </Box>
                )}

                {user.section && (
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <SchoolIcon sx={{ color: "#1976d2", fontSize: '1rem' }} />
                    <Chip 
                      label={user.section} 
                      size="small" 
                      sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.75rem'
                      }}
                    />
                  </Box>
                )}
              </Box>

              {/* Estadísticas */}
              <Box 
                display="flex" 
                gap={isMobile ? 1 : 2} 
                alignItems="center"
                sx={{
                  flexDirection: isMobile ? 'row' : 'row',
                  flexWrap: 'wrap',
                  justifyContent: isMobile ? 'space-between' : 'flex-end',
                  width: isMobile ? '100%' : 'auto'
                }}
              >
                <Box textAlign="center">
                  <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
                    <FireIcon sx={{ color: '#E07F3F', fontSize: '1rem' }} />
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: '#E07F3F',
                        fontSize: isMobile ? '1rem' : '1.25rem'
                      }}
                    >
                      {user.level || 0}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontSize: '0.7rem', fontWeight: 600 }}
                  >
                    Nivel
                  </Typography>
                </Box>
                
                <Box textAlign="center">
                  <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
                    <StarIcon sx={{ color: '#4caf50', fontSize: '1rem' }} />
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: '#4caf50',
                        fontSize: isMobile ? '1rem' : '1.25rem'
                      }}
                    >
                      {user.experience || 0}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontSize: '0.7rem', fontWeight: 600 }}
                  >
                    Experiencia
                  </Typography>
                </Box>
                
                <Box textAlign="center">
                  <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
                    <CoinIcon sx={{ color: '#FFD700', fontSize: '1rem' }} />
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: '#FFD700',
                        fontSize: isMobile ? '1rem' : '1.25rem'
                      }}
                    >
                      {user.xavicoints || 0}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontSize: '0.7rem', fontWeight: 600 }}
                  >
                    Xavicoints
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {users.length === 0 && (
        <Box textAlign="center" sx={{ py: 4 }}>
          <Typography variant="h6" sx={{ color: '#84341C', fontWeight: 600 }}>
            No se encontraron estudiantes para mostrar
          </Typography>
        </Box>
      )}

      {/* Modal de recompensas */}
      <RewardsModal
        open={rewardsModalOpen}
        onClose={() => setRewardsModalOpen(false)}
      />
    </Container>
  );
};

export default RankingPage; 
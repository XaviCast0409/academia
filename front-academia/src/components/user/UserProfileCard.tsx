import {
  Typography,
  Avatar,
  Box,
  Chip,
  Divider,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import type { User } from "../../types/user";
import { EXPERIENCE_REQUIREMENTS } from "../../utils/contants";
import { formatNumber } from "../../utils/uitls";
import { GameCard } from '../common';
import { XavicoinsDisplay } from '../ui';
import { useResponsive } from '../../shared';

interface Props {
  user: User;
}

export const UserProfileCard = ({ user }: Props) => {
  const { isMobile } = useResponsive();

  // Calcular el progreso para la barra
  const currentLevel = user.level || 1;
  const currentExperience = user.experience || 0;
  const nextLevel = currentLevel + 1;
  const experienceForNextLevel = EXPERIENCE_REQUIREMENTS[nextLevel as keyof typeof EXPERIENCE_REQUIREMENTS] || 0;
  const experienceForCurrentLevel = EXPERIENCE_REQUIREMENTS[currentLevel as keyof typeof EXPERIENCE_REQUIREMENTS] || 0;
  const progress = experienceForNextLevel
    ? ((currentExperience - experienceForCurrentLevel) / (experienceForNextLevel - experienceForCurrentLevel)) * 100
    : 100;

  return (
    <GameCard hover={true}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #E07F3F, #84341C)",
          color: "#fff",
          borderRadius: 2,
          maxWidth: "100%",
          mx: "auto",
          px: { xs: 1, sm: 2, md: 3 },
          py: { xs: 2, sm: 3, md: 4 },
          border: "4px solid #FFCC00",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            gap: { xs: 2, sm: 3 },
            width: "100%",
          }}
        >
          {/* Avatar Section */}
          <Box 
            sx={{ 
              textAlign: "center",
              flexShrink: 0,
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            <Avatar
              src={user.pokemon?.highResImageUrl}
              alt={user.name}
              sx={{
                width: { xs: 80, sm: 120, md: 140 },
                height: { xs: 80, sm: 120, md: 140 },
                mx: "auto",
                border: "4px solid #FFCC00",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
            <Chip
              label={user.pokemon?.name ? `Pokémon: ${user.pokemon.name}` : "Sin Pokémon"}
              icon={<CatchingPokemonIcon />}
              sx={{
                mt: 1,
                bgcolor: "#0D3745",
                color: "#fff",
                fontWeight: "bold",
                fontFamily: "'Press Start 2P', cursive",
                fontSize: { xs: "0.4rem", sm: "0.5rem" },
                height: { xs: 24, sm: 28 },
                maxWidth: { xs: "200px", sm: "250px" },
                "& .MuiChip-icon": {
                  color: "#FFCC00",
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                },
                "& .MuiChip-label": {
                  px: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
              }}
            />
          </Box>

          {/* Info Section */}
          <Box 
            sx={{ 
              textAlign: { xs: "center", sm: "left" },
              bgcolor: "rgba(13, 55, 69, 0.1)",
              borderRadius: 2,
              p: { xs: 2, sm: 3 },
              width: { xs: "100%", sm: "auto" },
              flex: 1,
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              gutterBottom
              sx={{
                color: "#FFCC00",
                textShadow: "2px 2px #0D3745",
                fontFamily: "'Press Start 2P', cursive",
                fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" },
                mb: 2,
                wordBreak: "break-word",
              }}
            >
              {user.name}
            </Typography>

            <Divider sx={{ my: 2, borderColor: "#FFCC00", opacity: 0.7 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: { xs: "0.4rem", sm: "0.5rem", md: "0.6rem" },
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: { xs: "center", sm: "flex-start" },
                  flexWrap: "wrap",
                }}
              >
                <EmailIcon sx={{ color: "#FFCC00", fontSize: { xs: "0.8rem", sm: "1rem" } }} />
                <Tooltip title={user.email} arrow placement="top">
                  <Box
                    component="span"
                    sx={{
                      maxWidth: { xs: "120px", sm: "160px", md: "200px" },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      display: "inline-block"
                    }}
                  >
                    {user.email}
                  </Box>
                </Tooltip>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: { xs: "0.4rem", sm: "0.5rem", md: "0.6rem" },
                  textAlign: { xs: "center", sm: "left" },
                  wordBreak: "break-word",
                }}
              >
                Rol: <strong style={{ color: "#FFCC00" }}>{user.role?.name || "Sin rol"}</strong>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: { xs: "0.4rem", sm: "0.5rem", md: "0.6rem" },
                  textAlign: { xs: "center", sm: "left" },
                  wordBreak: "break-word",
                }}
              >
                Sección: <strong style={{ color: "#FFCC00" }}>{user.section || "Sin sección"}</strong>
              </Typography>

              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: { xs: "0.4rem", sm: "0.5rem", md: "0.6rem" },
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: { xs: "center", sm: "flex-start" },
                    mb: 1.5,
                  }}
                >
                  <EmojiEventsIcon sx={{ color: "#FFCC00", fontSize: { xs: "0.9rem", sm: "1rem" } }} />
                  Nivel: <strong style={{ color: "#FFCC00" }}>{currentLevel}</strong>
                </Typography>

                <Box sx={{ 
                  position: 'relative',
                  bgcolor: 'rgba(0,0,0,0.2)',
                  borderRadius: '4px',
                  height: { xs: '20px', sm: '24px' },
                  overflow: 'hidden',
                  border: '2px solid #FFCC00',
                  width: '100%',
                }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={progress}
                    sx={{
                      height: '100%',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(13, 55, 69, 0.3)',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #FFCC00, #FFA500)',
                        boxShadow: '0 0 10px #FFCC00',
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: '#fff',
                      textShadow: '1px 1px 2px #000',
                      fontFamily: "'Press Start 2P', cursive",
                      fontSize: { xs: '0.3rem', sm: '0.35rem' },
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      letterSpacing: '0.5px',
                      padding: '0 4px',
                      zIndex: 1,
                    }}
                  >
                    {formatNumber(currentExperience)} / {formatNumber(experienceForNextLevel)} XP
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", sm: "flex-start" } }}>
                <XavicoinsDisplay amount={user.xavicoints ?? 0} size="small" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </GameCard>
  );
};

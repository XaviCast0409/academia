import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  useMediaQuery,
  useTheme,
  Box,
  Chip,
  Divider,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EmailIcon from "@mui/icons-material/Email";
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import type { User } from "../../types/user";
import { EXPERIENCE_REQUIREMENTS } from "../../utils/contants";
import { formatNumber } from "../../utils/uitls";
interface Props {
  user: User;
}

export const UserProfileCard = ({ user }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

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
    <Card
      sx={{
        background: "linear-gradient(135deg, #E07F3F, #84341C)",
        color: "#fff",
        borderRadius: { xs: 2, sm: 4, md: 6 },
        boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
        maxWidth: isMobile ? "100%" : isTablet ? 800 : 1000,
        mx: "auto",
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 2, sm: 3, md: 4 },
        border: "4px solid #FFCC00",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 6 }}
          direction={isMobile ? "column" : "row"}
          alignItems="center"
          justifyContent="center"
        >
          <Grid>
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                src={user.pokemon?.highResImageUrl}
                alt={user.name}
                sx={{
                  width: { xs: 120, sm: 180, md: 220 },
                  height: { xs: 120, sm: 180, md: 220 },
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
                label={`Pokémon: ${user.pokemon?.name || "Ninguno"}`}
                icon={<CatchingPokemonIcon />}
                sx={{
                  mt: 2,
                  bgcolor: "#0D3745",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                  height: { xs: 28, sm: 32, md: 36 },
                  "& .MuiChip-icon": {
                    color: "#FFCC00",
                  },
                }}
              />
            </Box>
          </Grid>

          <Grid>
            <Box 
              sx={{ 
                textAlign: isMobile ? "center" : "left",
                p: { xs: 2, sm: 3 },
                bgcolor: "rgba(13, 55, 69, 0.1)",
                borderRadius: 2,
                mt: { xs: 2, sm: 0 },
                width: { xs: "100%", sm: "400px", md: "500px" },
              }}
            >
              <Typography
                variant={isMobile ? "h5" : "h4"}
                gutterBottom
                sx={{
                  color: "#FFCC00",
                  textShadow: "2px 2px #0D3745",
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
                  mb: 2,
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
                    fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem" },
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: isMobile ? "center" : "flex-start"
                  }}
                >
                  <EmailIcon sx={{ color: "#FFCC00", fontSize: { xs: "0.9rem", sm: "1rem" } }} />
                  <Tooltip title={user.email} arrow placement="top">
                    <Box
                      component="span"
                      sx={{
                        maxWidth: { xs: "150px", sm: "200px", md: "250px" },
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
                    fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem" },
                    textAlign: isMobile ? "center" : "left",
                  }}
                >
                  Rol: <strong style={{ color: "#FFCC00" }}>{user.role?.name || "Sin rol"}</strong>
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem" },
                    textAlign: isMobile ? "center" : "left",
                  }}
                >
                  Sección: <strong style={{ color: "#FFCC00" }}>{user.section || "Sin sección"}</strong>
                </Typography>

                <Box sx={{ mt: 2, mb: 2 }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontFamily: "'Press Start 2P', cursive",
                      fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      justifyContent: isMobile ? "center" : "flex-start",
                      mb: 1.5,
                    }}
                  >
                    <EmojiEventsIcon sx={{ color: "#FFCC00", fontSize: { xs: "1rem", sm: "1.1rem" } }} />
                    Nivel: <strong style={{ color: "#FFCC00" }}>{currentLevel}</strong>
                  </Typography>

                  <Box sx={{ 
                    position: 'relative',
                    bgcolor: 'rgba(0,0,0,0.2)',
                    borderRadius: '4px',
                    height: '24px',
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
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
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

                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem" },
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: isMobile ? "center" : "flex-start",
                  }}
                >
                  <MonetizationOnIcon sx={{ color: "#FFCC00", fontSize: { xs: "0.9rem", sm: "1rem" } }} />
                  Xavicoins: <strong style={{ color: "#FFCC00" }}>{user.xavicoints ?? 0}</strong>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

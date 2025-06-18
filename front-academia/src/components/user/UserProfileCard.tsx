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
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EmailIcon from "@mui/icons-material/Email";
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import type { User } from "../../types/user";

interface Props {
  user: User;
}

export const UserProfileCard = ({ user }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      sx={{
        background: "linear-gradient(135deg, #E07F3F, #84341C)",
        color: "#fff",
        borderRadius: { xs: 2, sm: 4, md: 6 },
        boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
        maxWidth: isMobile ? "100%" : isTablet ? 800 : 1000,
        mx: "auto",
        px: { xs: 1, sm: 3, md: 4 },
        py: { xs: 2, sm: 3, md: 4 },
        border: "4px solid #FFCC00",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
        },
      }}
    >
      <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
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
                  width: { xs: 100, sm: 150, md: 200 },
                  height: { xs: 100, sm: 150, md: 200 },
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
                  fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem" },
                  height: { xs: 24, sm: 28, md: 32 },
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
                p: { xs: 1, sm: 2 },
                bgcolor: "rgba(13, 55, 69, 0.1)",
                borderRadius: 2,
                mt: { xs: 1, sm: 0 },
              }}
            >
              <Typography
                variant={isMobile ? "h5" : "h4"}
                gutterBottom
                sx={{
                  color: "#FFCC00",
                  textShadow: "2px 2px #0D3745",
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem" },
                  mb: 2,
                }}
              >
                {user.name}
              </Typography>

              <Divider sx={{ my: 1.5, borderColor: "#FFCC00", opacity: 0.7 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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

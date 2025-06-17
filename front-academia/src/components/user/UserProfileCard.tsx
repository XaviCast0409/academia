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
        borderRadius: 6,
        boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
        maxWidth: isMobile ? 360 : isTablet ? 800 : 1000,
        mx: "auto",
        mt: { xs: 3, sm: 4, md: 6 },
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 2, sm: 3, md: 4 },
        border: "5px solid #FFCC00",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
        },
      }}
    >
      <CardContent>
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
                  width: { xs: 150, sm: 200, md: 280 },
                  height: { xs: 150, sm: 200, md: 280 },
                  mx: "auto",
                  border: "6px solid #FFCC00",
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
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  height: { xs: 32, sm: 36, md: 40 },
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
                p: { sm: 2 },
                bgcolor: "rgba(13, 55, 69, 0.1)",
                borderRadius: 2,
              }}
            >
              <Typography
                variant={isMobile ? "h5" : "h4"}
                gutterBottom
                sx={{
                  color: "#FFCC00",
                  textShadow: "2px 2px #0D3745",
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
                  mb: 2,
                }}
              >
                {user.name}
              </Typography>

              <Divider sx={{ my: 2, borderColor: "#FFCC00", opacity: 0.7 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontFamily: "'Press Start 2P', cursive", 
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <EmailIcon sx={{ color: "#FFCC00" }} /> {user.email}
                </Typography>

                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontFamily: "'Press Start 2P', cursive", 
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  }}
                >
                  Rol: <strong style={{ color: "#FFCC00" }}>{user.role?.name || "Sin rol"}</strong>
                </Typography>

                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontFamily: "'Press Start 2P', cursive", 
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  }}
                >
                  Sección: <strong style={{ color: "#FFCC00" }}>{user.section || "Sin sección"}</strong>
                </Typography>

                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <MonetizationOnIcon sx={{ color: "#FFCC00" }} />
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

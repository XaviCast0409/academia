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

  return (
    <Card
      sx={{
        background: "linear-gradient(135deg, #E07F3F, #84341C)",
        color: "#fff",
        borderRadius: 6,
        boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
        maxWidth: isMobile ? 360 : 1000,
        mx: "auto",
        mt: 6,
        px: isMobile ? 2 : 6,
        border: "5px solid #FFCC00",
      }}
    >
      <CardContent>
        <Grid
          container
          spacing={4}
          direction={isMobile ? "column" : "row"}
          alignItems="center"
          justifyContent="center"
        >
          <Grid textAlign="center">
            <Avatar
              src={user.pokemon?.highResImageUrl}
              alt={user.name}
              sx={{
                width: isMobile ? 180 : 280,
                height: isMobile ? 180 : 280,
                mx: "auto",
                border: "6px solid #FFCC00",
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
              }}
            />
          </Grid>

          <Grid>
            <Box sx={{ textAlign: isMobile ? "center" : "left" }}>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                gutterBottom
                sx={{
                  color: "#FFCC00",
                  textShadow: "2px 2px #0D3745",
                  fontFamily: "'Press Start 2P', cursive",
                }}
              >
                {user.name}
              </Typography>

              <Divider sx={{ my: 2, borderColor: "#FFCC00" }} />

              <Typography variant="body1" sx={{ mb: 2, fontFamily: "'Press Start 2P', cursive", fontSize: isMobile ? "0.9rem" : "1rem" }}>
                <EmailIcon sx={{ mr: 1 }} /> {user.email}
              </Typography>

              <Typography variant="body1" sx={{ mb: 2, fontFamily: "'Press Start 2P', cursive", fontSize: isMobile ? "0.9rem" : "1rem" }}>
                Rol: <strong>{user.role?.name || "Sin rol"}</strong>
              </Typography>

              <Typography variant="body1" sx={{ mb: 2, fontFamily: "'Press Start 2P', cursive" , fontSize: isMobile ? "0.9rem" : "1rem", }}>
                <MonetizationOnIcon sx={{ mr: 1 }} />
                Xavicoins: <strong>{user.xavicoints ?? 0}</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

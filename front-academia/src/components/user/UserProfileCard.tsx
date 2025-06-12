import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EmailIcon from "@mui/icons-material/Email";
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
        backgroundColor: "#FF573B",
        color: "#fff",
        borderRadius: 4,
        boxShadow: 6,
        maxWidth: isMobile ? 350 : 900,
        mx: "auto",
        mt: 4,
        height: isMobile ? "auto" : "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: isMobile ? 2 : 6,
      }}
    >
      <CardContent sx={{ width: "100%" }}>
        <Grid
          container
          spacing={isMobile ? 2 : 6}
          direction={isMobile ? "column" : "row"}
          alignItems="center"
          justifyContent="center"
        >
          <Grid textAlign="center">
            <Avatar
              src={user.pokemon?.highResImageUrl}
              alt={user.name}
              sx={{
                width: isMobile ? 150 : 400,
                height: isMobile ? 150 : 400,
                mx: "auto",
                border: "5px solid #FFCC00",
              }}
            />
          </Grid>

          <Grid textAlign={isMobile ? "left" : "center"}>
            <Typography variant={isMobile ? "h5" : "h3"} gutterBottom>
              {user.name}
            </Typography>

            <Typography variant={isMobile ? "body1" : "h6"} gutterBottom>
              <EmailIcon sx={{ mr: 1 }} />
              {user.email}
            </Typography>

            <Typography variant={isMobile ? "body1" : "h6"} gutterBottom>
              Rol: <strong>{user.role?.name || "Sin rol"}</strong>
            </Typography>

            <Typography variant={isMobile ? "body1" : "h6"} gutterBottom>
              Pokémon Asignado:{" "}
              <strong>{user.pokemon?.name || "Ninguno"}</strong>
            </Typography>

            <Typography variant={isMobile ? "body1" : "h6"} gutterBottom>
              <MonetizationOnIcon sx={{ mr: 1 }} />
              Xavicoins: <strong>{user.xavicoints ?? 0}</strong>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

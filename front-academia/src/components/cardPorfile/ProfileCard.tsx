import { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  Chip,
  Box,
  Grid
} from "@mui/material";
// import Grid from "@mui/material/Grid";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { useUserStore } from "../../store/userStore";

interface Props {
  userId: string;
}

const ProfileCard: React.FC<Props> = ({ userId }) => {
  const { user, getUserById } = useUserStore();

  useEffect(() => {
    getUserById(userId);
  }, [userId]);

  if (!user?.id) return <Typography>Loading...</Typography>;

  return (
    <Card
      sx={{ maxWidth: 500, m: "auto", p: 2, borderRadius: 4, boxShadow: 6 }}
    >
      <CardContent>
        <Grid container justifyContent="center" alignItems="center">
          <Avatar
            sx={{ width: 56, height: 56, bgcolor: "primary.main" }}
            variant="rounded"
          >
            <SportsEsportsIcon />
          </Avatar>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
          <Chip
            label={`Role ID: ${user.roleId}`}
            color="secondary"
            size="small"
            sx={{ mt: 1 }}
          />
        </Grid>

        <Box mt={3}>
          <Typography variant="subtitle1">Nivel</Typography>
          <LinearProgress
            variant="determinate"
            value={70}
            sx={{ borderRadius: 2, height: 10 }}
          />
        </Box>

        <Box mt={2}>
          <Typography variant="subtitle1">Salud</Typography>
          <LinearProgress
            color="error"
            variant="determinate"
            value={90}
            sx={{ borderRadius: 2, height: 10 }}
          />
        </Box>

        <Box mt={2}>
          <Typography variant="subtitle1">Mana</Typography>
          <LinearProgress
            color="info"
            variant="determinate"
            value={60}
            sx={{ borderRadius: 2, height: 10 }}
          />
        </Box>

        <Box mt={3}>
          <Typography variant="caption" color="text.secondary">
            Creado: {new Date(user.createdAt || "").toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;

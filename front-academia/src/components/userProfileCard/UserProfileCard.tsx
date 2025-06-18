import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import type { User } from "../../types/user";

interface UserProfileCardProps {
  user: User;
}

export const UserProfileCard = ({ user }: UserProfileCardProps) => {
  return (
    <Card
      sx={{
        maxWidth: 600,
        mx: "auto",
        backgroundColor: "#F5E8DC",
        borderRadius: 4,
        boxShadow: "0px 0px 20px 5px rgba(224, 127, 63, 0.4)",
        border: "4px solid #E07F3F",
      }}
    >
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          p={2}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: "#E07F3F",
              fontSize: "2rem",
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </Avatar>

          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontFamily: "'Press Start 2P', cursive",
              color: "#84341C",
              textAlign: "center",
            }}
          >
            {user.name}
          </Typography>

          <Box
            sx={{
              width: "100%",
              mt: 2,
              p: 2,
              backgroundColor: "#fff",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Press Start 2P', cursive",
                color: "#0D3745",
                fontSize: "0.8rem",
                mb: 1,
              }}
            >
              Email: {user.email}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Press Start 2P', cursive",
                color: "#0D3745",
                fontSize: "0.8rem",
                mb: 1,
              }}
            >
              Rol: {user.roleId === 1 ? "Administrador" : "Usuario"}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Press Start 2P', cursive",
                color: "#0D3745",
                fontSize: "0.8rem",
              }}
            >
              Estado: {user.isActive ? "Activo" : "Inactivo"}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}; 
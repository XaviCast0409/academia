import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "mui-image";
import type { Activity } from "../../types/activity";

interface Props {
  activity: Activity;
  onDelete: () => void;
}

export const ActivityCard = ({ activity, onDelete }: Props) => {
  return (
    <Card sx={{ width: 345, bgcolor: "white", border: "2px solid #0D3745", borderRadius: 3 }}>
      <Image
        src={activity.images?.[0] || "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png"}
        height="150px"
        duration={0}
        fit="contain"
        style={{ backgroundColor: "#F5F5F5" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {activity.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {activity.description}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1, color: "#E07F3F" }}>
          xavicoints {activity.xavicoints}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<DeleteIcon />} onClick={onDelete} color="error">
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
};
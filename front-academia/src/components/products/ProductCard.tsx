import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Image from 'mui-image';
import type { Product } from '../../types/products';

interface Props {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export const ProductCard = ({ product, onEdit, onDelete }: Props) => {
  return (
    <Card sx={{ width: 345, bgcolor: 'white', border: '2px solid #0D3745', borderRadius: 3 }}>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/500px-Pokebola-pokeball-png-0.png"
        height="150px"
        duration={0}
        fit="contain"
        style={{ backgroundColor: '#F5F5F5' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1, color: '#E07F3F' }}>
          Xavicoins {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<EditIcon />} onClick={onEdit} color="warning">
          Editar
        </Button>
        <Button size="small" startIcon={<DeleteIcon />} onClick={onDelete} color="error">
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
};
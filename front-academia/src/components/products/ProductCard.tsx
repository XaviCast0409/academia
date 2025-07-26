import { Typography, Button, CardActions, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Image from 'mui-image';
import type { Product } from '../../types/products';
import { GameCard } from '../common';
import { XavicoinsDisplay } from '../ui';
import { useResponsive } from '../../shared';

interface Props {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export const ProductCard = ({ product, onEdit, onDelete }: Props) => {
  const { isMobile } = useResponsive();

  return (
    <Box sx={{ width: { xs: 300, sm: 345 } }}>
      <GameCard hover={true}>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/500px-Pokebola-pokeball-png-0.png"
          height="150px"
          duration={0}
          fit="contain"
          style={{ backgroundColor: '#F5F5F5' }}
        />
        <Box sx={{ p: 2 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div"
            sx={{
              fontFamily: "'Press Start 2P', cursive",
              fontSize: { xs: '0.8rem', sm: '1rem' },
              color: '#0D3745'
            }}
          >
            {product.name}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.7rem', sm: '0.875rem' },
              mb: 2
            }}
          >
            {product.description}
          </Typography>
          <XavicoinsDisplay amount={product.price} />
        </Box>
        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          <Button 
            size={isMobile ? "small" : "medium"} 
            startIcon={<EditIcon />} 
            onClick={onEdit} 
            color="warning"
            sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}
          >
            Editar
          </Button>
          <Button 
            size={isMobile ? "small" : "medium"} 
            startIcon={<DeleteIcon />} 
            onClick={onDelete} 
            color="error"
            sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}
          >
            Eliminar
          </Button>
        </CardActions>
      </GameCard>
    </Box>
  );
};
import {
  Typography,
  Button,
  CardActions,
  Box,
  Tooltip,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarsIcon from '@mui/icons-material/Stars';
import Image from 'mui-image';
import type { Product } from '../../types/products';
import { GameCard } from '../common';
import { useResponsive } from '../../shared';

interface Props {
  product: Product;
  mode: 'edit' | 'buy';
  onEdit?: () => void;
  onDelete?: () => void;
  onBuy?: () => void;
}

export const ProductUserCard = ({ product, mode, onBuy }: Props) => {
  const { isMobile } = useResponsive();

  return (
    <Box sx={{ width: isMobile ? 250 : 300 }}>
      <GameCard
        hover={true}
      >
        {/* Imagen superior */}
        <Box
          sx={{
            bgcolor: '#E07F3F',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            borderBottom: '3px dashed #84341c',
            p: 1,
          }}
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/500px-Pokebola-pokeball-png-0.png"
            height={isMobile ? '100px' : '130px'}
            duration={0}
            fit="contain"
            style={{ backgroundColor: 'transparent' }}
          />
        </Box>

        {/* Contenido de texto */}
        <Box sx={{ px: 2, py: 1, textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: isMobile ? '0.75rem' : '0.9rem',
              color: '#0D3745',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontFamily: `'Press Start 2P', cursive`,
            }}
          >
            <StarsIcon sx={{ fontSize: 24, verticalAlign: 'middle', mr: 0.5 }} />
            {product.name}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontSize: isMobile ? '0.75rem' : '0.85rem',
              color: '#84341c',
              mt: 1,
              minHeight: isMobile ? 36 : 40,
              fontFamily: `'Press Start 2P', cursive`,
            }}
          >
            {product.description}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontSize: isMobile ? '0.65rem' : '1rem',
              fontFamily: `'Press Start 2P', cursive`,
              mt: 2,
              color: '#FF5959',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              fontWeight: 'bold',
            }}
          >
            💰 {product.price} XaviCoins
          </Typography>
        </Box>

        {/* Botón Comprar */}
        {mode === 'buy' && (
          <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
            <Tooltip title="Hazte con todos 😎" arrow>
              <Button
                startIcon={<ShoppingCartIcon />}
                variant="contained"
                onClick={onBuy}
                sx={{
                  bgcolor: '#58ABF6',
                  fontFamily: `'Press Start 2P', cursive`,
                  fontSize: isMobile ? '0.5rem' : '0.6rem',
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: '#0D3745',
                  },
                }}
              >
                Comprar
              </Button>
            </Tooltip>
          </CardActions>
        )}
      </GameCard>
    </Box>
  );
};

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import type { Product } from '../../types/products';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (product: Product) => void;
  product?: Product;
}

export const BuyConfirmDialog = ({ open, onClose, onConfirm, product }: Props) => {
  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      sx={{
        '& .MuiDialog-paper': {
          border: '4px solid #0D3745',
          borderRadius: 3,
          bgcolor: '#fff3e6',
          boxShadow: '6px 6px 0 #E07F3F',
          fontFamily: `'Press Start 2P', cursive`,
          px: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontSize: '1rem',
          color: '#84341c',
          fontFamily: `'Press Start 2P', cursive`,
          pb: 1,
        }}
      >
        Confirmar Compra
      </DialogTitle>

      <DialogContent
        sx={{
          textAlign: 'center',
          fontSize: '0.75rem',
          color: '#0D3745',
          fontFamily: `'Press Start 2P', cursive`,
          py: 1,
        }}
      >
        ¿Comprar <b>{product.name}</b> por <b>{product.price}</b> xavicoins?
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            fontFamily: `'Press Start 2P', cursive`,
            fontSize: '0.6rem',
            color: '#84341c',
            borderColor: '#84341c',
            '&:hover': {
              bgcolor: '#84341c',
              color: 'white',
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => onConfirm(product)}
          variant="contained"
          sx={{
            bgcolor: '#E07F3F',
            fontFamily: `'Press Start 2P', cursive`,
            fontSize: '0.6rem',
            px: 3,
            '&:hover': {
              bgcolor: '#84341c',
            },
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

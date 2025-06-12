import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
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
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Confirmar Compra</DialogTitle>
			<DialogContent>
				<Typography>¿Estás seguro de que deseas comprar <strong>{product.name}</strong> por S/. {product.price}?</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancelar</Button>
				<Button onClick={() => onConfirm(product)} variant="contained" sx={{ bgcolor: '#E07F3F' }}>
					Confirmar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

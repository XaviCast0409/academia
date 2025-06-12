import {
	Box,
	Container,
	Grid,
	Typography,
	Button,
	Pagination,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { useProductStore } from '../../store/productsStore';
import { ProductUserModal } from './ProductUserModal';
import { ProductUserCard } from './ProductUserCard';
import { ConfirmDialog } from '../../utils/ConfirmDialog';
import type { Product } from '../../types/products';
import { useTransactionStore } from '../../store/transactionStore';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const ProductsUserPage = () => {
	const { products, totalPages, fetchProducts, addProduct, editProduct, removeProduct } = useProductStore();

	const purchaseProduct = useTransactionStore((state) => state.purchaseProduct);
	const [modalOpen, setModalOpen] = useState(false);
	const [editingProduct, setEditingProduct] = useState<Product | undefined>();
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [page, setPage] = useState(1);

	const [buyDialogOpen, setBuyDialogOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	const token = localStorage.getItem('token');
	const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
	const isProfessor = user?.roleId === 2;

	const professorId = isProfessor ? String(user.id) : undefined;

	useEffect(() => {
		fetchProducts(page);
	}, [page]);

	const handleAddClick = () => {
		setEditingProduct(undefined);
		setModalOpen(true);
	};

	const handleEdit = (product: Product) => {
		setEditingProduct(product);
		setModalOpen(true);
	};

	const handleDelete = (id: number) => {
		setSelectedId(id);
		setConfirmOpen(true);
	};

	const confirmDelete = async () => {
		if (selectedId !== null) {
			await removeProduct(selectedId);
			setConfirmOpen(false);
			fetchProducts(page, professorId);
		}
	};

	const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const handleBuyClick = (product: Product) => {
		setSelectedProduct(product);
		setBuyDialogOpen(true);
	};

	const confirmPurchase = async () => {
		if (!user || !selectedProduct) return;

		const payload = {
			userId: user.id,
			professorId: selectedProduct.professorId,
			productId: selectedProduct.id,
			price: selectedProduct.price,
		};

		try {
			await purchaseProduct(payload.userId, payload.productId);

			await MySwal.fire({
				icon: 'success',
				title: '¡Compra exitosa!',
				html: `<b>${selectedProduct.name}</b> fue comprado por <b>${selectedProduct.price}</b> xavicoins.`,
				confirmButtonColor: '#0D3745',
			});
		} catch (error) {
			console.error('Error al realizar la compra:', error);
			setBuyDialogOpen(false);
			await MySwal.fire({
				icon: 'error',
				title: 'Error en la compra',
				text: 'Hubo un problema al procesar tu compra. Inténtalo de nuevo más tarde.',
				confirmButtonColor: '#d33',
			});
		}

		setBuyDialogOpen(false);
		setSelectedProduct(null);
	};

	return (
		<Container sx={{ py: 4 }}>
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
				<Typography variant="h4" color="primary.dark">Productos</Typography>

				{isProfessor && (
					<Button
						variant="contained"
						startIcon={<AddIcon />}
						onClick={handleAddClick}
						sx={{ bgcolor: '#0D3745' }}
					>
						Agregar
					</Button>
				)}
			</Box>

			<Grid container spacing={3}>
				{products.map((product) => (
					<Grid key={product.id}>
						<ProductUserCard
							product={product}
							mode={isProfessor ? 'edit' : 'buy'}
							onEdit={() => handleEdit(product)}
							onDelete={() => handleDelete(product.id)}
							onBuy={() => handleBuyClick(product)}
						/>
					</Grid>
				))}
			</Grid>

			{totalPages > 1 && (
				<Box mt={4} display="flex" justifyContent="center">
					<Pagination
						count={totalPages}
						page={page}
						onChange={handlePageChange}
						color="primary"
						size="large"
						shape="rounded"
					/>
				</Box>
			)}

			<ProductUserModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				onSave={editingProduct ? (p) => editProduct(editingProduct.id, p) : addProduct}
				productToEdit={editingProduct}
			/>

			<ConfirmDialog
				open={confirmOpen}
				onClose={() => setConfirmOpen(false)}
				onConfirm={confirmDelete}
				message="¿Estás seguro que deseas eliminar este producto?"
			/>

			<Dialog open={buyDialogOpen} onClose={() => setBuyDialogOpen(false)}>
				<DialogTitle>Confirmar Compra</DialogTitle>
				<DialogContent>
					¿Estás seguro que deseas comprar <b>{selectedProduct?.name}</b> por <b>S/. {selectedProduct?.price}</b>?
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setBuyDialogOpen(false)}>Cancelar</Button>
					<Button onClick={confirmPurchase} variant="contained" sx={{ bgcolor: '#E07F3F' }}>
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

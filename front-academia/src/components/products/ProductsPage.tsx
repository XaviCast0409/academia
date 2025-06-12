import { Box, Container, Grid, Typography, Button, Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { useProductStore } from '../../store/productsStore';
import { ProductModal } from './ProductModal';
import { ConfirmDialog } from '../../utils/ConfirmDialog';
import { ProductCard } from './ProductCard';
import type { Product } from '../../types/products';

export const ProductsPage = () => {
	const { products, totalPages, fetchProducts, addProduct, editProduct, removeProduct } = useProductStore();

	const [modalOpen, setModalOpen] = useState(false);
	const [editingProduct, setEditingProduct] = useState<Product | undefined>();
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [page, setPage] = useState(1);

	const token = localStorage.getItem('token');
	const user = token ? JSON.parse(atob(token.split('.')[1])) : null; // decodifica el token JWT para obtener el usuario
	
	const isProfessor = user?.roleId === 2;
	const professorId = isProfessor && user?.id ? String(user.id) : undefined;

	useEffect(() => {
		fetchProducts(page, professorId); // pasa undefined si no aplica
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
			fetchProducts(page, professorId); // recarga
		}
	};

	const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<Container sx={{ py: 4 }}>
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
				<Typography variant="h4" color="primary.dark">Productos</Typography>
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					onClick={handleAddClick}
					sx={{ bgcolor: '#0D3745' }}
				>
					Agregar
				</Button>
			</Box>

			<Grid container spacing={3}>
				{products.map((product) => (
					<Grid key={product.id} >
						<ProductCard
							product={product}
							onEdit={() => handleEdit(product)}
							onDelete={() => handleDelete(product.id)}
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

			<ProductModal
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
		</Container>
	);
};

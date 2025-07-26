import { Box, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { useProductStore } from '../../store/productsStore';
import { ProductModal } from './ProductModal';
import { ProductCard } from './ProductCard';
import type { Product } from '../../types/products';
import { ConfirmDialog, Pagination, PageHeader } from '../common';
import { getCurrentUser } from '../../utils/common';
import { useResponsive } from '../../shared';

export const ProductsPage = () => {
	const { products, totalPages, fetchProducts, addProduct, editProduct, removeProduct } = useProductStore();
	const { isMobile } = useResponsive();

	const [modalOpen, setModalOpen] = useState(false);
	const [editingProduct, setEditingProduct] = useState<Product | undefined>();
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [page, setPage] = useState(1);

	const user = getCurrentUser();
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

	return (
		<Box sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
				<PageHeader title="Productos" />
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					onClick={handleAddClick}
					sx={{ 
						bgcolor: '#0D3745',
						fontSize: { xs: '0.7rem', sm: '0.8rem' }
					}}
					size={isMobile ? 'small' : 'medium'}
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
				<Pagination
					currentPage={page}
					totalPages={totalPages}
					onPageChange={setPage}
				/>
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
		</Box>
	);
};

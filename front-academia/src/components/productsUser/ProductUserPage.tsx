import {
  Box,
  Grid
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ProductUserCard } from './ProductUserCard';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useProductStore } from '../../store/productsStore';
import type { Product } from '../../types/products';
import { useTransactionStore } from '../../store/transactionStore';
import { BuyConfirmDialog } from './BuyConfirmDialog';
import { PageHeader, Pagination } from '../common';
import { getCurrentUser } from '../../utils/common';

const MySwal = withReactContent(Swal);

export const ProductsUserPage = () => {
  const [page, setPage] = useState(1);
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { purchaseProduct } = useTransactionStore();
  const { products, totalPages, fetchProducts } = useProductStore();

  const user = getCurrentUser();
  const isProfessor = user?.roleId === 1;
  const professorId = isProfessor ? String(user.id) : undefined;

  useEffect(() => {
    fetchProducts(page, professorId);
  }, [page, fetchProducts, professorId]);

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setBuyDialogOpen(true);
  };

  const confirmPurchase = async (product: Product) => {
    if (!user || !product) return;

    try {
      await purchaseProduct(user.id, product.id);
      setBuyDialogOpen(false);
      await MySwal.fire({
        icon: 'success',
        title: '¡Compra exitosa!',
        html: `<b>${product.name}</b> fue comprado por <b>${product.price}</b> xavicoins.`,
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

    setSelectedProduct(null);
  };

  return (
    <Box
      sx={{
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
        bgcolor: '#fff3e6',
        minHeight: '100vh',
        borderRadius: 2,
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
      }}
    >
      <PageHeader title="Productos" />

      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid key={product.id} >
            <ProductUserCard
              product={product}
              mode={isProfessor ? 'edit' : 'buy'}
              onBuy={() => handleBuyClick(product)}
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

      <BuyConfirmDialog
        open={buyDialogOpen}
        onClose={() => setBuyDialogOpen(false)}
        onConfirm={confirmPurchase}
        product={selectedProduct ?? undefined}
      />
    </Box>
  );
};

import {
  Box,
  Container,
  Grid,
  Typography,
  Pagination
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ProductUserCard } from './ProductUserCard';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useProductStore } from '../../store/productsStore';
import type { Product } from '../../types/products';
import { useTransactionStore } from '../../store/transactionStore';
import { BuyConfirmDialog } from './BuyConfirmDialog';

const MySwal = withReactContent(Swal);

export const ProductsUserPage = () => {
  const [page, setPage] = useState(1);
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { purchaseProduct } = useTransactionStore();
  const { products, totalPages, fetchProducts } = useProductStore();

  const token = localStorage.getItem('auth-storage');
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const isProfessor = user?.roleId === 1;
  const professorId = isProfessor ? String(user.id) : undefined;

  useEffect(() => {
    fetchProducts(page, professorId);
  }, [page, fetchProducts, professorId]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
    <Container
      sx={{
        py: 4,
        bgcolor: '#fff3e6',
        minHeight: '100vh',
        borderRadius: 2,
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: `'Press Start 2P', cursive`,
            color: '#0D3745',
            fontSize: '1.1rem',
            mb: 4,
            textAlign: 'center',
          }}
        >
          Productos
        </Typography>
      </Box>

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
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                fontFamily: `'Press Start 2P', cursive`,
                fontSize: '0.6rem',
                color: '#0D3745',
                border: '2px solid #0D3745',
              },
              '& .Mui-selected': {
                bgcolor: '#E07F3F !important',
                color: '#fff !important',
              },
            }}
          />
        </Box>
      )}

      <BuyConfirmDialog
        open={buyDialogOpen}
        onClose={() => setBuyDialogOpen(false)}
        onConfirm={confirmPurchase}
        product={selectedProduct ?? undefined}
      />
    </Container>
  );
};

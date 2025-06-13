import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Pagination,
  Grid,
  CircularProgress,
  Container,
} from '@mui/material';
import { useTransactionStore } from '../../store/transactionStore';
import { palette } from '../../theme/palette';

export const UserTransactionsList = () => {
  const token = localStorage.getItem('token');
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

  const userId = user?.id || null;
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);

  const { transactions, totalPages, getAllTransactions } = useTransactionStore();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!userId) return;
      setLoading(true);
      console.log(`Fetching transactions for user ID: ${userId}, page: ${page}, limit: ${limit}`);
      
      await getAllTransactions(page, limit, userId);
      setLoading(false);
    };

    fetchTransactions();
  }, [page, userId, getAllTransactions, limit]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" color={palette.primary} fontWeight={700}>
          Mis Transacciones
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress sx={{ color: palette.primary }} />
        </Box>
      ) : transactions.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {transactions.map((tx: any) => (
              <Grid key={tx.id}>
                <Card sx={{ bgcolor: palette.accent, color: 'white' }}>
                  <CardContent>
                    <Typography variant="h6">{tx.product?.name}</Typography>
                    <Typography variant="body2">XaviCoins: {tx.product?.price}</Typography>
                    <Typography variant="body2">
                      Fecha: {new Date(tx.createdAt).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
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
        </>
      ) : (
        <Box mt={5} textAlign="center">
          <Typography variant="h6" color="text.secondary">
            No se encontraron transacciones.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

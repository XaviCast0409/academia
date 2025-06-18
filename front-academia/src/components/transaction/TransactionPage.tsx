import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useTransactionStore } from '../../store/transactionStore';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EventIcon from '@mui/icons-material/Event';
import Pagination from '@mui/material/Pagination';

export const UserTransactionsList = () => {
  const token = localStorage.getItem('auth-storage');
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

  const userId = user?.id || null;
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);

  const { transactions, totalPages, getAllTransactions } = useTransactionStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!userId) return;
      setLoading(true);
      await getAllTransactions(page, limit, userId);
      setLoading(false);
    };

    fetchTransactions();
  }, [page, userId, getAllTransactions, limit]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container maxWidth="md" sx={{ py: 5, fontFamily: `'Press Start 2P', cursive` }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          mb: 4,
          fontSize: isMobile ? '1.2rem' : '1.8rem',
          fontFamily: `'Press Start 2P', cursive`,
          color: '#0D3745',
        }}
      >
        🧾 Lista de Transacciones
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress sx={{ color: '#E07F3F' }} />
        </Box>
      ) : transactions.length > 0 ? (
        <>
          <List disablePadding>
            {transactions.map((tx: any) => (
              <Box
                key={tx.id}
                sx={{
                  px: 2,
                  py: 2,
                  mb: 2,
                  bgcolor: '#fffefc',
                  border: '3px dashed #0D3745',
                  boxShadow: '4px 4px 0 #FFCC00',
                  borderRadius: 2,
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    backgroundColor: '#fcf3e3',
                  },
                }}
              >
                <ListItem disablePadding sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <ListItemIcon sx={{ minWidth: '30px', color: '#84341c' }}>
                      <Inventory2Icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={tx.product?.name}
                      primaryTypographyProps={{
                        fontSize: isMobile ? '0.6rem' : '0.75rem',
                        fontFamily: `'Press Start 2P', cursive`,
                        color: '#84341c',
                      }}
                    />
                  </Box>

                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <ListItemIcon sx={{ minWidth: '30px', color: '#E07F3F' }}>
                      <MonetizationOnIcon />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: isMobile ? '0.55rem' : '0.7rem', color: '#E07F3F', fontFamily: `'Press Start 2P', cursive` }}>
                      {tx.product?.price} XaviCoins
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <ListItemIcon sx={{ minWidth: '30px', color: '#0D3745' }}>
                      <EventIcon />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: isMobile ? '0.5rem' : '0.65rem', color: '#0D3745', fontFamily: `'Press Start 2P', cursive` }}>
                      {new Date(tx.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                </ListItem>
              </Box>
            ))}
          </List>

          {totalPages > 1 && (
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                size="large"
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontFamily: `'Press Start 2P', cursive`,
                    color: '#0D3745',
                  },
                }}
              />
            </Box>
          )}
        </>
      ) : (
        <Box mt={6} textAlign="center">
          <Typography variant="h6" sx={{ color: '#84341c' }}>
            No se encontraron transacciones.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

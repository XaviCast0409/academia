import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTransactionStore } from '../../store/transactionStore';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EventIcon from '@mui/icons-material/Event';
import { PageHeader, LoadingSpinner, Pagination } from '../common';
import { getCurrentUser } from '../../utils/common';
import { useResponsive } from '../../shared';

export const TransactionPage = () => {
  const user = getCurrentUser();
  const userId = user?.id || null;
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);
  const { isMobile } = useResponsive();

  const { transactions, totalPages, getAllTransactions } = useTransactionStore();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!userId) return;
      setLoading(true);
      await getAllTransactions(page, limit, userId);
      setLoading(false);
    };

    fetchTransactions();
  }, [page, userId, getAllTransactions, limit]);

  if (loading) {
    return <LoadingSpinner message="Cargando transacciones..." />;
  }

  return (
    <Box sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 }, maxWidth: 'md', mx: 'auto' }}>
      <PageHeader 
        title="🧾 Lista de Transacciones"
        subtitle="Historial de compras realizadas"
      />
      {transactions.length > 0 ? (
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
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      ) : (
        <Box mt={6} textAlign="center">
          <Typography variant="h6" sx={{ color: '#84341c', fontFamily: `'Press Start 2P', cursive` }}>
            No se encontraron transacciones.
          </Typography>
        </Box>
      )}
    </Box>
  );
};;

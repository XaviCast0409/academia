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
import PersonIcon from '@mui/icons-material/Person';

import { PageHeader, LoadingSpinner, Pagination, GameCard } from '../common';
import { useResponsive, getCurrentUser } from '../../shared';


export const TransactionPerProfessor = () => {
  const { user } = getCurrentUser();
  const professorId = user?.id;

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);

  const { transactions, totalPages, getProfessorProductTransactions } = useTransactionStore();
  const { isMobile } = useResponsive();

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      await getProfessorProductTransactions(professorId, page, limit);
      setLoading(false);
    };

    fetchTransactions();
  }, [page, professorId, getProfessorProductTransactions, limit]);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        py: 5,
        px: 2,
        maxWidth: 'md',
        mx: 'auto',
        fontFamily: 'Press Start 2P'
      }}
    >
      <PageHeader
        title="🎓 Transacciones de Mis Productos"
        subtitle="Historial de ventas de tus productos"
      />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <LoadingSpinner />
        </Box>
      ) : transactions.length > 0 ? (
        <>
          <List disablePadding>
            {transactions.map((tx: any) => (
              <Box key={tx.id} sx={{ mb: 2 }}>
                <GameCard>
                  <ListItem disablePadding sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <ListItemIcon sx={{ minWidth: '30px', color: 'primary.main' }}>
                        <Inventory2Icon />
                      </ListItemIcon>
                      <ListItemText
                        primary={tx.product?.name}
                        primaryTypographyProps={{
                          fontSize: isMobile ? '0.6rem' : '0.75rem',
                          fontFamily: 'Press Start 2P',
                          color: 'primary.main',
                        }}
                      />
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <ListItemIcon sx={{ minWidth: '30px', color: '#FFCC00' }}>
                        <MonetizationOnIcon />
                      </ListItemIcon>
                      <Typography 
                        sx={{ 
                          fontSize: isMobile ? '0.55rem' : '0.7rem', 
                          color: '#FFCC00', 
                          fontFamily: 'Press Start 2P' 
                        }}
                      >
                        {tx.product?.price} XaviCoins
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <ListItemIcon sx={{ minWidth: '30px', color: 'text.secondary' }}>
                        <PersonIcon />
                      </ListItemIcon>
                      <Typography 
                        sx={{ 
                          fontSize: isMobile ? '0.5rem' : '0.65rem', 
                          color: 'text.secondary', 
                          fontFamily: 'Press Start 2P' 
                        }}
                      >
                        Comprador: {tx.user.name} | Sección: {tx.user.section}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <ListItemIcon sx={{ minWidth: '30px', color: 'text.secondary' }}>
                        <EventIcon />
                      </ListItemIcon>
                      <Typography 
                        sx={{ 
                          fontSize: isMobile ? '0.5rem' : '0.65rem', 
                          color: 'text.secondary', 
                          fontFamily: 'Press Start 2P' 
                        }}
                      >
                        {new Date(tx.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  </ListItem>
                </GameCard>
              </Box>
            ))}
          </List>

          {totalPages > 1 && (
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            </Box>
          )}
        </>
      ) : (
        <Box mt={6} textAlign="center">
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary',
              fontFamily: 'Press Start 2P',
              fontSize: isMobile ? '0.7rem' : '0.9rem'
            }}
          >
            No se encontraron transacciones de tus productos.
          </Typography>
        </Box>
      )}
    </Box>
  );
}; 
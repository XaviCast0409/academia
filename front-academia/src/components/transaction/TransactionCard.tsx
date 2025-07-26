import {
  Box,
  Typography,
} from "@mui/material";
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import type { Transaction } from "../../types/transaction";
import { GameCard } from '../common';
import { useResponsive } from '../../shared';

interface Props {
  transaction: Transaction;
  currentPage: number;
}

export const TransactionCard = ({ transaction }: Props) => {
  const { isMobile } = useResponsive();

  return (
    <GameCard>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <ReceiptIcon color="primary" />
            <Typography
              sx={{
                fontFamily: 'Press Start 2P',
                fontSize: isMobile ? '0.7rem' : '0.9rem',
                color: 'primary.main',
                fontWeight: 600
              }}
            >
              Transacción #{transaction.id}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <PersonIcon sx={{ color: 'text.secondary', fontSize: 16 }} />
            <Typography
              sx={{
                fontSize: isMobile ? '0.75rem' : '0.85rem',
                color: 'text.secondary'
              }}
            >
              Usuario: {transaction.userId}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <CalendarTodayIcon sx={{ color: 'text.secondary', fontSize: 16 }} />
            <Typography
              sx={{
                fontSize: isMobile ? '0.75rem' : '0.85rem',
                color: 'text.secondary'
              }}
            >
              Fecha: {new Date(transaction.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            mt: isMobile ? 2 : 0,
            textAlign: isMobile ? "center" : "right",
            minWidth: isMobile ? "100%" : "120px"
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Press Start 2P',
              fontSize: isMobile ? '0.8rem' : '1rem',
              color: '#FFCC00',
              fontWeight: 'bold'
            }}
          >
            -{transaction.amount} XC
          </Typography>
        </Box>
      </Box>
    </GameCard>
  );
}; 
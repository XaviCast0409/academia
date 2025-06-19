import {
  Box,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import type { Transaction } from "../../types/transaction";

interface Props {
  transaction: Transaction;
  currentPage: number;
}

export const TransactionCard = ({ transaction, currentPage }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        px: 2,
        py: 2,
        mb: 2,
        bgcolor: '#fdfdfd',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
        '&:hover': { backgroundColor: '#f8f8f8' },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap"
        }}
      >
        {/* Información de la transacción */}
        <Box sx={{ flex: 1 }}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <ReceiptIcon sx={{ color: "#E07F3F" }} />
            <Typography fontWeight={600} fontSize={isMobile ? "0.9rem" : "1rem"}>
              Transacción #{transaction.id}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <PersonIcon sx={{ color: "#0D3745" }} />
            <Typography
              fontSize={isMobile ? "0.8rem" : "0.9rem"}
              color="#555"
            >
              Usuario: {transaction.userId}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <CalendarTodayIcon sx={{ color: "#0D3745" }} />
            <Typography
              fontSize={isMobile ? "0.8rem" : "0.9rem"}
              color="#555"
            >
              Fecha: {new Date(transaction.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        {/* Estado de la transacción */}
        <Box
          sx={{
            mt: isMobile ? 2 : 0,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 1,
          }}
        >
{/*           <Typography
            sx={{
              color: transaction.status === 'completed' ? '#2e7d32' : '#ed6c02',
              fontWeight: 600,
              fontSize: isMobile ? "0.8rem" : "0.9rem",
            }}
          >
            {transaction.status === 'completed' ? 'Completada' : 'Pendiente'}
          </Typography> */}
        </Box>
      </Box>
    </Box>
  );
}; 
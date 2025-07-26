import { Box, Pagination as MuiPagination } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showWhenSingle?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showWhenSingle = false,
}: PaginationProps) => {
  if (totalPages <= 1 && !showWhenSingle) return null;

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
        shape="rounded"
      />
    </Box>
  );
};

import { View, Text, TouchableOpacity } from 'react-native';
import { paginationStyles } from '@/styles/pagination.styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <View style={paginationStyles.container}>
      {/* Botón Anterior */}
      <TouchableOpacity
        style={[
          paginationStyles.button,
          currentPage === 1 && paginationStyles.buttonDisabled,
        ]}
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Text
          style={[
            paginationStyles.buttonText,
            currentPage === 1 && paginationStyles.buttonTextDisabled,
          ]}
        >
          ←
        </Text>
      </TouchableOpacity>

      {/* Números de página */}
      {getPageNumbers().map((page, index) => (
        <TouchableOpacity
          key={index}
          style={[
            paginationStyles.pageButton,
            page === currentPage && paginationStyles.activePageButton,
            page === '...' && paginationStyles.ellipsisButton,
          ]}
          onPress={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...' || page === currentPage}
        >
          <Text
            style={[
              paginationStyles.pageButtonText,
              page === currentPage && paginationStyles.activePageButtonText,
              page === '...' && paginationStyles.ellipsisText,
            ]}
          >
            {page}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Botón Siguiente */}
      <TouchableOpacity
        style={[
          paginationStyles.button,
          currentPage === totalPages && paginationStyles.buttonDisabled,
        ]}
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Text
          style={[
            paginationStyles.buttonText,
            currentPage === totalPages && paginationStyles.buttonTextDisabled,
          ]}
        >
          →
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pagination; 
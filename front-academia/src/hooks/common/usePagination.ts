import { useState, useCallback } from 'react';

interface PaginationState {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

interface UsePaginationProps {
  initialPage?: number;
  initialPageSize?: number;
}

export const usePagination = ({ 
  initialPage = 1, 
  initialPageSize = 10 
}: UsePaginationProps = {}) => {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    currentPage: initialPage,
    totalPages: 1,
    pageSize: initialPageSize,
  });

  const setCurrentPage = useCallback((page: number) => {
    setPaginationState(prev => ({
      ...prev,
      currentPage: page,
    }));
  }, []);

  const setTotalPages = useCallback((totalPages: number) => {
    setPaginationState(prev => ({
      ...prev,
      totalPages,
    }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setPaginationState(prev => ({
      ...prev,
      pageSize,
      currentPage: 1, // Reset to first page when changing page size
    }));
  }, []);

  const resetPagination = useCallback(() => {
    setPaginationState({
      currentPage: initialPage,
      totalPages: 1,
      pageSize: initialPageSize,
    });
  }, [initialPage, initialPageSize]);

  return {
    currentPage: paginationState.currentPage,
    totalPages: paginationState.totalPages,
    pageSize: paginationState.pageSize,
    setCurrentPage,
    setTotalPages,
    setPageSize,
    resetPagination,
  };
};

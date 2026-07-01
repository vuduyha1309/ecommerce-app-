import { useState, useMemo, useCallback } from 'react';

/**
 * Custom hook for pagination and infinite scroll
 */
export const usePagination = (items = [], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate paginated items
  const paginatedItems = useMemo(() => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  // Check if there are more items to load
  const hasMore = useMemo(() => {
    return currentPage * itemsPerPage < items.length;
  }, [items.length, currentPage, itemsPerPage]);

  // Load more items (for infinite scroll)
  const loadMore = useCallback(() => {
    if (hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMore]);

  // Reset pagination
  const reset = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    paginatedItems,
    hasMore,
    loadMore,
    reset,
    currentPage,
  };
};

export default usePagination;

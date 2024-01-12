import { useAddress } from '@thirdweb-dev/react';
import { type SortConfig } from 'lib/types';
import { TABLE_RECORDS_PER_PAGE_LIMIT } from 'lib/utils/constants/general';
import { useState, useEffect } from 'react';

type FetchFunction<T> = (page: number, limit: number) => Promise<T>;
type ProcessDataFunction<T, U> = (data: T) => U;
type UseTableDataReturn<T> = {
  data: T | null;
  loading: boolean;
  sortConfig: SortConfig<keyof T>;
  currentPage: number;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
  handleItemsPerPageChange: (newLimit: number) => void;
  handleSortChange: (key: keyof T) => void;
};

function useTableData<T, U>(
  fetchFunction: FetchFunction<U>,
  processData: ProcessDataFunction<U, T[]>,
  initialSortConfig: SortConfig<keyof T>,
): UseTableDataReturn<T> {
  const address = useAddress();
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState(initialSortConfig);
  const [itemsPerPage, setItemsPerPage] = useState(TABLE_RECORDS_PER_PAGE_LIMIT);
  const [loading, setLoading] = useState(false);

  // Common functions like handlePageChange, handleItemsPerPageChange, handleSortChange...

  const fetchData = async (page: number, limit: number) => {
    if (address) {
      setLoading(true);
      try {
        const response = await fetchFunction(page, limit);
        const processedData = processData(response);
        setData(processedData);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error({ error });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData(currentPage, itemsPerPage);
  }, [address, currentPage, itemsPerPage]);

  return {
    data,
    loading,
    sortConfig,
    currentPage,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
    handleSortChange,
  };
}

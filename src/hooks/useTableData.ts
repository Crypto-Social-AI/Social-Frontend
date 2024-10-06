import { useActiveAccount } from 'thirdweb/react';
import { type SortConfig } from 'lib/types';
import { TABLE_RECORDS_PER_PAGE_LIMIT } from 'lib/utils/constants/general';
import { useState, useEffect } from 'react';

type FetchResponse<T> = {
  data: T[];
  totalPages?: number;
  currentPage?: number;
};
type FetchFunction<T> = (page: number, limit: number) => Promise<FetchResponse<T>>;
type ProcessDataFunction<T> = (data: T[]) => T[];
type UseTableDataReturn<T> = {
  data: T[] | null;
  loading: boolean;
  sortConfig?: SortConfig<keyof T>;
  currentPage: number;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
  handleItemsPerPageChange: (newLimit: number) => void;
  handleSortChange: (key: keyof T) => void;
};

export default function useTableData<T>(
  fetchFunction: FetchFunction<T>,
  processData: ProcessDataFunction<T>,
  initialSortConfig?: SortConfig<keyof T>,
): UseTableDataReturn<T> {
  const account = useActiveAccount();
  const address = account?.address;
  const [data, setData] = useState<T[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState(initialSortConfig);
  const [itemsPerPage, setItemsPerPage] = useState(TABLE_RECORDS_PER_PAGE_LIMIT);
  const [loading, setLoading] = useState(false);

  const handleSortChange = (key: keyof T) => {
    setSortConfig((currentSortConfig): SortConfig<keyof T> => {
      if (currentSortConfig && currentSortConfig.key === key) {
        return {
          key,
          direction: currentSortConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit);

    if (data && currentPage * itemsPerPage > data.length) {
      setCurrentPage(1);
    }
  };

  const fetchData = async (page: number, limit: number) => {
    if (address) {
      setLoading(true);
      try {
        const response = await fetchFunction(page, limit);
        const processedData = processData(response.data);
        setData(processedData);

        const receivedTotalPages = response.totalPages ?? 1;
        setTotalPages(receivedTotalPages);

        if (receivedTotalPages < page) {
          setCurrentPage(receivedTotalPages);
        }
      } catch (error) {
        console.error({ error });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // This function is defined and called immediately to use async/await in useEffect.
    const fetchDataAsync = async () => {
      await fetchData(currentPage, itemsPerPage);
    };

    // We use `void` to explicitly signal that the floating promise is intentional
    void fetchDataAsync();
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

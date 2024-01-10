import { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import Container from 'components/Container/Container';
import SocialAccountsTable from 'components/SocialAccountsTable/SocialAccountsTable';
import { type SortConfig, type SocialAccountWithPost } from 'lib/types';
import { getSocialAccounts } from 'lib/utils/requests/getSocialAccounts';
import PaginationControls from 'components/PaginationControls/PaginationControls';
import { TABLE_RECORDS_PER_PAGE_LIMIT } from 'lib/utils/constants/general';

// TODO: Add custom hook or HOC to keep code DRY (SocialCalls and SocialAccounts virtually the same code)
export default function SocialAccounts() {
  const address = useAddress();
  const [socialAccounts, setSocialAccounts] = useState<SocialAccountWithPost[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(TABLE_RECORDS_PER_PAGE_LIMIT);
  const [loading, setLoading] = useState(false);

  const handleSortChange = (key: string) => {
    setSortConfig((currentSortConfig): SortConfig | null => {
      if (currentSortConfig && currentSortConfig.key === key) {
        return {
          key,
          direction: currentSortConfig.key === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const sortData = (data: SocialAccountWithPost[] | null) => {
    if (!sortConfig) return data;
    if (!data) return null;

    return [...data].sort((a, b) => {
      const keyA = a[sortConfig.key as keyof SocialAccountWithPost];
      const keyB = b[sortConfig.key as keyof SocialAccountWithPost];
      if (keyA < keyB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (keyA > keyB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const sortedData = sortData(socialAccounts);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1);
  };

  const fetchData = async (page: number, limit: number) => {
    if (address) {
      setLoading(true);
      try {
        const data = await getSocialAccounts(page, limit);
        setSocialAccounts(data.socialAccounts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error({ error });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    async function fetchDataAsync() {
      await fetchData(currentPage, itemsPerPage);
    }

    fetchDataAsync().catch(console.error);
  }, [address, currentPage, itemsPerPage]);

  return (
    <Container className='px-12'>
      <SocialAccountsTable
        socialAccounts={sortedData}
        loading={loading}
        sortConfig={sortConfig}
        onHandleSortChange={handleSortChange}
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </Container>
  );
}

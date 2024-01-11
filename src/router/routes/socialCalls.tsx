import { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { type SocialCallsResponse, getSocialCalls } from 'lib/utils/requests/getSocialCalls';
import { type SortConfig, type SocialPosts } from 'lib/types';
import { TABLE_RECORDS_PER_PAGE_LIMIT } from 'lib/utils/constants/general';
import sortData from 'lib/utils/helpers/sorting/sorting';
import SocialCallsTable from 'components/SocialCallsTable/SocialCallsTable';
import PaginationControls from 'components/PaginationControls/PaginationControls';

// TODO: Add custom hook or HOC to keep code DRY (SocialCalls and SocialAccounts virtually the same code)
export default function SocialCalls() {
  const address = useAddress();
  const [socialCalls, setSocialCalls] = useState<SocialPosts | null>(null);
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
          direction: currentSortConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedData = sortData(socialCalls, sortConfig);

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
        const data: SocialCallsResponse = await getSocialCalls(page, limit);
        setSocialCalls(data.socialPosts);
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
    <>
      <SocialCallsTable socialCalls={socialCalls} loading={loading} />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
}

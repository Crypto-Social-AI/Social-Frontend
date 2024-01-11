import { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import Container from 'components/Container/Container';
import SocialAccountsTable from 'components/SocialAccountsTable/SocialAccountsTable';
import PaginationControls from 'components/PaginationControls/PaginationControls';
import { type SortConfig, type SocialAccountWithPost } from 'lib/types';
import { getSocialAccounts } from 'lib/utils/requests/getSocialAccounts';
import { TABLE_RECORDS_PER_PAGE_LIMIT } from 'lib/utils/constants/general';
import sortData from 'lib/utils/helpers/sorting/sorting';

// TODO: Add custom hook or HOC to keep code DRY (SocialCalls and SocialAccounts virtually the same code)
export default function SocialAccounts() {
  const address = useAddress();
  const [socialAccounts, setSocialAccounts] = useState<SocialAccountWithPost[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState<SortConfig<keyof SocialAccountWithPost> | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(TABLE_RECORDS_PER_PAGE_LIMIT);
  const [loading, setLoading] = useState(false);

  const handleSortChange = (key: keyof SocialAccountWithPost) => {
    setSortConfig((currentSortConfig): SortConfig<keyof SocialAccountWithPost> | null => {
      if (currentSortConfig && currentSortConfig.key === key) {
        return {
          key,
          direction: currentSortConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const socialAccountsWithPostsCount = socialAccounts?.map((account) => ({
    ...account,
    postCount: account?.posts?.length || 0,
  }));
  const sortedData = sortData<SocialAccountWithPost, keyof SocialAccountWithPost>(
    socialAccountsWithPostsCount ?? [],
    sortConfig,
  );

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

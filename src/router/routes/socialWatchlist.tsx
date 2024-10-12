import Container from 'components/Container/Container';
import PaginationControls from 'components/PaginationControls/PaginationControls';
import SocialAccountsTable from 'components/SocialAccountsTable/SocialAccountsTable';
import useTableData from 'hooks/useTableData';
import { type SocialAccountWithPost } from 'lib/types';
import sortData from 'lib/utils/helpers/sorting/sorting';
import { getSocialAccounts } from 'lib/utils/requests/getSocialAccounts';

type ExtendedSocialAccount = SocialAccountWithPost & {
  postCount: number;
};

export default function SocialWatchlist() {
  const processData = (data: SocialAccountWithPost[]): ExtendedSocialAccount[] =>
    data?.map((account) => ({
      ...account,
      postCount: account?.posts?.length || 0,
    }));

  const {
    data,
    loading,
    sortConfig,
    handlePageChange,
    handleItemsPerPageChange,
    handleSortChange,
    currentPage,
    totalPages,
  } = useTableData(getSocialAccounts, processData);

  // Get the current watchlist from local storage
  const watchlist = JSON.parse(localStorage.getItem('watchlist') ?? '[]');

  // Process and filter data to include only watchlisted accounts
  const processedData = processData(data ?? []);
  const filteredData = processedData.filter((account) => watchlist.includes(account.username));

  // Sort the filtered data
  const sortedData = sortData<ExtendedSocialAccount, keyof ExtendedSocialAccount>(filteredData, sortConfig);

  const handleWatchlistToggle = (username: string) => {
    const currentWatchlist = JSON.parse(localStorage.getItem('watchlist') ?? '[]');
    if (currentWatchlist.includes(username)) {
      // Remove from watchlist
      const updatedWatchlist = currentWatchlist.filter((user: string) => user !== username);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    } else {
      // Add to watchlist
      currentWatchlist.push(username);
      localStorage.setItem('watchlist', JSON.stringify(currentWatchlist));
    }
  };

  // Function to check if a username is in the watchlist
  const isInWatchlist = (username: string): boolean => {
    const currentWatchlist = JSON.parse(localStorage.getItem('watchlist') ?? '[]');
    return currentWatchlist.includes(username);
  };

  return (
    <Container className='px-12'>
      <SocialAccountsTable
        socialAccounts={sortedData}
        loading={loading}
        sortConfig={sortConfig}
        handleSortChange={handleSortChange}
        onWatchlistToggle={handleWatchlistToggle} // Pass the handler to the table
        isInWatchlist={isInWatchlist}
      />
      {/* <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      /> */}
    </Container>
  );
}

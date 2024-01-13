import Container from 'components/Container/Container';
import SocialAccountsTable from 'components/SocialAccountsTable/SocialAccountsTable';
import PaginationControls from 'components/PaginationControls/PaginationControls';
import { type SocialAccountWithPost } from 'lib/types';
import { getSocialAccounts } from 'lib/utils/requests/getSocialAccounts';
import sortData from 'lib/utils/helpers/sorting/sorting';
import useTableData from 'hooks/useTableData';

export default function SocialAccounts() {
  const processData = (data: SocialAccountWithPost[]) =>
    data?.map((account) => ({
      ...account,
      postCount: account?.posts?.length || 0,
    }));

  const { data, loading, sortConfig, handlePageChange, handleSortChange, currentPage, totalPages } = useTableData(
    getSocialAccounts,
    processData,
  );
  const processedData = processData(data ?? []);
  const sortedData = sortData<SocialAccountWithPost, keyof SocialAccountWithPost>(processedData ?? []);

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
        onItemsPerPageChange={handlePageChange}
      />
    </Container>
  );
}

import { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import Container from 'components/Container/Container';
import SocialAccountsTable from 'components/SocialAccountsTable/SocialAccountsTable';
import { type SocialAccountWithPost } from 'lib/types';
import { getSocialAccounts } from 'lib/utils/requests/getSocialAccounts';
import PaginationControls from 'components/PaginationControls/PaginationControls';

export default function SocialAccounts() {
  const address = useAddress();
  const [socialAccounts, setSocialAccounts] = useState<SocialAccountWithPost[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address) {
      setLoading(true);
      // Update the getSocialAccounts call to include the current page
      getSocialAccounts(currentPage)
        .then((response) => {
          setSocialAccounts(response.socialAccounts);
          setTotalPages(response.totalPages); // Assuming response includes totalPages
        })
        .catch((error) => {
          console.error('Failed to fetch social accounts:', error);
        })
        .finally(() => setLoading(false));
    }
  }, [address, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Container className='px-12'>
      <SocialAccountsTable socialAccounts={socialAccounts} loading={loading} />
      {totalPages > 1 && (
        <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </Container>
  );
}

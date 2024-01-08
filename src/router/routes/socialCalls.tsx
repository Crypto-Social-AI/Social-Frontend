import { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { type SocialCallsResponse, getSocialCalls } from 'lib/utils/requests/getSocialCalls';
import { type SocialPosts } from 'lib/types';
import SocialCallsTable from 'components/SocialCallsTable/SocialCallsTable';
import PaginationControls from 'components/PaginationControls/PaginationControls';

export default function SocialCalls() {
  const address = useAddress();
  const [socialCalls, setSocialCalls] = useState<SocialPosts | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (address) {
      setLoading(true);
      getSocialCalls(currentPage)
        .then((data: SocialCallsResponse) => {
          setSocialCalls(data.socialPosts);
          setTotalPages(data.totalPages);
        })
        .catch((error) => console.error({ error }))
        .finally(() => setLoading(false));
    }
  }, [address, currentPage]);

  return (
    <>
      <SocialCallsTable socialCalls={socialCalls} loading={loading} />
      <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  );
}

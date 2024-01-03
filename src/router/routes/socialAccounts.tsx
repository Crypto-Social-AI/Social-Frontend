import { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import Container from 'components/Container/Container';
import SocialAccountsTable from 'components/SocialAccountsTable/SocialAccountsTable';
import { type SocialAccountWithPost } from 'lib/types';
import { getSocialAccounts } from 'lib/utils/requests/getSocialAccounts';

export default function SocialAccounts() {
  const address = useAddress();
  const [socialAccounts, setSocialAccounts] = useState<SocialAccountWithPost[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address) {
      setLoading(true);
      getSocialAccounts()
        .then((data) => setSocialAccounts(data))
        .catch((error) => {
          console.error('Failed to fetch social accounts:', error);
        })
        .finally(() => setLoading(false));
    }
  }, [address]);

  return (
    <Container className='px-12'>
      <SocialAccountsTable socialAccounts={socialAccounts} loading={loading} />
    </Container>
  );
}

import { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import Container from 'components/Container/Container';
import SocialAccountsTable from 'components/SocialAccountsTable/SocialAccountsTable';
import { type SocialAccountWithPost } from 'lib/types';
import { getSocialAccounts } from 'lib/utils/requests/getSocialAccounts';

export default function SocialAccounts() {
  const address = useAddress();
  const [socialAccounts, setSocialAccounts] = useState<SocialAccountWithPost[] | null>(null);

  useEffect(() => {
    if (address) {
      getSocialAccounts()
        .then((data) => setSocialAccounts(data))
        .catch((error) => {
          console.error('Failed to fetch social accounts:', error);
        });
    }
  }, [address]);

  return (
    <Container className='mt-12 px-12'>
      <SocialAccountsTable socialAccounts={socialAccounts} />
    </Container>
  );
}

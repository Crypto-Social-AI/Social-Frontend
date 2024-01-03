import { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { getSocialCalls } from 'lib/utils/requests/getSocialCalls';
import { type SocialPosts } from 'lib/types';
import SocialCallsTable from 'components/SocialCallsTable/SocialCallsTable';

export default function SocialCalls() {
  const address = useAddress();
  const [socialCalls, setSocialCalls] = useState<SocialPosts | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address) {
      setLoading(true);
      getSocialCalls()
        .then((data) => setSocialCalls(data))
        .catch((error) => console.error({ error }))
        .finally(() => setLoading(false));
    }
  }, [address]);

  return <SocialCallsTable socialCalls={socialCalls} loading={loading} />;
}

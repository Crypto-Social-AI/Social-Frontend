import { useLoaderData } from 'react-router-dom';
import Container from 'components/Container/Container';
import SocialAccountsTable from 'components/SocialAccountsTable/SocialAccountsTable';
import { type SocialAccountWithPost } from 'lib/types';
import { getSocialAccounts } from 'lib/utils/requests/getSocialAccounts';

export async function loader(): Promise<{ socialAccounts: SocialAccountWithPost[] }> {
  const socialAccounts = await getSocialAccounts();

  return { socialAccounts };
}

export default function SocialAccounts() {
  const data = useLoaderData() as { socialAccounts: SocialAccountWithPost[] };
  const socialAccounts = data.socialAccounts;

  return (
    <Container className='mt-12 px-12'>
      <SocialAccountsTable socialAccounts={socialAccounts} />
    </Container>
  );
}

import { useLoaderData } from 'react-router-dom';
import { getSocialCalls } from 'lib/utils/requests/getSocialCalls';
import { type SocialPosts } from 'lib/types';
import SocialCallsTable from 'components/SocialCallsTable/SocialCallsTable';
import Container from 'components/Container/Container';

export async function loader(): Promise<{ socialCalls: SocialPosts }> {
  const socialCalls = await getSocialCalls();
  console.log({ socialCalls });

  return { socialCalls };
}

export default function SocialCalls() {
  const data = useLoaderData() as { socialCalls: SocialPosts };
  const socialCalls = data.socialCalls;
  console.log({ socialCalls });

  return (
    <Container className='mt-12'>
      <SocialCallsTable socialCalls={socialCalls} />
    </Container>
  );
}

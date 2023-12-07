import { useLoaderData } from 'react-router-dom';
import { getSocialCalls } from 'lib/utils/requests/getSocialCalls';
import { type SocialPosts } from 'lib/types';
import SocialCallsTable from 'components/SocialCallsTable/SocialCallsTable';
import Container from 'components/Container/Container';

export async function loader(): Promise<{ socialCalls: SocialPosts }> {
  const socialCalls = await getSocialCalls();

  return { socialCalls };
}

export default function SocialCalls() {
  const data = useLoaderData() as { socialCalls: SocialPosts };
  const socialCalls = data.socialCalls;

  return (
    <Container className='mt-12 px-12'>
      <SocialCallsTable socialCalls={socialCalls} />
    </Container>
  );
}

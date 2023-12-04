import { useLoaderData } from 'react-router-dom';
import { getSocialCalls } from '../lib/utils/requests/getSocialCalls';
import { type SocialPosts } from '../lib/types';

export async function loader(): Promise<{ socialCalls: SocialPosts }> {
  const socialCalls = await getSocialCalls();

  return { socialCalls };
}

export default function SocialCalls() {
  const data = useLoaderData() as { socialCalls: SocialPosts };
  const socialCalls = data.socialCalls;

  console.log({ socialCalls });

  return (
    <div>
      <h1>Social Calls</h1>
    </div>
  );
}

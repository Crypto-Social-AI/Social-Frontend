import { type SocialPosts, PostsResponseSchema } from '../../types';
import createErrorMessage from '../notifications/createErrorMessage';

export async function getSocialCalls(): Promise<SocialPosts> {
  const url = 'http://localhost:4000/socialPost';

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await res.json();
    const validatedResponse = PostsResponseSchema.safeParse(data);

    if (!validatedResponse.success) {
      console.error(validatedResponse.error);
      return [];
    }

    return validatedResponse.data.socialPosts.results;
  } catch (error) {
    console.error('getSocialCalls', { error });
    createErrorMessage('Something went wrong fetching the data');
    throw error;
  }
}

import { z } from 'zod';
import { type SocialPosts, PostSchema } from '../../types';
import createErrorMessage from '../notifications/createErrorMessage';

export async function getSocialCalls(): Promise<SocialPosts> {
  const url = 'http://localhost:4000/socialPost';

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }

    const PostsArraySchema = z.array(PostSchema);
    const data = await res.json();
    const socialPosts = data.socialPosts;
    const validatedSocialPosts = PostsArraySchema.safeParse(socialPosts);

    if (!validatedSocialPosts.success) {
      console.error(validatedSocialPosts.error);
      return [];
    }

    return validatedSocialPosts.data;
  } catch (error) {
    console.error('getSocialCalls', { error });
    createErrorMessage('Something went wrong fetching the data');
    throw error;
  }
}

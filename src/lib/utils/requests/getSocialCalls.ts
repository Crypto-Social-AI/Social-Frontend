import { type z } from 'zod';
import { PostsResponseSchema, type SocialPostsSchema } from 'lib/schemas';
import createErrorMessage from '../notifications/createErrorMessage';
import { TABLE_RECORDS_PER_PAGE_LIMIT } from '../constants/general';

export type SocialCallsResponse = {
  socialPosts: z.infer<typeof SocialPostsSchema>['results'];
  totalPages: number;
  currentPage: number;
};

export async function getSocialCalls(
  page: number = 1,
  limit: number = TABLE_RECORDS_PER_PAGE_LIMIT,
): Promise<SocialCallsResponse> {
  const url = `http://localhost:4000/socialPost?page=${page}&limit=${limit}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await res.json();
    const validatedResponse = PostsResponseSchema.safeParse(data);

    if (!validatedResponse.success) {
      console.error(validatedResponse.error);
      return {
        socialPosts: [],
        totalPages: 0,
        currentPage: 0,
      };
    }

    return {
      socialPosts: validatedResponse.data.socialPosts.results,
      totalPages: validatedResponse.data.totalPages,
      currentPage: validatedResponse.data.currentPage,
    };
  } catch (error) {
    console.error('getSocialCalls', { error });
    createErrorMessage('Something went wrong fetching the data');
    throw error;
  }
}

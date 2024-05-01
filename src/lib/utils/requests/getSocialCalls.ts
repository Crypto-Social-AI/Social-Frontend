import { PostsResponseSchema } from 'lib/schemas';
import { type GenericResponse, type SocialPosts } from 'lib/types';
import createErrorMessage from '../notifications/createErrorMessage';
import { TABLE_RECORDS_PER_PAGE_LIMIT } from '../constants/general';
import { backendBaseUrl } from '../constants/baseUrls';

export async function getSocialCalls(
  page: number = 1,
  limit: number = TABLE_RECORDS_PER_PAGE_LIMIT,
): Promise<GenericResponse<SocialPosts>> {
  const url = `${backendBaseUrl}/socialPost?page=${page}&limit=${limit}`;

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
        data: [],
        totalPages: 0,
        currentPage: 0,
      };
    }

    return validatedResponse.data;
  } catch (error) {
    console.error('getSocialCalls', { error });
    createErrorMessage('Something went wrong fetching the data');
    throw error;
  }
}

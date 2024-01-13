import { AccountsResponseSchema } from 'lib/schemas';
import { type SocialAccountWithPost, type GenericResponse } from 'lib/types';
import createErrorMessage from '../notifications/createErrorMessage';
import { TABLE_RECORDS_PER_PAGE_LIMIT } from '../constants/general';

export async function getSocialAccounts(
  page: number = 1,
  limit: number = TABLE_RECORDS_PER_PAGE_LIMIT,
): Promise<GenericResponse<SocialAccountWithPost[]>> {
  const url = `http://localhost:4000/socialAccount?page=${page}&limit=${limit}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await res.json();
    const validatedResponse = AccountsResponseSchema.safeParse(data);

    if (!validatedResponse.success) {
      console.error(validatedResponse.error);
      createErrorMessage('Something went wrong while validating the data');
      // Return an object with default values if validation fails
      return {
        message: 'Validation failed',
        data: [],
        totalPages: 0,
        currentPage: 0,
      };
    }

    // Return the validated data
    return validatedResponse.data;
  } catch (error) {
    console.error('getSocialAccounts', { error });
    createErrorMessage('Something went wrong fetching the data');
    throw error;
  }
}

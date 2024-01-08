import { AccountsResponseSchema } from 'lib/schemas';
import { type SocialAccountsResponse } from 'lib/types';
import createErrorMessage from '../notifications/createErrorMessage';

export async function getSocialAccounts(page: number = 1): Promise<SocialAccountsResponse> {
  const url = `http://localhost:4000/socialAccount?page=${page}`;

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
        socialAccounts: [],
        totalPages: 0,
        currentPage: 0,
      };
    }

    // Return the validated data
    return validatedResponse.data;
  } catch (error) {
    console.error('getSocialAccounts', { error });
    createErrorMessage('Something went wrong fetching the data');
    // Return an object with default values in case of an error
    return {
      message: 'Error fetching data',
      socialAccounts: [],
      totalPages: 0,
      currentPage: 0,
    };
  }
}

import { z } from 'zod';
import { AccountWithPostsSchema } from 'lib/schemas';
import { type SocialAccountWithPost } from 'lib/types';
import createErrorMessage from '../notifications/createErrorMessage';

export async function getSocialAccounts(): Promise<SocialAccountWithPost[]> {
  const url = 'http://localhost:4000/socialAccount';

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }

    const AccountsWithPostsArraySchema = z.array(AccountWithPostsSchema);
    const data = await res.json();
    const socialAccounts = data.socialAccounts;
    const validatedSocialAccounts = AccountsWithPostsArraySchema.safeParse(socialAccounts);

    if (!validatedSocialAccounts.success) {
      console.error(validatedSocialAccounts.error);
      return [];
    }

    return validatedSocialAccounts.data;
  } catch (error) {
    console.error('getSocialAccounts', { error });
    createErrorMessage('Something went wrong fetching the data');
    return [];
  }
}

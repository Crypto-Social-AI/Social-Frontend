import { z } from 'zod';
import { type SocialAccountWithPost, AccountWithPostsSchema } from '../../types';

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
    return [];
  }
}

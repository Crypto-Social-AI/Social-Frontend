import { type SortConfig, type SocialAccountWithPost } from 'lib/types';

export default function sortData(data: SocialAccountWithPost[] | null, sortConfig: SortConfig | null) {
  if (!sortConfig) return data;
  if (!data) return null;

  return [...data].sort((a, b) => {
    const keyA = a[sortConfig.key as keyof SocialAccountWithPost];
    const keyB = b[sortConfig.key as keyof SocialAccountWithPost];

    // Check if the values are numbers
    if (typeof keyA === 'number' && typeof keyB === 'number') {
      // Sort numbers directly
      return (keyA - keyB) * (sortConfig.direction === 'asc' ? 1 : -1);
    } else {
      // Use localeCompare for strings (case-insensitive)
      return (
        keyA.toString().localeCompare(keyB.toString(), 'en', { sensitivity: 'base' }) *
        (sortConfig.direction === 'asc' ? 1 : -1)
      );
    }
  });
}

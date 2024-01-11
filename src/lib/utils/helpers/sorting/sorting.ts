import { type SortConfig } from 'lib/types';

// Generic sortData function
export default function sortData<T, K extends keyof T>(data: T[] | null, sortConfig: SortConfig<K> | null): T[] | null {
  if (!sortConfig || !data) return data;

  return [...data].sort((a: T, b: T) => {
    const key = sortConfig.key;
    const keyA = a[key];
    const keyB = b[key];

    // We need to check if both keyA and keyB are either numbers or strings
    if (typeof keyA === 'number' && typeof keyB === 'number') {
      return sortConfig.direction === 'asc' ? keyA - keyB : keyB - keyA;
    } else if (typeof keyA === 'string' && typeof keyB === 'string') {
      return sortConfig.direction === 'asc'
        ? keyA.localeCompare(keyB, 'en', { sensitivity: 'base' })
        : keyB.localeCompare(keyA, 'en', { sensitivity: 'base' });
    } else {
      // If values are neither numbers nor strings, or they are not of the same type, we don't sort them
      return 0;
    }
  });
}

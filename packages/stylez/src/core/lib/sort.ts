import type { Styles } from '../../types.js';

export const toSort = (styles: Styles): Styles =>
  Object.fromEntries(
    Object.entries(styles)
      .sort(([keyA], [keyB]) => {
        const isSelectorA = keyA.startsWith('&');
        const isSelectorB = keyB.startsWith('&');

        if (isSelectorA && !isSelectorB) return 1;
        if (!isSelectorA && isSelectorB) return -1;

        return keyA.localeCompare(keyB);
      })
      .map(([key, value]) => [
        key,
        typeof value === 'object' && value !== null && !Array.isArray(value)
          ? toSort(value as Styles)
          : value,
      ]),
  ) as unknown as Styles;

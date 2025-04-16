import { num } from '@estarlincito/utils';

export type stylesProps = Record<string, string | Record<string, string>>;

export const normalizeStyles = (styles: stylesProps): stylesProps =>
  Object.fromEntries(
    Object.entries(styles)
      .sort(([keyA], [keyB]) => {
        const isSelectorA = keyA.startsWith('&');
        const isSelectorB = keyB.startsWith('&');

        if (isSelectorA && !isSelectorB) return num('1');
        if (!isSelectorA && isSelectorB) return num('-1');

        return keyA.localeCompare(keyB);
      })
      .map(([key, value]) => [
        key,
        typeof value === 'object' && value !== null && !Array.isArray(value)
          ? normalizeStyles(value)
          : value,
      ]),
  ) as stylesProps;

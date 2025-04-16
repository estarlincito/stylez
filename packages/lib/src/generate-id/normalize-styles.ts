/* eslint-disable no-magic-numbers */

export type stylesProps = Record<string, string | Record<string, string>>;

export const normalizeStyles = (styles: stylesProps): stylesProps => {
  const data = Object.fromEntries(
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
          ? normalizeStyles(value)
          : value,
      ]),
  ) as stylesProps;

  return data;
};

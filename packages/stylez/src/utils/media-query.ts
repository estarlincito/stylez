import type { FlatCSS, Styles } from '@repo/lib';

export const toMediaQuery = (
  css: Record<string, FlatCSS>[],
  breakpoints: Styles['breakpoints'] = {
    lg: '1280px',
    md: '1024px',
    sm: '768px',
    xl: '1640px',
    xs: '520px',
  },
) => {
  const withMediaQueries = css.map((cssData) => {
    const data = Object.entries(cssData).map(([key, value]) => {
      if (key.startsWith('@')) {
        const minWidth =
          breakpoints[key.replace('@', '') as keyof typeof breakpoints];
        const media = `@media (min-width: ${minWidth})`;

        return [media, value];
      }
      return [key, value];
    });

    return Object.fromEntries(data) as Record<string, FlatCSS>;
  });

  return withMediaQueries;
};

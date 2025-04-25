import type { Breakpoints } from '../../types.js';
import type { CSS } from './css-generate.js';

export const toMediaQuery = (
  css: CSS,
  breakpoints: Breakpoints = {
    lg: '1280px',
    md: '1024px',
    sm: '768px',
    xl: '1640px',
    xs: '520px',
  },
): CSS =>
  css.map(([key, value]) => {
    if (key.startsWith('@')) {
      const minWidth =
        breakpoints[key.replace('@', '') as keyof typeof breakpoints];
      const media = `@media (min-width: ${minWidth})`;

      return [media, value];
    }
    return [key, value];
  });

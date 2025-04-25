import type { CSS } from './css-generate.js';

const getMediaMinWidth = (key: string) => {
  const match = key.match(/min-width:\s*(\d+)px/);

  return match ? parseInt(match[1] as string) : Infinity;
};

export const toCssSort = (css: CSS): CSS =>
  css.sort((a, b) => {
    const aKey = a[0];
    const bKey = b[0];

    const aIsMedia = aKey.startsWith('@media');
    const bIsMedia = bKey.startsWith('@media');

    if (aKey === 'root') return -1;
    if (bKey === 'root') return 1;

    if (!aIsMedia && bIsMedia) return -1;
    if (aIsMedia && !bIsMedia) return 1;

    if (aIsMedia && bIsMedia) {
      return getMediaMinWidth(aKey) - getMediaMinWidth(bKey);
    }

    return aKey.localeCompare(bKey);
  });

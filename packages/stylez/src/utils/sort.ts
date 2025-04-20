import { num } from '@estarlincito/utils';
import type { FlatCSS } from '@repo/lib';

const getMediaMinWidth = (key: string) => {
  const match = key.match(/min-width:\s*(\d+)px/);

  return match ? parseInt(match[num('1')] as string) : Infinity;
};

const isMediaQuery = (obj: FlatCSS) =>
  Object.keys(obj)[num('0')]?.startsWith('@media');

export const toSort = (rules: Record<string, FlatCSS>[]) =>
  rules.sort((a, b) => {
    const aKey = Object.keys(a)[num('0')] as string;
    const bKey = Object.keys(b)[num('0')] as string;

    const aIsMedia = isMediaQuery(a);
    const bIsMedia = isMediaQuery(b);

    if (aKey === 'root') return num('-1');
    if (bKey === 'root') return num('1');

    if (!aIsMedia && bIsMedia) return num('-1');
    if (aIsMedia && !bIsMedia) return num('1');

    if (aIsMedia && bIsMedia) {
      return getMediaMinWidth(aKey) - getMediaMinWidth(bKey);
    }

    return aKey.localeCompare(bKey);
  });

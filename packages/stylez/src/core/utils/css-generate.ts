import { toSelector } from '@/core/lib/selector.js';

import type { Breakpoints, Styles } from '../../types.js';
import { toCssSort } from './css-sort.js';
import { toMediaQuery } from './media-query.js';

// type Vars = Map<string, string | number>;
export type CSSProp = string | number;
export type CSS = [string, Record<string, CSSProp>][];

export const toCssGenerate = (styles: Styles[]) => {
  // const vars: Vars = new Map<string, string>();

  let breakpoints: Breakpoints | undefined;
  // [ '@md', { '.z_fb1b06a7': [Object], '.z_5c035a94': [Object] } ],
  const props: Record<string, Record<string, CSSProp>> = {};

  for (const style of styles) {
    const className = `.${toSelector(style)}`;
    for (const [key, value] of Object.entries(style)) {
      if (key === 'breakpoints') breakpoints = value as Breakpoints;
      else if (key.startsWith('@')) {
        (props[key] ??= {})[className] ??= value as CSSProp;
      } else {
        (props[className] ??= {})[key] ??= value as CSSProp;
      }
    }
  }

  // props['root'] ??= {};

  const css: CSS = Object.entries(props);
  const cssWithQueries = toMediaQuery(css, breakpoints);
  const sorted = toCssSort(cssWithQueries);

  return sorted;
};

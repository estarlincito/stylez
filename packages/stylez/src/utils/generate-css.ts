import { num } from '@estarlincito/utils';
import { type FlatCSS, type Styles, toSelector, type Vars } from '@repo/lib';

import { toCssProps } from './css-props.js';
import { toMediaQuery } from './media-query.js';
import { toSort } from './sort.js';

export const generateCssFrom = (styles: Styles[]) => {
  const css: Record<string, FlatCSS>[] = [];
  let breakpoints: Styles['breakpoints'];
  const vars: Vars = new Map<string, string>();

  for (const style of styles) {
    const className = `.${toSelector(style)}`;
    const props: Record<string, FlatCSS> = {};
    const styleData: [string, Styles][] = Object.entries(style);
    for (const [key, value] of styleData) {
      if (key === 'breakpoints') breakpoints = value as Styles['breakpoints'];
      else if (key.startsWith('@')) {
        const [flat, nested] = toCssProps(value, className, vars);
        css.push({ [key]: { ...flat, ...nested } });
      } else {
        props[key] ??= value;
      }
    }

    // Resolving Flat and Nested
    const [flat, nested] = toCssProps(props, className, vars);
    if (flat && Object.keys(flat).length !== num('0')) css.push(flat);
    if (nested && Object.keys(nested).length !== num('0')) css.push(nested);
  }
  // adding root
  css.push({ root: Object.fromEntries(vars) });
  // Resolving media query keys
  const withMediaQueries = toMediaQuery(css, breakpoints);
  // sorting css
  const sorted = toSort(withMediaQueries);

  return sorted;
};

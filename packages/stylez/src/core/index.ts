import { type Styles, toClassName } from '@repo/lib';

import { generateCssFrom } from '../utils/generate-css.js';

const seen = new Set<string>();
const css: Styles[] = [];

export const create = (styles: Styles) => {
  const hash = toClassName(styles);

  if (!seen.has(hash)) {
    seen.add(hash);
    css.push(styles);
  }

  return styles;
};

export const getAllCss = () => generateCssFrom(css);

export const className = (styles: Styles) =>
  Object.freeze({ className: toClassName(styles) });

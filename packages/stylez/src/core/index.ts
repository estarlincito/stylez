import { type Styles, toSelector } from '@repo/lib';

import { generateCssFrom } from '@/utils/generate-css.js';

const seen = new Set<string>();
const css: Styles[] = [];

/**
 * Registers a new style object for CSS generation.
 *
 * Ensures that the given style object is only registered once,
 * based on its selector hash. This function is intended to be
 * called at runtime wherever styles are defined.
 *
 * @param styles - A style object representing CSS rules.
 * @returns The original style object (unmodified).
 *
 * @example
 * const styles = stylez.create({ color: 'red', fontSize: '1.2rem' });
 */
export const create = (styles: Styles) => {
  const hash = toSelector(styles);

  if (!seen.has(hash)) {
    seen.add(hash);
    css.push(styles);
  }

  return styles;
};

/**
 * Returns a frozen object containing the className string
 * for a given style object.
 *
 * This does not register or collect the style — it must be passed
 * a style object previously created via `stylez.create()`.
 *
 * @param styles - A style object previously passed to `stylez.create`.
 * @returns An object like `{ className: 'zbf3a8096' }`.
 *
 * @example
 * const styles = stylez.create({ padding: '1rem' });
 *
 * const App = () => <div {...stylez.className(styles)}>Hello</div>;
 */
export const className = (styles: Styles) =>
  Object.freeze({ className: toSelector(styles) });
/**
 * 🚫 INTERNAL USE ONLY — Used by @stylezjs/stylez build tools to extract generated CSS.
 * Not intended for runtime usage.
 */
export const getAllCss = () => generateCssFrom(css);

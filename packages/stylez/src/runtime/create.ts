import { toSelector } from '../core/lib/selector.js';
import { toCssGenerate } from '../core/utils/css-generate.js';
import type { Styles } from '../types.js';

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
 * 🚫 INTERNAL USE ONLY — Used by @stylezjs/stylez build tools to extract generated CSS.
 * Not intended for runtime usage.
 */
export const getAllCss = () => Object.fromEntries(toCssGenerate(css));

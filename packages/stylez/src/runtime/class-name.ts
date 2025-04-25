import { toSelector } from '@/core/lib/selector.js';

import type { Styles } from '../types.js';

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

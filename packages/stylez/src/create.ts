import { toClassName } from '@repo/lib';
import type * as CSS from 'csstype';

/**
 * Creates a unique, deterministic CSS class name from style definitions.
 *
 * Accepts either a flat style object (standard CSS properties) or a nested
 * object containing selectors (e.g., `&:hover`, `& > div`) as keys and their
 * corresponding style objects as values.
 *
 * Internally, it serializes the structure and computes a hashed class name,
 * enabling consistent CSS generation across renders.
 *
 * @param {CSS.Properties<string | number> | Record<string, CSS.Properties<string | number>>} styles
 * A flat style object or an object with nested selectors and their style definitions.
 *
 * @returns {{ className: string }} An object containing the hashed, deterministic class name.
 * @example
 * // Create styles with nested selectors
 * const styles = stylez.create({
 *   backgroundColor: 'blue',
 *   '& > div': {
 *     color: 'red',
 *     height: '100%',
 *   },
 * });
 */
const create = (
  styles:
    | CSS.Properties<string | number>
    | Record<string, CSS.Properties<string | number>>,
): {
  className: string;
} => ({
  className: toClassName(
    styles as Record<string, string | Record<string, string>>,
  ),
});

export default create;

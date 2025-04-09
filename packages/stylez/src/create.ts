import { toClassName, toCssPro, toVarKey } from '@repo/lib';
import type * as CSS from 'csstype';

/**
 * Generates a unique, deterministic CSS class name based on the given style properties.
 *
 * This function serializes the provided CSS properties and uses a hash-based ID generator
 * to produce a class name string, typically prefixed (e.g., "z_").
 *
 * @param {CSS.Properties<string | number>} styles - The style object to generate a class name from.
 * @returns {{ className: string }} An object containing the generated class name.
 */
const create = (
  styles: CSS.Properties<string | number>,
): {
  className: string;
} => {
  const props: Record<string, string> = {};

  for (const prop in styles) {
    const value = (styles as Record<string, string | number>)[prop] ?? '';

    props[toCssPro(prop)] ??= `var(${toVarKey(value)})`;
  }

  return { className: toClassName(props) };
};

export default create;

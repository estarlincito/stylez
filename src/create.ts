import * as CSS from 'csstype';

import generateID from './generate-id.js';
/**
 * Creates a set of unique atomic CSS class names from the given styles.
 *
 * @param {CSS.Properties<string | number>} styles - The CSS properties to generate class names for.
 * @returns {Readonly<Set<string>>} A frozen set of generated class names.
 */
const create = (
  styles: CSS.Properties<string | number>,
): Readonly<Set<string>> => {
  const css = new Set<string>();

  for (const key in styles) {
    const atomkey = generateID(
      JSON.stringify({ [key]: styles[key as never] }),
      'z_',
    );
    css.add(atomkey);
  }

  return Object.freeze(css);
};

export default create;

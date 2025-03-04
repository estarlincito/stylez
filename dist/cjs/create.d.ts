import * as CSS from 'csstype';
/**
 * Creates a set of unique atomic CSS class names from the given styles.
 *
 * @param {CSS.Properties<string | number>} styles - The CSS properties to generate class names for.
 * @returns {Readonly<Set<string>>} A frozen set of generated class names.
 */
declare const create: (styles: CSS.Properties<string | number>) => Readonly<Set<string>>;
export default create;

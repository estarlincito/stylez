/**
 * Converts a set of class names into a frozen object with a `className` string.
 *
 * @param {Set<string>} styles - A set of generated class names.
 * @returns {Readonly<{ className: string }>} A frozen object containing the class names as a single string.
 */
declare const className: (styles: Set<string>) => Readonly<{
    className: string;
}>;
export default className;

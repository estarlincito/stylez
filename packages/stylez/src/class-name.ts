/**
 * Wraps a class name string in a frozen object with a `className` property.
 *
 * Useful for standardizing class name exports.
 *
 * @param {{ className: string }} classNameData - An object containing the generated class name.
 * @returns {Readonly<{ className: string }>} A frozen object with the class name.
 * @example
 * // Use in a React component
 * const App = () => (
 *   <div {...stylez.className(styles)}>
 *     <div>Child</div>
 *   </div>
 * );
 */
const className = (classNameData: {
  className: string;
}): Readonly<{ className: string }> => Object.freeze(classNameData);

export default className;

import className from './class-name.js';
import create from './create.js';
/**
 * A frozen utility object for handling styles.
 *
 * @property {typeof className} className - Converts a set of class names into a formatted string.
 * @property {typeof create} create - Generates a set of unique class names from styles.
 */
const stylez = Object.freeze({
  className,
  create,
});

export default stylez;

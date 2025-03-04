/**
 * A frozen utility object for handling styles.
 *
 * @property {typeof className} className - Converts a set of class names into a formatted string.
 * @property {typeof create} create - Generates a set of unique atomic class names from styles.
 */
declare const stylez: Readonly<{
    className: (styles: Set<string>) => Readonly<{
        className: string;
    }>;
    create: (styles: import('csstype').Properties<string | number>) => Readonly<Set<string>>;
}>;
export default stylez;

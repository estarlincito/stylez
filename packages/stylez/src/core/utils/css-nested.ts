// import type { Flat, Vars } from '../../types/styles.js';
// import { toCssFlat } from './css-flat.js';

// export const toCssNested = (
//   key: string,
//   props: Flat,
//   className: string,
//   vars: Vars,
// ) => {
//   const nestedArr = Object.entries(props);
//   const transformedNested = nestedArr.map(([nestedKey, nestedValue]) =>
//     toCssFlat(nestedKey, nestedValue, vars),
//   );

//   return [
//     key.replace('&', className),
//     Object.fromEntries(transformedNested) as Flat,
//   ];
// };

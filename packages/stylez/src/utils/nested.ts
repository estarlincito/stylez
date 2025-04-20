import type { FlatCSS, Vars } from '@repo/lib';

import { toFlat } from './flat.js';

export const toNested = (
  key: string,
  props: FlatCSS,
  className: string,
  vars: Vars,
) => {
  const nestedArr: [string, string][] = Object.entries(props);
  const transformedNested = nestedArr.map(([nestedKey, nestedValue]) =>
    toFlat(nestedKey, nestedValue, vars),
  );

  return [
    key.replace('&', className),
    Object.fromEntries(transformedNested) as FlatCSS,
  ];
};

import { num } from '@estarlincito/utils';
import type { FlatCSS, Vars } from '@repo/lib';

import { toFlat } from './flat.js';
import { toNested } from './nested.js';

export const toCssProps = (props: FlatCSS, className: string, vars: Vars) => {
  const propsData: [string, FlatCSS][] = Object.entries(props);

  type PropsData = [string[][], (string | FlatCSS)[][]];
  type Props = Record<string, FlatCSS>;

  const [flatData, nestedData] = propsData.reduce<PropsData>(
    ([flatArr, nestedArr], [key, value]) => {
      if (key.startsWith('&')) {
        nestedArr.push(toNested(key, value, className, vars));
      } else {
        flatArr.push(toFlat(key, value as string, vars));
      }

      return [flatArr, nestedArr];
    },
    [[], []],
  );

  const flat: Props =
    flatData.length === num('0')
      ? {}
      : { [className]: Object.fromEntries(flatData) };
  const nested: Props = Object.fromEntries(nestedData);

  return [flat, nested];
};

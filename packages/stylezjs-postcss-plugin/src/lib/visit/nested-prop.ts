import { num } from '@estarlincito/utils';

import type { Properties } from '@/types/index.js';

import type { Visit } from './index.js';
import { isFlatValue } from './is-prop.js';

export const toNestedProp = (prop: Properties, nested: Visit['styles']) => {
  const selector = prop.key.value;
  const nestedProps: Record<string, string> = {};

  for (const _prop of prop.value.properties) {
    if (isFlatValue(_prop)) {
      nestedProps[_prop.key.value] ??= _prop.value.value;
    }
  }

  if (Object.keys(nestedProps).length > num('0')) {
    nested.set(selector, nestedProps);
  }
};

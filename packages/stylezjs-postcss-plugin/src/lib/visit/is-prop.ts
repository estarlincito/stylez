import type { Properties } from '@/types/index.js';

// Validating prop
export const isValidKey = (prop: Properties) =>
  ['StringLiteral', 'Identifier'].includes(prop.key.type);

export const isFlatValue = (prop: Properties) =>
  ['StringLiteral', 'NumericLiteral'].includes(prop.value.type);

export const isNestedValue = (prop: Properties) =>
  prop.value.type === 'ObjectExpression';

export const isProp = (prop: Properties) =>
  (prop.type === 'KeyValueProperty' &&
    prop.key &&
    isValidKey(prop) &&
    prop.value &&
    isFlatValue(prop)) ||
  isNestedValue(prop);

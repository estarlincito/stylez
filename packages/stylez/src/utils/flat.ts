import { toCssProp, toVarKey, type Vars } from '@repo/lib';

export const toFlat = (key: string, value: string, vars: Vars) => {
  const varKey = toVarKey(value);
  if (!vars.get(varKey)) vars.set(varKey, value);
  return [toCssProp(key), `var(${toVarKey(value)})`];
};

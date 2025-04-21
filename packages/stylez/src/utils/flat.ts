import { toHash, type Vars } from '@repo/lib';

const toCssProp = (prop: string) =>
  prop.replace(/([A-Z])/g, (m: string) => `-${m.toLowerCase()}`);

const toVarKey = (value: string | number) => toHash(value, '--z');

export const toFlat = (key: string, value: string, vars: Vars) => {
  const varKey = toVarKey(value);
  if (!vars.get(varKey)) vars.set(varKey, value);
  return [toCssProp(key), `var(${toVarKey(value)})`];
};

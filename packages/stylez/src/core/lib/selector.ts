import type { Styles } from '../../types.js';
import { toHash } from './hash.js';

export const toSelector = (styles: Styles) =>
  toHash(JSON.stringify(styles), 'z_');

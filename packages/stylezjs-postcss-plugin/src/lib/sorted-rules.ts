import { num } from '@estarlincito/utils';
import type postcss from 'postcss';

const sortedRules = (rules: postcss.Rule[]) => [
  rules.sort((a, b) => {
    if (a.selector === ':root') return num('-1');
    if (b.selector === ':root') return num('1');
    return num('0');
  }),
];

export default sortedRules;

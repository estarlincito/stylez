import fs from 'node:fs/promises';

import swc from '@swc/core';
import pkg from 'fast-glob';
import postcss from 'postcss';

import type { Node } from '../types/index.js';
import sortedRules from './sorted-rules.js';
import { visit } from './visit.js';

const { glob } = pkg;

const styles = new Map<string, Record<string, string>>();
const vars = new Map<string, string>();

export const extractStylesFromFiles = async (patterns: string[]) => {
  const files = await glob(patterns);

  const promises = [];

  for (const file of files) {
    const code = fs.readFile(file, 'utf8');
    promises.push(code);
  }
  const codes = await Promise.all(promises);

  for (const code of codes) {
    const ast = swc.parseSync(code, {
      syntax: 'typescript',
      tsx: true,
    });

    visit({ node: ast as unknown as Node, styles, vars });
  }

  const root = postcss.root();
  const rules: postcss.Rule[] = [];

  // Adding styles
  // root vars
  const rootRule = postcss.rule({ selector: ':root' });
  vars.forEach((value, prop) => rootRule.append({ prop, value }));
  rules.push(rootRule);

  // Styles
  styles.forEach((props, selector) => {
    const stylesRule = postcss.rule({ selector: `.${selector}` });

    Object.entries(props).forEach(([prop, value]) => {
      stylesRule.append(postcss.decl({ prop, value }));
    });

    rules.push(stylesRule);
  });

  sortedRules(rules).forEach((rule) => root.append(rule));
  return root;
};

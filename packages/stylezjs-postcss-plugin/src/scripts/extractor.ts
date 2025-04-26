/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-await-in-loop */

import pkg from 'fast-glob';
const { glob } = pkg;

import { build } from 'esbuild';
import { existsSync, mkdirSync, rmSync } from 'fs';
import path from 'path';

const tmpDir = './.tmp';
if (!existsSync(tmpDir)) {
  mkdirSync(tmpDir, { recursive: true });
}

export const extractStylesFromFiles = async (patterns: string[]) => {
  const entryFiles = await glob(patterns);
  const format = process.env.BUILD_FORMAT as 'cjs' | 'esm';

  for (const entry of entryFiles) {
    const tmpFile = path.join(tmpDir, `tmp-${path.basename(entry)}.js`);

    await build({
      bundle: true,
      entryPoints: [entry],
      external: ['@stylezjs/stylez'],
      format,
      minify: true,
      outfile: tmpFile,
      platform: 'node',
    });

    if (format === 'esm') {
      await import(path.resolve(tmpFile));
    } else {
      require(path.resolve(tmpFile));
    }

    rmSync(tmpDir, { force: true, recursive: true });
  }

  let finalCss;
  if (format === 'esm') {
    const { getAllCss } = await import('@stylezjs/stylez');
    finalCss = getAllCss();
  } else {
    const { getAllCss } = require('@stylezjs/stylez');
    finalCss = getAllCss();
  }

  return finalCss;
};

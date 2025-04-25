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

  for (const entry of entryFiles) {
    const tmpFile = path.join(tmpDir, `tmp-${path.basename(entry)}.mjs`);

    await build({
      bundle: true,
      entryPoints: [entry],
      external: ['@stylezjs/stylez'],
      format: 'esm',
      minify: true,
      outfile: tmpFile,
      platform: 'node',
    });

    // return 'entry';
    await import(path.resolve(tmpFile));
    rmSync(tmpDir, { force: true, recursive: true });
  }

  const { getAllCss } = await import('@stylezjs/stylez');
  const finalCss = getAllCss();

  return finalCss;
};

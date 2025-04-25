/* eslint-disable no-undef */
import * as esbuild from 'esbuild';

import { num } from '@estarlincito/utils';

const args = process.argv.slice(num('2'));

const isWatch = args.includes('-w');
/** @type {esbuild.BuildOptions} */
const buildOptions = {
  logLevel: 'info',
  sourcemap: true,
  bundle: true,
  entryPoints: ['src/index.ts'],
  minify: true,
  outfile: 'dist/index.js',
  treeShaking: true,
  packages: 'external',
  target: 'esnext',
  format: 'esm',
  platform: 'node',
};

if (isWatch) {
  const ctx = await esbuild.context({ ...buildOptions, logLevel: 'info' });
  ctx.watch();
} else {
  await esbuild.build(buildOptions);
}

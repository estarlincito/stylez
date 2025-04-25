/* eslint-disable no-console */
import process from 'node:process';

import { logError } from '@estarlincito/utils';
import * as esbuild from 'esbuild';

const formats = ['esm' as const, 'cjs' as const].map((format) => ({
  ext: `.${format === 'esm' ? 'mjs' : format}`,
  format,
}));

const isFooter = (format: string) =>
  format === 'cjs' && process.cwd().includes('stylezjs-postcss-plugin')
    ? {
        footer: { js: 'module.exports = plugin.default || plugin;' },
      }
    : { minify: true };

export const runBuild = async (isWatch: boolean) => {
  console.log();
  const buildConfigs = await Promise.all(
    formats.map(
      async ({ ext, format }) =>
        ({
          bundle: true,
          entryPoints: ['src/index.ts'],
          ...isFooter(format),
          format,
          logLevel: 'info',
          outfile: `dist/index${ext}`,
          packages: 'external',
          platform: 'node',
          sourcemap: format === 'esm',
          target: 'esnext',
          treeShaking: true,
        }) satisfies esbuild.BuildOptions,
    ),
  );

  if (isWatch) {
    try {
      const contexts = await Promise.all(
        buildConfigs.map((config) => esbuild.context(config)),
      );

      contexts.forEach((ctx) => ctx.watch());
    } catch (error: unknown) {
      logError('❌ Initial build failed:', error);
      process.exit(1);
    }
  } else {
    try {
      await Promise.all(buildConfigs.map((config) => esbuild.build(config)));
      console.log('✅ Build completed');
    } catch (error: unknown) {
      logError('❌ Build failed:', error);
      process.exit(1);
    }
  }
};

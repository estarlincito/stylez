/* eslint-disable sort-keys-fix/sort-keys-fix */
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const getFilesRecursively = (dir: string) => {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat?.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else if (!filePath.includes('types')) {
      results.push(filePath);
    }
  });

  return results;
};

const dir = path.resolve(__dirname, 'src');

const getComponentEntries = (_dir: string) => {
  const allFiles = getFilesRecursively(_dir);
  const componentFiles = allFiles.filter((file) => file.endsWith('.ts'));

  const entry = componentFiles.reduce((acc: Record<string, string>, file) => {
    const relative = path.relative(_dir, file);
    const entryName = relative.replace(/\.(tsx|ts)$/, '');

    return { ...acc, [entryName]: file };
  }, {});

  return entry;
};

const dtsPlugin = dts({
  entryRoot: 'src',
  insertTypesEntry: true,
  outDir: ['dist/esm', 'dist/cjs'],
  tsconfigPath: './tsconfig.json',
});

export default defineConfig({
  build: {
    ssr: true,
    lib: {
      entry: getComponentEntries(dir),
    },
    minify: true,
    target: 'esnext',

    rollupOptions: {
      output: [
        {
          format: 'esm',
          dir: 'dist/esm',
          entryFileNames: '[name].mjs',
          preserveModules: true,
          // globals: {
          //   swc: '@swc/core',
          // },
        },
        {
          format: 'cjs',
          dir: 'dist/cjs',
          entryFileNames: '[name].cjs',
          preserveModules: true,
          // globals: {
          //   swc: '@swc/core',
          // },
        },
      ],
    },
  },
  plugins: [dtsPlugin],
  resolve: {
    alias: {
      '@': dir,
    },
  },
});

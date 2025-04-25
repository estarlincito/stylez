/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { exec } from 'child_process';
import { promisify } from 'util';

import { runBuild } from '@/scripts/esbuild.js';

const execAsync = promisify(exec);

export const log = async (command: string, label: string) => {
  console.log(`\n🔸 ${label}...`);
  try {
    const { stdout, stderr } = await execAsync(command);
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
    console.log(`✅ ${label} completed!\n`);
  } catch (err: any) {
    console.log(`❌ ${label} failed:\n${err.stderr ?? err.message}`);
    process.exit(1);
  }
};

const args = process.argv.slice(2);
const isWatch = args.includes('-w');

/* eslint-disable no-console */
const runBundle = async () => {
  if (isWatch) {
    await runBuild(isWatch);
  } else {
    console.log('🚀 Starting process...\n');
    await log('rm -rf dist', 'Cleaning dist folder');
    await log('pnpm eslint .', 'Linting project');
    await log('tsc --project tsconfig.json', 'Building TypeScript types');

    await runBuild(isWatch);
    console.log('✨ All done! Your project is ready.\n');
  }
};

runBundle().catch((e) => {
  console.error('🔥 Build failed:', e);
  process.exit(1);
});

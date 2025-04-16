import type postcss from 'postcss';

import saving from './lib/saving.js';
import { extractStylesFromFiles } from './lib/swc-extractor.js';

const state = {
  duplicatesFound: false,
  processed: false,
};

const plugin = ({ patterns }: { patterns: string[] }) => ({
  async Once(root: postcss.Root) {
    if (state.duplicatesFound) return;

    const atRule = root.first as postcss.AtRule | undefined;
    const filePath = atRule?.source?.input?.file;

    if (atRule?.name === 'stylez' && filePath?.includes(process.cwd())) {
      if (state.processed) {
        state.duplicatesFound = true;
        process.stdout.write(
          '⛔️ Multiple @stylez files detected. Remove duplicates before processing.\n\n',
        );
        return;
      }

      state.processed = true;
      const extractedRoot = await extractStylesFromFiles(patterns);

      if (state.duplicatesFound) return;

      root.removeAll();

      extractedRoot.each((node) => {
        root.append(node.clone());
      });

      await saving(root, filePath);

      process.stdout.write(`🎨 Styles saved to: ${filePath}\n\n`);
    }
  },

  postcssPlugin: '@stylezjs/postcss-plugin',
});

plugin.postcss = true;
export default plugin;

// void extractStylesFromFiles(['**/*test.js']).then((result) => {
//   // eslint-disable-next-line no-console
//   console.log(result.toString());
// });

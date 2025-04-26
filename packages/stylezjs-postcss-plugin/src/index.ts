import { writeFileSync } from 'node:fs';

import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import { parse } from 'postcss-js';
import nested from 'postcss-nested';

import { extractStylesFromFiles } from './scripts/extractor.js';

const state = {
  duplicatesFound: false,
  processed: false,
};

interface PluginOptions {
  patterns?: string[];
}

const plugin: postcss.PluginCreator<PluginOptions> = (opts) => ({
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

      try {
        state.processed = true;

        const styles = await extractStylesFromFiles(opts?.patterns ?? []);

        if (state.duplicatesFound) return;

        root.removeAll();

        const result = await postcss([nested, autoprefixer]).process(styles, {
          from: undefined,
          parser: parse,
        });

        if (result.css.length === 0) return;

        const finalCSS = `@stylez;\n\n${result.css}`;

        writeFileSync(filePath, finalCSS);

        process.stdout.write(`🎨 Styles saved to: ${filePath}\n\n`);
      } catch {
        process.stdout.write('Issue saving styles');
      }
    }
  },

  postcssPlugin: '@stylezjs/postcss-plugin',
});

plugin.postcss = true;

export default plugin;

// Test
// void (async () => {
//   const styles = await extractStylesFromFiles(['src/test/**/*.mts']);

//   if (state.duplicatesFound) return;

//   const result = await postcss([nested, autoprefixer]).process(styles, {
//     from: undefined,
//     parser: parse,
//   });

//   if (result.css.length === 0) return;

//   const finalCSS = `@stylez;\n\n${result.css}`;

//   // writeFileSync(filePath, finalCSS);

//   process.stdout.write(finalCSS);
// })();

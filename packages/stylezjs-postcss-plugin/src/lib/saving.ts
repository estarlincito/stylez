import autoprefixer from 'autoprefixer';
import { writeFileSync } from 'fs';
import postcss from 'postcss';

const saving = async (root: postcss.Root, filePath: string) => {
  await postcss([autoprefixer])
    .process(root, {
      from: undefined,
    })
    .then((result) => {
      const finalCSS = `@stylez;\n\n${result.css}`;
      writeFileSync(filePath, finalCSS);
    });
};

export default saving;

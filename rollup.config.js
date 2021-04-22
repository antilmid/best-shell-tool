import { uglify } from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript2';

const output = process.env.NODE_ENV === 'publish' ? 'npm_publish/dist/index.js' : 'dist/index.js';

export default {
  input: 'src/index.ts',
  output: {
    file: output,
    format: 'cjs',
  },
  plugins: [
    uglify(),
    typescript({
      tsconfig: 'tsconfig.json',
    }),
  ],
};

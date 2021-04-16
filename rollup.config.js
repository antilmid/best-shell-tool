import { uglify } from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [
    uglify(),
    typescript({
      tsconfig: 'tsconfig.json',
    }),
  ],
};

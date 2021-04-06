import { uglify } from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [uglify(), typescript({ 
    tsconfig: 'tsconfig.json'
   })]
}
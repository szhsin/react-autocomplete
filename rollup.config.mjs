import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';

const createBuild = ({
  inPath = '',
  outPath = inPath,
  inFile = 'index.ts',
  outFile = 'index.js'
} = {}) => ({
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  plugins: [
    nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    })
  ],
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false
  },
  input: `src/${inPath}${inFile}`,
  output: [
    {
      file: `dist/${outPath}cjs/${outFile}`,
      format: 'cjs',
      interop: 'default'
    },
    {
      dir: `dist/${outPath}esm`,
      format: 'es',
      preserveModules: true
    }
  ]
});

export default [createBuild()];

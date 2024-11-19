import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';

const config = {
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
  input: ['src/index.ts', 'src/features/atom/index.ts', 'src/features/molecule/index.ts'],
  output: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
      interop: 'default',
      preserveModules: true
    },
    {
      dir: 'dist/esm',
      format: 'es',
      preserveModules: true
    }
  ]
};

export default config;

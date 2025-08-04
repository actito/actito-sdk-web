import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import pkg from './package.json' with { type: 'json' };

export default [
  /**
   * Bundle sources
   */
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [esbuild()],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  },
  /**
   * Bundle type definitions
   */
  {
    input: 'dist/intermediate/index.d.ts',
    output: [
      {
        file: 'dist/index.d.cts',
        format: 'cjs',
      },
      {
        file: 'dist/index.d.mts',
        format: 'esm',
      },
    ],
    plugins: [dts()],
  },
];

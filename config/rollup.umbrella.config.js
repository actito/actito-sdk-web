import { buildSources, buildStylesheet, buildTypeDefinitions } from './rollup.library.config.js';

/**
 * @typedef {import('rollup').RollupOptions} RollupOptions
 */

/**
 * Builds the configurations for the provided package components.
 *
 * @param {Object} pkg - The package object containing components to build.
 * @param {Array} pkg.components - An array of component names to process.
 * @return {Array} An array of configurations generated for the components.
 */
export function build(pkg) {
  const components = pkg.components;
  if (!components || !Array.isArray(components)) {
    throw new Error('Components must be an array of component names');
  }

  return components.flatMap(component => {
    const configurations = [
      buildSources(
        {
          main: `${component}/dist/index.cjs`,
          module: `${component}/dist/index.mjs`,
        },
        {
          input: `${component}/index.ts`,
        },
      ),
      buildTypeDefinitions({
        input: `dist/intermediate/${component}/index.d.ts`,
        outDir: `${component}/dist`,
      }),
    ];

    if (['in-app-messaging', 'push', 'push-ui'].includes(component)) {
      configurations.push(
        buildStylesheet({
          input: `${component}/${component}.css`,
          output: `${component}/dist/${component}.css`,
        }),
      );
    }

    return configurations;
  });
}

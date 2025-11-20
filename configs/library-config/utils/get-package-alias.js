import fs from 'fs';
import path from 'path';

export function getPackageAlias() {
  const tsconfig = readTsConfig('./tsconfig.json');

  const paths = tsconfig.compilerOptions.paths ?? {};
  const baseUrl = tsconfig.compilerOptions.baseUrl ?? '.';

  return Object.entries(paths).flatMap(([key, values]) => {
    const find = key.replace('/*', '');
    return values.map((p) => {
      const replacement = path.resolve(baseUrl, p.replace('/*', ''));
      return { find, replacement };
    });
  });
}

function readTsConfig(filePath) {
  const json = fs.readFileSync(filePath, 'utf8');
  const tsconfig = JSON.parse(json);

  if (tsconfig.extends) {
    const basePath = tsconfig.extends;

    const baseConfig = readTsConfig(basePath);
    return {
      ...baseConfig,
      ...tsconfig,
      compilerOptions: {
        ...baseConfig.compilerOptions,
        ...tsconfig.compilerOptions,
      },
    };
  }

  return tsconfig;
}

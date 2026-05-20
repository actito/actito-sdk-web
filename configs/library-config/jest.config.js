import { TS_EXT_TO_TREAT_AS_ESM, ESM_TS_TRANSFORM_PATTERN, pathsToModuleNameMapper } from 'ts-jest';
import { URL, fileURLToPath } from 'url';

const GLOBAL_SETUP_FILE = fileURLToPath(new URL('./jest.setup.js', import.meta.url));

export function configureJest(tsconfigPaths, setupFiles = []) {
  return {
    extensionsToTreatAsEsm: [...TS_EXT_TO_TREAT_AS_ESM],
    transform: {
      [ESM_TS_TRANSFORM_PATTERN]: [
        'ts-jest',
        {
          useESM: true,
        },
      ],
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [GLOBAL_SETUP_FILE, ...setupFiles],
    moduleNameMapper: pathsToModuleNameMapper(tsconfigPaths, {
      prefix: '<rootDir>/',
    }),
    roots: ['<rootDir>/src', '<rootDir>/tests'],
  };
}

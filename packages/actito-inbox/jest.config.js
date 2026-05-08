import baseConfig from '@actito/library-config/jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json' with { type: 'json' };

const { compilerOptions } = tsconfig;

/** @type {import('@jest/types').Config.InitialOptions} **/
const config = {
  ...baseConfig,
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};

export default config;

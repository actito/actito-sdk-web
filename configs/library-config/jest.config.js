import { TS_EXT_TO_TREAT_AS_ESM, ESM_TS_TRANSFORM_PATTERN } from 'ts-jest';

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  extensionsToTreatAsEsm: [...TS_EXT_TO_TREAT_AS_ESM],
  transform: {
    [ESM_TS_TRANSFORM_PATTERN]: [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};

export default config;

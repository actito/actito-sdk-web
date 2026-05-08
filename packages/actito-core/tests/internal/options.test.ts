import { describe, expect, test } from '@jest/globals';
import {
  type ActitoInternalOptions,
  type ActitoInternalOptionsHosts,
  isDefaultHosts,
  validate,
} from '~/internal/options';

describe('test isDefaultHosts', () => {
  test('when customs hosts are provided but they are the same as the default ones, it returns true', () => {
    const input: ActitoInternalOptionsHosts = {
      cloudApi: 'https://cloud.notifica.re',
      restApi: 'https://push.notifica.re',
    };

    expect(isDefaultHosts(input)).toBe(true);
  });

  test('when customs hosts are provided but they do not correspond to the default ones, it returns false', () => {
    const input: ActitoInternalOptionsHosts = {
      cloudApi: 'https://custom-cloud-api.com',
      restApi: 'https://custom-rest-api.com',
    };

    expect(isDefaultHosts(input)).toBe(false);
  });
});

describe('test validate', () => {
  const MINIMAL_ACTITO_INTERNAL_OPTIONS = {
    applicationHost: 'https://my-domain.com',
    applicationKey: 'xxxxxxxxxxxx',
    applicationSecret: 'xxxxxxxxxxxx',
    applicationVersion: '1.0.0',
  };

  const VALID_HOSTS = [
    'http://my-domain',
    'https://my-domain.com',
    'https://www.my-domain.com',
    'http://localhost',
    'http://localhost:3000',
    'https://api.my-domain.com',
    'https://sub.my-domain.co.uk',
  ];

  const INVALID_HOSTS = [
    'ftp://my-domain.com',
    'https://-my-domain.com',
    'https://my-domain-.com',
    'https://my-domain.com/',
    'https://my-domain.com/path',
    'https://my-domain.com?query=1',
    'https://',
    'my-domain.com',
    'http://:3000',
  ];

  test.each(VALID_HOSTS)('when both hosts are valid, it does nothing', (host) => {
    const input: ActitoInternalOptions = {
      ...MINIMAL_ACTITO_INTERNAL_OPTIONS,
      hosts: {
        cloudApi: host,
        restApi: host,
      },
    };

    expect(() => {
      validate(input);
    }).not.toThrow();
  });

  test.each(INVALID_HOSTS)('when there is an invalid host, it throws an error', (host) => {
    const input: ActitoInternalOptions = {
      ...MINIMAL_ACTITO_INTERNAL_OPTIONS,
      hosts: {
        cloudApi: host,
        restApi: host,
      },
    };

    expect(() => {
      validate(input);
    }).toThrow();
  });
});

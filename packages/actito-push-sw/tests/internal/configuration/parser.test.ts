import { describe, expect, jest, test, beforeEach } from '@jest/globals';
import type { WorkerConfiguration } from '~/internal/configuration/worker-configuration';
import type { WorkerNotification } from '~/internal/internal-types';

describe('test parseWorkerConfiguration', () => {
  const FULL_WORKER_CONFIGURATION: WorkerConfiguration = {
    cloudHost: 'https://cloud.notifica.re',
    applicationId: 'app-123',
    applicationKey: 'key-123',
    applicationSecret: 'secret-123',
    deviceId: 'device-123',
    standalone: true,
  };

  const mockWorkerModule = (mockGetServiceWorkerLocation: () => Partial<WorkerLocation>) => {
    jest.unstable_mockModule('~/internal/utils/worker', () => {
      return {
        getServiceWorkerLocation: () => mockGetServiceWorkerLocation(),
        base64Decode: (data: string) => atob(data),
      };
    });
  };

  beforeEach(() => {
    jest.resetModules();
  });

  test('when the worker has a valid configuration, it should return the configuration as expected', async () => {
    const mockGetServiceWorkerLocation = () => {
      const encodedConfig = btoa(JSON.stringify(FULL_WORKER_CONFIGURATION));

      return { search: `?notificareConfig=${encodedConfig}` };
    };

    mockWorkerModule(mockGetServiceWorkerLocation);

    const { parseWorkerConfiguration } = await import('~/internal/configuration/parser');

    const expectedOutput: WorkerNotification = FULL_WORKER_CONFIGURATION;

    expect(parseWorkerConfiguration()).toStrictEqual(expectedOutput);
  });

  test('when the worker configuration does not exist (missing notificareConfig search param), it should return undefined', async () => {
    const mockGetServiceWorkerLocation = () => ({
      search: '?someParam=123',
    });

    mockWorkerModule(mockGetServiceWorkerLocation);

    const { parseWorkerConfiguration } = await import('~/internal/configuration/parser');

    expect(parseWorkerConfiguration()).toBeUndefined();
  });

  test.each([
    ['cloudHost', { cloudHost: undefined }],
    ['applicationKey', { applicationKey: undefined }],
    ['applicationSecret', { applicationSecret: undefined }],
    ['deviceId', { deviceId: undefined }],
  ])(
    "when the worker configuration is missing the '%s' field, it should return undefined",
    async (_, config: Partial<WorkerConfiguration>) => {
      const mockGetServiceWorkerLocation = () => {
        const encodedConfig = btoa(JSON.stringify({ ...FULL_WORKER_CONFIGURATION, ...config }));

        return { search: `?notificareConfig=${encodedConfig}` };
      };

      mockWorkerModule(mockGetServiceWorkerLocation);

      const { parseWorkerConfiguration } = await import('~/internal/configuration/parser');

      expect(parseWorkerConfiguration()).toBeUndefined();
    },
  );
});

import { logger } from './logger';

// eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
let _options: ActitoInternalOptions | undefined;

export const DEFAULT_CLOUD_API_HOST = 'https://cloud.notifica.re';
export const DEFAULT_REST_API_HOST = 'https://push.notifica.re';
const HOST_REGEX =
  /^(https?:\/\/)?(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])(:[0-9]{1,5})?$/;

export function getOptions(): ActitoInternalOptions | undefined {
  return _options;
}

export function setOptions(options: ActitoInternalOptions) {
  validateHosts(options.hosts);

  const hosts = ensureHostsHttpPrefix(options.hosts);

  _options = { ...options, hosts };
}

export function isDefaultHosts(hosts: ActitoInternalOptionsHosts): boolean {
  return hosts.cloudApi === DEFAULT_CLOUD_API_HOST && hosts.restApi === DEFAULT_REST_API_HOST;
}

function validateHosts({ cloudApi, restApi }: ActitoInternalOptionsHosts) {
  if (!HOST_REGEX.test(cloudApi)) {
    logger.warning('Invalid CLOUD API host.');
    throw new Error('Invalid CLOUD API host.');
  }

  if (!HOST_REGEX.test(restApi)) {
    logger.warning('Invalid REST API host.');
    throw new Error('Invalid REST API host.');
  }
}

function ensureHostsHttpPrefix({
  cloudApi,
  restApi,
}: ActitoInternalOptionsHosts): ActitoInternalOptionsHosts {
  const hasHttpRegex = /^https?:\/\//;

  return {
    cloudApi: hasHttpRegex.test(cloudApi) ? cloudApi : `https://${cloudApi}`,
    restApi: hasHttpRegex.test(restApi) ? restApi : `https://${restApi}`,
  };
}

export interface ActitoInternalOptions {
  hosts: ActitoInternalOptionsHosts;
  applicationKey: string;
  applicationSecret: string;
  applicationHost: string;
  applicationVersion: string;
  language?: string;
  serviceWorker?: string;
  serviceWorkerScope?: string;
  geolocation?: ActitoInternalOptionsGeolocation;
}

export interface ActitoInternalOptionsHosts {
  cloudApi: string;
  restApi: string;
}

export interface ActitoInternalOptionsGeolocation {
  timeout?: number;
  enableHighAccuracy?: boolean;
  maximumAge?: number;
}

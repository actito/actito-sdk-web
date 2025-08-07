let _options: ActitoInternalOptions | undefined;

export const DEFAULT_CLOUD_API_HOST = 'cloud.notifica.re';
export const DEFAULT_REST_API_HOST = 'push.notifica.re';

export function getOptions(): ActitoInternalOptions | undefined {
  return _options;
}

export function setOptions(options: ActitoInternalOptions) {
  _options = options;
}

export function isDefaultHosts(hosts: ActitoInternalOptionsHosts): boolean {
  return hosts.cloudApi === DEFAULT_CLOUD_API_HOST && hosts.restApi === DEFAULT_REST_API_HOST;
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

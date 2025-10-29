import type { ActitoNotification } from '@actito/web-core';

export interface ActitoInboxItem {
  readonly id: string;
  readonly notification: ActitoNotification;
  readonly time: string;
  readonly opened: boolean;
  readonly expires?: string;
}

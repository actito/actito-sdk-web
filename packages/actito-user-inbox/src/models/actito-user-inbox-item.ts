import { ActitoNotification } from '@Actito/web-core';

export interface ActitoUserInboxItem {
  readonly id: string;
  readonly notification: ActitoNotification;
  readonly time: string;
  readonly opened: boolean;
  readonly expires?: string;
}

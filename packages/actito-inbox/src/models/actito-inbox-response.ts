import type { ActitoInboxItem } from './actito-inbox-item';

export interface ActitoInboxResponse {
  readonly items: ActitoInboxItem[];
  readonly count: number;
  readonly unread: number;
}

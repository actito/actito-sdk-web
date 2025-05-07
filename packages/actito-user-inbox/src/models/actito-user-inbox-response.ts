import { ActitoUserInboxItem } from './actito-user-inbox-item';

export interface ActitoUserInboxResponse {
  readonly items: ActitoUserInboxItem[];
  readonly count: number;
  readonly unread: number;
}

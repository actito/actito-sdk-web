import type { ActitoInboxItem } from './actito-inbox-item';

/**
 * Represents the response returned when fetching a device's inbox.
 *
 * An {@link ActitoInboxResponse} contains the total number of inbox items,
 * the number of unread items, and the list of items themselves.
 */
export interface ActitoInboxResponse {
  /**
   * Total number of items in the device's inbox.
   */
  readonly items: ActitoInboxItem[];

  /**
   * Number of unread items in the device's inbox.
   */
  readonly count: number;

  /**
   * List of inbox items for the device.
   */
  readonly unread: number;
}

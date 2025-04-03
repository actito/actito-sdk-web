export interface ActitoNotification {
  readonly id: string;
  readonly partial: boolean;
  readonly type: string;
  readonly time: string;
  readonly title?: string;
  readonly subtitle?: string;
  readonly message: string;
  readonly content: ActitoNotificationContent[];
  readonly actions: ActitoNotificationAction[];
  readonly attachments: ActitoNotificationAttachment[];
  readonly extra: ActitoNotificationExtra;
}

export interface ActitoNotificationContent {
  readonly type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly data: any;
}

export interface ActitoNotificationAction {
  readonly id: string;
  readonly type: string;
  readonly label: string;
  readonly target?: string;
  readonly keyboard: boolean;
  readonly camera: boolean;
}

export interface ActitoNotificationAttachment {
  readonly mimeType: string;
  readonly uri: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActitoNotificationExtra = Record<string, any>;

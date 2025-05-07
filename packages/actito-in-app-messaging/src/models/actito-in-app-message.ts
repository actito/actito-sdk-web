export interface ActitoInAppMessage {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly context: string[];
  readonly title?: string;
  readonly message?: string;
  readonly image?: string;
  readonly landscapeImage?: string;
  readonly delaySeconds: number;
  readonly primaryAction?: ActitoInAppMessageAction;
  readonly secondaryAction?: ActitoInAppMessageAction;
}

export interface ActitoInAppMessageAction {
  readonly label?: string;
  readonly destructive: boolean;
  readonly url?: string;
}

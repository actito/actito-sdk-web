export interface ActitoApplication {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly branding: boolean;
  readonly services: Record<string, boolean>;
  readonly inboxConfig?: ActitoApplicationInboxConfig;
  readonly regionConfig?: ActitoApplicationRegionConfig;
  readonly websitePushConfig?: ActitoApplicationWebsitePushConfig;
  readonly userDataFields: ActitoApplicationUserDataField[];
  readonly actionCategories: ActitoApplicationActionCategory[];
  readonly enforceSizeLimit?: boolean;
}

export interface ActitoApplicationInboxConfig {
  readonly useInbox: boolean;
  readonly useUserInbox: boolean;
  readonly autoBadge: boolean;
}

export interface ActitoApplicationRegionConfig {
  readonly proximityUUID?: string;
}

export interface ActitoApplicationWebsitePushConfig {
  readonly icon: string;
  readonly allowedDomains: string[];
  readonly urlFormatString?: string;
  readonly info?: ActitoApplicationWebsitePushConfigInfo;
  readonly vapid?: ActitoApplicationWebsitePushConfigVapid;
  readonly launchConfig?: ActitoApplicationWebsitePushConfigLaunchConfig;
  readonly ignoreTemporaryDevices?: boolean;
  readonly ignoreUnsupportedWebPushDevices?: boolean;
}

export interface ActitoApplicationWebsitePushConfigInfo {
  readonly subject: {
    readonly UID: string;
    readonly CN: string;
    readonly OU: string;
    readonly O: string;
    readonly C: string;
  };
}

export interface ActitoApplicationWebsitePushConfigVapid {
  readonly publicKey: string;
}

export interface ActitoApplicationWebsitePushConfigLaunchConfig {
  readonly autoOnboardingOptions?: ActitoApplicationWebsitePushConfigLaunchConfigAutoOnboardingOptions;
  readonly floatingButtonOptions?: ActitoApplicationWebsitePushConfigLaunchConfigFloatingButtonOptions;
}

export interface ActitoApplicationWebsitePushConfigLaunchConfigAutoOnboardingOptions {
  readonly message: string;
  readonly cancelButton: string;
  readonly acceptButton: string;
  readonly retryAfterHours?: number;
  readonly showAfterSeconds?: number;
}

export interface ActitoApplicationWebsitePushConfigLaunchConfigFloatingButtonOptions {
  readonly alignment: {
    readonly horizontal: ActitoApplicationWebsitePushConfigLaunchConfigFloatingButtonHorizontalAlignment;
    readonly vertical: ActitoApplicationWebsitePushConfigLaunchConfigFloatingButtonVerticalAlignment;
  };
  readonly permissionTexts: ActitoApplicationWebsitePushConfigLaunchConfigFloatingButtonPermissionTexts;
}

export type ActitoApplicationWebsitePushConfigLaunchConfigFloatingButtonHorizontalAlignment =
  | 'start'
  | 'center'
  | 'end'
  | string;

export type ActitoApplicationWebsitePushConfigLaunchConfigFloatingButtonVerticalAlignment =
  | 'top'
  | 'center'
  | 'bottom'
  | string;

export interface ActitoApplicationWebsitePushConfigLaunchConfigFloatingButtonPermissionTexts {
  readonly default: string;
  readonly granted: string;
  readonly denied: string;
}

export interface ActitoApplicationUserDataField {
  readonly type: string;
  readonly key: string;
  readonly label: string;
}

export interface ActitoApplicationActionCategory {
  readonly type: string;
  readonly name: string;
  readonly description?: string;
  readonly actions: ActitoApplicationActionCategoryAction[];
}

export interface ActitoApplicationActionCategoryAction {
  readonly id: string;
  readonly type: string;
  readonly label: string;
  readonly target?: string;
  readonly keyboard: boolean;
  readonly camera: boolean;
  readonly destructive?: boolean;
  readonly icon?: ActitoApplicationActionCategoryActionIcon;
}

export interface ActitoApplicationActionCategoryActionIcon {
  readonly android?: string;
  readonly ios?: string;
  readonly web?: string;
}

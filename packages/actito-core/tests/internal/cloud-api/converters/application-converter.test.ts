import type { CloudApplication } from '@actito/web-cloud-api';
import { describe, expect, test } from '@jest/globals';
import { convertCloudApplicationToPublic } from '~/internal/cloud-api/converters/application-converter';
import type { ActitoApplication } from '~/models/actito-application';

describe('test convertCloudApplicationToPublic', () => {
  const MINIMAL_CLOUD_APPLICATION: CloudApplication = {
    _id: '1d9e80ef851d212aca82cf23',
    name: 'App',
    category: 'Other',
  };

  const MINIMAL_ACTITO_APPLICATION: ActitoApplication = {
    id: '1d9e80ef851d212aca82cf23',
    name: 'App',
    category: 'Other',
    services: {},
    inboxConfig: undefined,
    regionConfig: undefined,
    websitePushConfig: undefined,
    userDataFields: [],
    actionCategories: [],
    enforceSizeLimit: undefined,
    enforceTagRestrictions: undefined,
    enforceEventNameRestrictions: undefined,
  };

  test('when a full CloudApplication object is provided, it converts it into an ActitoApplication object as expected', () => {
    const input: CloudApplication = {
      _id: '1d9e80ef851d212aca82cf23',
      name: 'App',
      category: 'Other',
      services: { richPush: true, locationServices: false },
      inboxConfig: {
        useInbox: true,
        useUserInbox: false,
        autoBadge: true,
      },
      regionConfig: {
        proximityUUID: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
      },
      websitePushConfig: {
        icon: 'https://free-icons.com/some-icon-123',
        allowedDomains: ['http://localhost:3000'],
        urlFormatString: 'https://actito.com/some-page/?n=%@',
        info: {
          subject: {
            C: 'BE',
            CN: 'Apple Development IOS Push Services: web.com.actito.push',
            OU: 'ABCDE',
            O: 'Actito',
            UID: 'web.com.actito.push',
          },
        },
        vapid: { publicKey: 'string' },
        launchConfig: {
          applicationName: 'My app',
          autoOnboardingOptions: {
            message: 'Would you like to receive notifications from our website?',
            cancelButton: 'No, thanks',
            acceptButton: 'Yes',
            retryAfterHours: 1,
            showAfterSeconds: 5,
          },
          floatingButtonOptions: {
            alignment: {
              horizontal: 'start',
              vertical: 'top',
            },
            permissionTexts: {
              default: 'Click here to enable push notifications',
              granted: "You've granted push notifications for our website",
              denied: "You've denied push notifications for our website",
            },
          },
        },
        ignoreTemporaryDevices: false,
        ignoreUnsupportedWebPushDevices: false,
      },
      userDataFields: [
        {
          key: 'firstName',
          label: 'First Name',
          type: 'string',
        },
        {
          key: 'lastName',
          label: 'Last Name',
          type: 'string',
        },
      ],
      actionCategories: [
        {
          type: 're.notifica.notification.Alert',
          name: 'Alert template',
          description: 'Alert template description',
          actions: [
            {
              _id: '1',
              type: 're.notifica.action.Callback',
              label: 'Call',
              target: 'tel:0123456789',
              camera: false,
              keyboard: false,
              destructive: false,
              icon: {
                android: 'string',
                ios: 'string',
                web: 'string',
              },
            },
          ],
        },
      ],
      enforceSizeLimit: false,
      enforceTagRestrictions: false,
      enforceEventNameRestrictions: false,
    };

    const expectedOutput: ActitoApplication = {
      id: '1d9e80ef851d212aca82cf23',
      name: 'App',
      category: 'Other',
      services: { richPush: true, locationServices: false },
      inboxConfig: {
        useInbox: true,
        useUserInbox: false,
        autoBadge: true,
      },
      regionConfig: {
        proximityUUID: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
      },
      websitePushConfig: {
        icon: 'https://free-icons.com/some-icon-123',
        allowedDomains: ['http://localhost:3000'],
        urlFormatString: 'https://actito.com/some-page/?n=%@',
        info: {
          subject: {
            C: 'BE',
            CN: 'Apple Development IOS Push Services: web.com.actito.push',
            OU: 'ABCDE',
            O: 'Actito',
            UID: 'web.com.actito.push',
          },
        },
        vapid: { publicKey: 'string' },
        launchConfig: {
          applicationName: 'My app',
          autoOnboardingOptions: {
            message: 'Would you like to receive notifications from our website?',
            cancelButton: 'No, thanks',
            acceptButton: 'Yes',
            retryAfterHours: 1,
            showAfterSeconds: 5,
          },
          floatingButtonOptions: {
            alignment: {
              horizontal: 'start',
              vertical: 'top',
            },
            permissionTexts: {
              default: 'Click here to enable push notifications',
              granted: "You've granted push notifications for our website",
              denied: "You've denied push notifications for our website",
            },
          },
        },
        ignoreTemporaryDevices: false,
        ignoreUnsupportedWebPushDevices: false,
      },
      userDataFields: [
        {
          key: 'firstName',
          label: 'First Name',
          type: 'string',
        },
        {
          key: 'lastName',
          label: 'Last Name',
          type: 'string',
        },
      ],
      actionCategories: [
        {
          type: 're.notifica.notification.Alert',
          name: 'Alert template',
          description: 'Alert template description',
          actions: [
            {
              id: '1',
              type: 're.notifica.action.Callback',
              label: 'Call',
              target: 'tel:0123456789',
              camera: false,
              keyboard: false,
              destructive: false,
              icon: {
                android: 'string',
                ios: 'string',
                web: 'string',
              },
            },
          ],
        },
      ],
      enforceSizeLimit: false,
      enforceTagRestrictions: false,
      enforceEventNameRestrictions: false,
    };

    expect(convertCloudApplicationToPublic(input)).toStrictEqual(expectedOutput);
  });

  test('when a minimal CloudApplication object is provided, it includes the optional fields in the final ActitoApplication object as expected', () => {
    const input: CloudApplication = MINIMAL_CLOUD_APPLICATION;
    const expectedOutput: ActitoApplication = MINIMAL_ACTITO_APPLICATION;

    expect(convertCloudApplicationToPublic(input)).toStrictEqual(expectedOutput);
  });

  test('when inbox config options are empty ({}), it sets them as false in the final object', () => {
    const input: CloudApplication = {
      ...MINIMAL_CLOUD_APPLICATION,
      inboxConfig: {},
    };

    const expectedOutput = {
      ...MINIMAL_ACTITO_APPLICATION,
      inboxConfig: {
        useInbox: false,
        useUserInbox: false,
        autoBadge: false,
      },
    };

    expect(convertCloudApplicationToPublic(input)).toStrictEqual(expectedOutput);
  });

  test('when a region config is provided without a proximityUUID, it sets it as undefined in the final object', () => {
    const input: CloudApplication = {
      ...MINIMAL_CLOUD_APPLICATION,
      regionConfig: {},
    };

    const expectedOutput: ActitoApplication = {
      ...MINIMAL_ACTITO_APPLICATION,
      regionConfig: undefined,
    };

    expect(convertCloudApplicationToPublic(input)).toStrictEqual(expectedOutput);
  });

  test('when an icon is not provided in the website push config, it sets it as undefined in the final object', () => {
    const input: CloudApplication = {
      ...MINIMAL_CLOUD_APPLICATION,
      websitePushConfig: {
        allowedDomains: ['http://localhost:3000'],
        urlFormatString: 'https://actito.com/some-page/?n=%@',
      },
    };

    const expectedOutput: ActitoApplication = {
      ...MINIMAL_ACTITO_APPLICATION,
      websitePushConfig: undefined,
    };

    expect(convertCloudApplicationToPublic(input)).toStrictEqual(expectedOutput);
  });

  test('when allowed domains are not provided in the website push config, it sets it as undefined in the final object', () => {
    const input: CloudApplication = {
      ...MINIMAL_CLOUD_APPLICATION,
      websitePushConfig: {
        icon: 'https://free-icons.com/some-icon-123',
        urlFormatString: 'https://actito.com/some-page/?n=%@',
      },
    };

    const expectedOutput: ActitoApplication = {
      ...MINIMAL_ACTITO_APPLICATION,
      websitePushConfig: undefined,
    };

    expect(convertCloudApplicationToPublic(input)).toStrictEqual(expectedOutput);
  });

  test('when the website push config has incomplete subject info, it sets it as undefined in the final object', () => {
    const input: CloudApplication = {
      ...MINIMAL_CLOUD_APPLICATION,
      websitePushConfig: {
        icon: 'https://free-icons.com/some-icon-123',
        allowedDomains: ['http://localhost:3000'],
        info: {
          subject: {
            C: 'BE',
            CN: 'Apple Development IOS Push Services: web.com.actito.push',
            OU: 'ABCDE',
            O: 'Actito',
            UID: 'web.com.actito.push',
          },
        },
      },
    };

    const expectedOutput: ActitoApplication = {
      ...MINIMAL_ACTITO_APPLICATION,
      websitePushConfig: {
        icon: 'https://free-icons.com/some-icon-123',
        allowedDomains: ['http://localhost:3000'],
        urlFormatString: undefined,
        info: undefined,
        vapid: undefined,
        launchConfig: undefined,
        ignoreTemporaryDevices: undefined,
        ignoreUnsupportedWebPushDevices: undefined,
      },
    };

    const inputInfoSubject = input.websitePushConfig?.info?.subject ?? {};

    // Delete a single subject key from the Cloud Application object and compare it with the final Actito Application object each time
    for (const key of Object.keys(inputInfoSubject)) {
      const newCloudApplication: CloudApplication = {
        ...input,
        websitePushConfig: {
          ...input.websitePushConfig,
          info: {
            ...input.websitePushConfig?.info,
            subject: {
              ...input.websitePushConfig?.info?.subject,
              [key]: undefined,
            },
          },
        },
      };

      expect(convertCloudApplicationToPublic(newCloudApplication)).toStrictEqual(expectedOutput);
    }
  });

  test('when the website push config has a vapid config without a public key, it sets it as undefined in the final object', () => {
    const input: CloudApplication = {
      ...MINIMAL_CLOUD_APPLICATION,
      websitePushConfig: {
        icon: 'https://free-icons.com/some-icon-123',
        allowedDomains: ['http://localhost:3000'],
        vapid: {},
      },
    };

    const expectedOutput: ActitoApplication = {
      ...MINIMAL_ACTITO_APPLICATION,
      websitePushConfig: {
        icon: 'https://free-icons.com/some-icon-123',
        allowedDomains: ['http://localhost:3000'],
        urlFormatString: undefined,
        info: undefined,
        vapid: undefined,
        launchConfig: undefined,
        ignoreTemporaryDevices: undefined,
        ignoreUnsupportedWebPushDevices: undefined,
      },
    };

    expect(convertCloudApplicationToPublic(input)).toStrictEqual(expectedOutput);
  });

  test('when the website push config does not provide auto onboarding options or floating button options in the launch config, it sets the launch config as undefined in the final object', () => {
    const input: CloudApplication = {
      ...MINIMAL_CLOUD_APPLICATION,
      websitePushConfig: {
        icon: 'https://free-icons.com/some-icon-123',
        allowedDomains: ['http://localhost:3000'],
        launchConfig: {},
      },
    };

    const expectedOutput: ActitoApplication = {
      ...MINIMAL_ACTITO_APPLICATION,
      websitePushConfig: {
        icon: 'https://free-icons.com/some-icon-123',
        allowedDomains: ['http://localhost:3000'],
        urlFormatString: undefined,
        info: undefined,
        vapid: undefined,
        launchConfig: undefined,
        ignoreTemporaryDevices: undefined,
        ignoreUnsupportedWebPushDevices: undefined,
      },
    };

    expect(convertCloudApplicationToPublic(input)).toStrictEqual(expectedOutput);
  });

  test('when the website push config only has auto onboarding options lacking mandatory properties (message, accept button and cancel button texts) in the launch config, it sets the launch config as undefined in the final object', () => {
    const input: CloudApplication = {
      ...MINIMAL_CLOUD_APPLICATION,
      websitePushConfig: {
        icon: 'https://free-icons.com/some-icon-123',
        allowedDomains: ['http://localhost:3000'],
        launchConfig: {
          autoOnboardingOptions: {
            message: 'Would you like to receive notifications from our website?',
            cancelButton: 'No, thanks',
            acceptButton: 'Yes',
            retryAfterHours: 1,
            showAfterSeconds: 5,
          },
        },
      },
    };

    const expectedOutput: ActitoApplication = {
      ...MINIMAL_ACTITO_APPLICATION,
      websitePushConfig: {
        icon: 'https://free-icons.com/some-icon-123',
        allowedDomains: ['http://localhost:3000'],
        urlFormatString: undefined,
        info: undefined,
        vapid: undefined,
        launchConfig: undefined,
        ignoreTemporaryDevices: undefined,
        ignoreUnsupportedWebPushDevices: undefined,
      },
    };

    const inputAutoOnboardingOptions =
      input.websitePushConfig?.launchConfig?.autoOnboardingOptions ?? {};

    const autoOnboardingOptionsKeysToExclude: (keyof typeof inputAutoOnboardingOptions)[] = [
      'message',
      'acceptButton',
      'cancelButton',
    ];

    // Delete a single auto onboarding option from the Cloud Application object and compare it with the final Actito Application object each time
    for (const key of autoOnboardingOptionsKeysToExclude) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _, ...incompleteAutoOnboardingOptions } = inputAutoOnboardingOptions;

      const newCloudApplication: CloudApplication = {
        ...input,
        websitePushConfig: {
          ...input.websitePushConfig,
          launchConfig: {
            ...input.websitePushConfig?.launchConfig,
            autoOnboardingOptions: incompleteAutoOnboardingOptions,
          },
        },
      };

      expect(convertCloudApplicationToPublic(newCloudApplication)).toStrictEqual(expectedOutput);
    }
  });

  test('when the user data fields have a field with missing properties, it does not include that field in the final object', () => {
    const input: CloudApplication = {
      ...MINIMAL_CLOUD_APPLICATION,
      userDataFields: [
        {
          type: 'string',
          key: 'firstName',
          label: 'First Name',
        },
      ],
    };

    const expectedOutput: ActitoApplication = {
      ...MINIMAL_ACTITO_APPLICATION,
      userDataFields: [],
    };

    const userDataFields = input.userDataFields ?? [];

    const userDataFieldKeysToExclude = Object.keys(
      userDataFields[0],
    ) as (keyof (typeof userDataFields)[0])[];

    // Delete a single user data field property from the Cloud Application object and compare it with the final Actito Application object each time
    for (const key of userDataFieldKeysToExclude) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _, ...incompleteUserDataField } = userDataFields[0];

      const newCloudApplication: CloudApplication = {
        ...input,
        userDataFields: [
          {
            ...incompleteUserDataField,
          },
        ],
      };

      expect(convertCloudApplicationToPublic(newCloudApplication)).toStrictEqual(expectedOutput);
    }
  });

  test('when the action categories have a category without a type or name, it does not include that category in the final object', () => {
    const input: CloudApplication = {
      ...MINIMAL_CLOUD_APPLICATION,
      actionCategories: [
        {
          type: 're.notifica.notification.Alert',
          name: 'Alert template',
          description: 'Alert template description',
          actions: [],
        },
      ],
    };

    const expectedOutput: ActitoApplication = {
      ...MINIMAL_ACTITO_APPLICATION,
      actionCategories: [],
    };

    const actionCategories = input.actionCategories ?? [];

    const actionCategoryKeysToExclude: (keyof (typeof actionCategories)[0])[] = ['type', 'name'];

    // Delete a single action category property from the Cloud Application object and compare it with the final Actito Application object each time
    for (const key of actionCategoryKeysToExclude) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _, ...incompleteActionCategory } = actionCategories[0];

      const newCloudApplication: CloudApplication = {
        ...input,
        actionCategories: [
          {
            ...incompleteActionCategory,
          },
        ],
      };

      expect(convertCloudApplicationToPublic(newCloudApplication)).toStrictEqual(expectedOutput);
    }
  });

  test('when the action categories have a category that has an action without a label, it does not include that action in the final object', () => {
    const input: CloudApplication = {
      ...MINIMAL_CLOUD_APPLICATION,
      actionCategories: [
        {
          type: 're.notifica.notification.Alert',
          name: 'Alert template',
          description: 'Alert template description',
          actions: [
            {
              _id: '1',
              type: 're.notifica.action.Callback',
              target: 'tel:0123456789',
              camera: false,
              keyboard: false,
              destructive: false,
              icon: {
                android: 'string',
                ios: 'string',
                web: 'string',
              },
            },
          ],
        },
      ],
    };

    const expectedOutput: ActitoApplication = {
      ...MINIMAL_ACTITO_APPLICATION,
      actionCategories: [
        {
          type: 're.notifica.notification.Alert',
          name: 'Alert template',
          description: 'Alert template description',
          actions: [],
        },
      ],
    };

    expect(convertCloudApplicationToPublic(input)).toStrictEqual(expectedOutput);
  });

  test('when an action category has an action with an icon that does not include any option for any platform (Android, iOS or Web), it sets the icon as undefined in the final object', () => {
    const input: CloudApplication = {
      ...MINIMAL_CLOUD_APPLICATION,
      actionCategories: [
        {
          type: 're.notifica.notification.Alert',
          name: 'Alert template',
          description: 'Alert template description',
          actions: [
            {
              _id: '1',
              type: 're.notifica.action.Callback',
              label: 'Call',
              target: 'tel:0123456789',
              camera: false,
              keyboard: false,
              destructive: false,
              icon: {},
            },
          ],
        },
      ],
    };

    const expectedOutput: ActitoApplication = {
      ...MINIMAL_ACTITO_APPLICATION,
      actionCategories: [
        {
          type: 're.notifica.notification.Alert',
          name: 'Alert template',
          description: 'Alert template description',
          actions: [
            {
              id: '1',
              type: 're.notifica.action.Callback',
              label: 'Call',
              target: 'tel:0123456789',
              camera: false,
              keyboard: false,
              destructive: false,
              icon: undefined,
            },
          ],
        },
      ],
    };

    expect(convertCloudApplicationToPublic(input)).toStrictEqual(expectedOutput);
  });
});

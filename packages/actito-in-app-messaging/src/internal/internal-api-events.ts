import { logInternal } from '@actito/web-core';
import type { ActitoInAppMessage } from '../models/actito-in-app-message';
import { ActionType } from './types/action-type';

export async function logInAppMessageViewed(message: ActitoInAppMessage) {
  await logInternal({
    type: 're.notifica.event.inappmessage.View',
    data: { message: message.id },
  });
}

export async function logInAppMessageActionClicked(
  message: ActitoInAppMessage,
  actionType: ActionType,
) {
  await logInternal({
    type: 're.notifica.event.inappmessage.Action',
    data: {
      message: message.id,
      action: actionType,
    },
  });
}

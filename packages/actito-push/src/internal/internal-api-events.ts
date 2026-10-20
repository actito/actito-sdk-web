import { logInternal } from '@actito/web-core';

export async function logPushRegistration() {
  await logInternal({ type: 're.notifica.event.push.Registration' });
}

export async function logNotificationReceived(id: string, trackerId?: string) {
  await logInternal({
    type: 're.notifica.event.notification.Receive',
    notificationId: id,
    data: { trackerId },
  });
}

export async function logNotificationInfluenced(id: string, trackerId?: string) {
  await logInternal({
    type: 're.notifica.event.notification.Influenced',
    notificationId: id,
    data: { trackerId },
  });
}

import { createCloudEvent } from '@actito/web-cloud-api';
import { getCloudApiEnvironment } from '~/internal/cloud-api/environment';
import { getCurrentDeviceId } from '~/internal/configuration/parser';

export async function logNotificationReceived(id: string, trackerId?: string) {
  await createCloudEvent({
    environment: await getCloudApiEnvironment(),
    payload: {
      type: 're.notifica.event.notification.Receive',
      notification: id,
      deviceID: getCurrentDeviceId(),
      timestamp: Date.now(),
      data: { trackerId },
    },
  });
}

export async function logNotificationOpen(id: string, trackerId?: string) {
  await createCloudEvent({
    environment: await getCloudApiEnvironment(),
    payload: {
      type: 're.notifica.event.notification.Open',
      notification: id,
      deviceID: getCurrentDeviceId(),
      timestamp: Date.now(),
      data: { trackerId },
    },
  });
}

export async function logNotificationInfluenced(id: string, trackerId?: string) {
  await createCloudEvent({
    environment: await getCloudApiEnvironment(),
    payload: {
      type: 're.notifica.event.notification.Influenced',
      notification: id,
      deviceID: getCurrentDeviceId(),
      timestamp: Date.now(),
      data: { trackerId },
    },
  });
}

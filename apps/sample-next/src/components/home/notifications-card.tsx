import { useEffect, useState } from "react";
import { BellAlertIcon } from "@heroicons/react/24/outline";
import {
  disableRemoteNotifications,
  enableRemoteNotifications,
  hasRemoteNotificationsEnabled,
  getAllowedUI,
  getPushPermissionStatus,
  ActitoPushPermissionStatus,
} from "actito-web/push";
import { useOnDeviceRegistered } from "@/actito/hooks/events/core/device-registered";
import { useOnNotificationSettingsChanged } from "@/actito/hooks/events/push/notification-settings-changed";
import { Card, CardContent, CardHeader } from "@/components/card";
import { toast } from "@/components/sonner";
import { Switch } from "@/components/switch";
import { logger } from "@/utils/logger";

export function NotificationsCard() {
  const [enabled, setEnabled] = useState(false);
  const [allowedUI, setAllowedUI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<ActitoPushPermissionStatus>();

  useEffect(() => {
    const enabled = hasRemoteNotificationsEnabled();
    setEnabled(enabled);

    const allowedUI = getAllowedUI();
    setAllowedUI(allowedUI);

    const permissionStatus = getPushPermissionStatus();
    setPermissionStatus(permissionStatus);
  }, []);

  async function updateRemoteNotificationsStatus(checked: boolean) {
    if (checked && permissionStatus === "denied") {
      toast({
        title: "You have denied notification permissions. Please, check your browser settings.",
        variant: "error",
      });
      return;
    }

    try {
      setLoading(true);

      if (checked) {
        await enableRemoteNotifications();
        toast({
          title: "Remote notifications have been enabled.",
          variant: "success",
        });
      } else {
        await disableRemoteNotifications();
        toast({
          title: "Remote notifications have been disabled.",
          variant: "success",
        });
      }

      setEnabled(checked);
    } catch (e) {
      toast({
        title: "It was not possible to update the remote notification permissions.",
        description: `${e}`,
        variant: "error",
      });
      logger.error(`It was not possible to update the remote notification permissions: ${e}`);
    } finally {
      setLoading(false);
    }
  }

  useOnDeviceRegistered(() => {
    const enabled = hasRemoteNotificationsEnabled();
    setEnabled(enabled);
  });

  useOnNotificationSettingsChanged((allowedUI) => {
    const enabled = hasRemoteNotificationsEnabled();
    setEnabled(enabled);

    setAllowedUI(allowedUI);

    const permissionStatus = getPushPermissionStatus();
    setPermissionStatus(permissionStatus);
  });

  return (
    <Card>
      <CardHeader title="Notifications" icon={BellAlertIcon} />

      <CardContent>
        <Switch
          label="Enabled"
          checked={enabled}
          loading={loading}
          onChange={(checked) => updateRemoteNotificationsStatus(checked)}
        />

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
            Allowed UI
          </p>
          <p className="text-sm font-mono lowercase text-gray-400">{allowedUI.toString()}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
            Permission
          </p>
          <p className="text-sm font-mono lowercase text-gray-400">{permissionStatus}</p>
        </div>
      </CardContent>
    </Card>
  );
}

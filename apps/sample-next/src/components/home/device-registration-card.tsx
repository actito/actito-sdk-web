import { useCallback, useState } from "react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { getCurrentDevice, updateUser } from "actito-web/core";
import { useOnDeviceRegistered } from "@/actito/hooks/events/core/device-registered";
import { Button } from "@/components/button";
import { Card, CardActions, CardContent, CardHeader } from "@/components/card";
import { InputField } from "@/components/input-field";
import { toast } from "@/components/sonner";
import { logger } from "@/utils/logger";

export function DeviceRegistrationCard() {
  const device = getCurrentDevice();

  const [userId, setUserId] = useState<string>(device?.userId ?? "");
  const [userName, setUserName] = useState<string>(device?.userName ?? "");
  const [loading, setLoading] = useState<boolean>(false);

  useOnDeviceRegistered((device) => {
    setUserId(device.userId ?? "");
    setUserName(device.userName ?? "");
  });

  const onRegisterClick = useCallback(() => {
    setLoading(true);

    updateUser({ userId: userId.trim() || null, userName: userName.trim() || null })
      .then(() => {
        setLoading(false);
        toast({
          title: "The device was registered.",
          variant: "success",
        });
      })
      .catch((e) => {
        setLoading(false);
        toast({
          title: "Unable to register the device.",
          description: `${e}`,
          variant: "error",
        });
        logger.error(`Unable to register the device: ${e}`);
      });
  }, [userId, userName]);

  return (
    <Card>
      <CardHeader title="Device registration" icon={ArrowRightEndOnRectangleIcon} />

      <CardContent>
        <InputField
          id="user-id"
          label="User ID"
          placeholder="63d38bb3-0d2b-4059-b2d2-775a9deae263"
          disabled={loading}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <InputField
          id="user-name"
          label="User name"
          placeholder="John Doe"
          disabled={loading}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </CardContent>

      <CardActions>
        <Button text="Register user" loading={loading} onClick={onRegisterClick} />
      </CardActions>
    </Card>
  );
}

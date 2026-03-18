import { useCallback, useEffect, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import {
  disableLocationUpdates,
  enableLocationUpdates,
  hasLocationServicesEnabled,
} from "actito-web/geo";
import { Card, CardContent, CardHeader } from "@/components/card";
import { toast } from "@/components/sonner";
import { Switch } from "@/components/switch";
import { logger } from "@/utils/logger";

export function LocationCard() {
  const [enabled, setEnabled] = useState(false);
  const [geoPermissionStatus, setGeoPermissionStatus] = useState<PermissionState>("prompt");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(function checkLocationServicesStatus() {
    const enabled = hasLocationServicesEnabled();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(enabled);
  }, []);

  useEffect(function checkGeolocationPermissionStatus() {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      setGeoPermissionStatus(result.state);

      result.onchange = function onGeolocationSettingsChanged() {
        setGeoPermissionStatus(result.state);
      };
    });
  });

  const enableLocationServices = useCallback(() => {
    try {
      enableLocationUpdates();
      setEnabled(true);
      toast({
        title: "The location services were enabled.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "The location services could not be enabled.",
        description: `${error}`,
        variant: "error",
      });
      logger.error(`The location services could not be enabled: ${error}`);
    }
  }, []);

  const disableLocationServices = useCallback(() => {
    try {
      disableLocationUpdates();
      setEnabled(false);
      toast({
        title: "The location services were disabled.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "The location services could not be disabled.",
        description: `${error}`,
        variant: "error",
      });
      logger.error(`The location services could not be disabled: ${error}`);
    }
  }, []);

  const updateLocationServicesStatus = useCallback(
    (checked: boolean) => {
      if (!checked) {
        disableLocationServices();
        return;
      }

      switch (geoPermissionStatus) {
        case "denied":
          toast({
            title: "You have denied access to your location. Please, check your browser settings.",
            variant: "error",
          });
          break;

        case "granted":
          enableLocationServices();
          break;

        case "prompt": {
          setLoading(true);

          navigator.geolocation.getCurrentPosition(
            () => {
              setLoading(false);
              enableLocationServices();
            },
            (error) => {
              setLoading(false);

              if (error.code === error.PERMISSION_DENIED) {
                toast({
                  title:
                    "You have not granted access to your location. Please, check your browser settings.",
                  variant: "error",
                });
              } else {
                toast({
                  title: "There was an error while trying to access your location.",
                  description: `${error.message}`,
                  variant: "error",
                });
                logger.error(
                  `There was an error while trying to access your location: ${error.message}`,
                );
              }
            },
          );
        }
      }
    },
    [disableLocationServices, enableLocationServices, geoPermissionStatus],
  );

  return (
    <Card>
      <CardHeader title="Location" icon={MapPinIcon} />

      <CardContent>
        <Switch
          label="Enabled"
          checked={enabled}
          loading={loading}
          onChange={updateLocationServicesStatus}
        />

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
            Permission
          </p>
          <p className="text-sm font-mono lowercase text-gray-400">{geoPermissionStatus}</p>
        </div>
      </CardContent>
    </Card>
  );
}

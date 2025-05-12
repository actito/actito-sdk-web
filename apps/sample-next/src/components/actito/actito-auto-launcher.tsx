"use client";

import { useEffect, useRef } from "react";
import { configure, setLogLevel } from "actito-web/core";
import { useActitoLaunchFlow } from "@/actito/hooks/actito-launch-flow";
import { useSampleUser } from "@/hooks/sample-user";

export function ActitoAutoLauncher() {
  useSampleUser();

  const { launch } = useActitoLaunchFlow();
  const autoLaunched = useRef(false);

  useEffect(() => {
    // Strict mode will (un)mount each component twice.
    // Prevent the configuration from running in duplicate.
    if (autoLaunched.current) return;

    const encodedConfig = localStorage.getItem("app_configuration");
    if (!encodedConfig) return;

    const config = JSON.parse(encodedConfig);
    setLogLevel(config.debugLoggingEnabled ? "debug" : "info");
    configure(config);

    launch();
    autoLaunched.current = true;
  }, [launch]);

  return null;
}
